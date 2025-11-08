"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { fetchNotes, createNote, updateNote, deleteNote } from "../services/api";
import {
  getAllNotes,
  saveNote,
  deleteNoteFromDB,
  clearAllNotes,
} from "../services/indexedDB";
import {
  addToSyncQueue,
  getSyncQueue,
  removeFromSyncQueue,
} from "../services/syncQueue";
import { useNetworkStatus } from "./useNetworkStatus";

export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState(null);
  const isOnline = useNetworkStatus();
  const isLoadingRef = useRef(false);

  // Load notes from IndexedDB first, then sync with server if online
  const loadNotes = useCallback(async () => {
    // Prevent multiple simultaneous calls
    if (isLoadingRef.current) return;
    
    isLoadingRef.current = true;
    setLoading(true);
    setError(null);
    try {
      // Load from IndexedDB first (offline-first approach)
      const localNotes = await getAllNotes();
      setNotes(localNotes);

      // If online, sync with server
      if (isOnline) {
        try {
          const serverNotes = await fetchNotes();
          
          // Merge server notes with local notes
          // Server is source of truth for IDs, but keep local changes
          const mergedNotes = [...serverNotes];
          
          // Add any local notes that don't exist on server
          localNotes.forEach((localNote) => {
            const existsOnServer = serverNotes.some(
              (serverNote) => serverNote.id === localNote.id
            );
            if (!existsOnServer) {
              mergedNotes.push(localNote);
            }
          });

          // Update IndexedDB with merged notes
          await clearAllNotes();
          for (const note of mergedNotes) {
            await saveNote(note);
          }

          setNotes(mergedNotes);
        } catch (err) {
          // If server sync fails, keep using local notes
          console.log("Server sync failed, using local notes:", err);
        }
      }
    } catch (err) {
      console.error("Failed to load notes:", err);
      setError(err.message);
    } finally {
      setLoading(false);
      isLoadingRef.current = false;
    }
  }, [isOnline]);

  // Sync pending queue actions with server
  const syncQueue = useCallback(async () => {
    if (!isOnline || syncing) return;

    setSyncing(true);
    try {
      const queue = await getSyncQueue();
      
      if (queue.length === 0) {
        setSyncing(false);
        return;
      }

      for (const item of queue) {
        try {
          if (item.type === "create") {
            const serverNote = await createNote(item.data);
            // Update local note with server ID if needed
            if (item.data.id !== serverNote.id) {
              await deleteNoteFromDB(item.data.id);
              await saveNote(serverNote);
              setNotes((prev) =>
                prev.map((n) => (n.id === item.data.id ? serverNote : n))
              );
            }
            await removeFromSyncQueue(item.id);
          } else if (item.type === "update") {
            const serverNote = await updateNote(item.data.id, item.data);
            await saveNote(serverNote);
            setNotes((prev) =>
              prev.map((n) => (n.id === item.data.id ? serverNote : n))
            );
            await removeFromSyncQueue(item.id);
          } else if (item.type === "delete") {
            await deleteNote(item.data.id);
            await removeFromSyncQueue(item.id);
          }
        } catch (err) {
          console.error("Failed to sync queue item:", err);
          // Keep item in queue for retry
        }
      }

      // Reload notes from IndexedDB to ensure consistency
      const updatedNotes = await getAllNotes();
      setNotes(updatedNotes);
    } catch (err) {
      console.error("Failed to sync queue:", err);
    } finally {
      setSyncing(false);
    }
  }, [isOnline, syncing]);

  // Create a new note (optimistic update)
  const addNote = useCallback(
    async (note) => {
      setError(null);
      
      // Generate temporary ID
      const tempId = Date.now();
      const newNote = {
        id: tempId,
        ...note,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Save to IndexedDB immediately (optimistic update)
      await saveNote(newNote);
      setNotes((prev) => [...prev, newNote]);

      // If online, sync with server
      if (isOnline) {
        try {
          const serverNote = await createNote(note);
          // Update with server ID
          await deleteNoteFromDB(tempId);
          await saveNote(serverNote);
          setNotes((prev) =>
            prev.map((n) => (n.id === tempId ? serverNote : n))
          );
        } catch (err) {
          // If sync fails, queue for later
          await addToSyncQueue({
            type: "create",
            data: newNote,
          });
        }
      } else {
        // Queue for sync when online
        await addToSyncQueue({
          type: "create",
          data: newNote,
        });
      }

      return newNote;
    },
    [isOnline]
  );

  // Update an existing note (optimistic update)
  const editNote = useCallback(
    async (id, note) => {
      setError(null);
      
      const updatedNote = {
        id,
        ...note,
        updatedAt: new Date().toISOString(),
      };

      // Update IndexedDB immediately (optimistic update)
      const existingNote = notes.find((n) => n.id === id);
      if (existingNote) {
        updatedNote.createdAt = existingNote.createdAt;
      }
      
      await saveNote(updatedNote);
      setNotes((prev) => prev.map((n) => (n.id === id ? updatedNote : n)));

      // If online, sync with server
      if (isOnline) {
        try {
          const serverNote = await updateNote(id, note);
          await saveNote(serverNote);
          setNotes((prev) =>
            prev.map((n) => (n.id === id ? serverNote : n))
          );
        } catch (err) {
          // If sync fails, queue for later
          await addToSyncQueue({
            type: "update",
            data: updatedNote,
          });
        }
      } else {
        // Queue for sync when online
        await addToSyncQueue({
          type: "update",
          data: updatedNote,
        });
      }

      return updatedNote;
    },
    [isOnline, notes]
  );

  // Delete a note (optimistic update)
  const removeNote = useCallback(
    async (id) => {
      setError(null);
      
      const noteToDelete = notes.find((n) => n.id === id);

      // Remove from IndexedDB immediately (optimistic update)
      await deleteNoteFromDB(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));

      // If online, sync with server
      if (isOnline) {
        try {
          await deleteNote(id);
        } catch (err) {
          // If sync fails, queue for later
          if (noteToDelete) {
            await addToSyncQueue({
              type: "delete",
              data: { id },
            });
            // Restore note locally since delete failed
            await saveNote(noteToDelete);
            setNotes((prev) => [...prev, noteToDelete]);
          }
        }
      } else {
        // Queue for sync when online
        await addToSyncQueue({
          type: "delete",
          data: { id },
        });
      }
    },
    [isOnline, notes]
  );

  // Track if we've already synced after coming online
  const [hasSyncedAfterOnline, setHasSyncedAfterOnline] = useState(false);
  const [wasOffline, setWasOffline] = useState(!isOnline);

  // Load notes on mount only
  useEffect(() => {
    loadNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // Track offline/online transitions and sync when coming back online
  useEffect(() => {
    if (!isOnline) {
      setWasOffline(true);
      setHasSyncedAfterOnline(false);
      return;
    }

    // Only sync if we were offline and just came back online
    if (wasOffline && isOnline && !hasSyncedAfterOnline && !syncing) {
      setHasSyncedAfterOnline(true);
      setWasOffline(false);
      // Use setTimeout to avoid calling syncQueue during render
      setTimeout(() => {
        syncQueue();
      }, 100);
    }
  }, [isOnline, wasOffline, hasSyncedAfterOnline, syncing, syncQueue]);

  return {
    notes,
    loading,
    syncing,
    error,
    isOnline,
    loadNotes,
    addNote,
    editNote,
    removeNote,
    syncQueue,
  };
};
