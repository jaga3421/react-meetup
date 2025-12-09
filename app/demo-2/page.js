"use client";
/**
 * DEMO-2 PAGE - OFFLINE-FIRST NOTES APP
 * 
 * KEY DIFFERENCES FROM DEMO-1:
 * 1. Registers Service Worker for caching
 * 2. Shows network status indicator
 * 3. Shows sync status
 * 4. Works completely offline
 * 
 * DEMO-1: Breaks when offline ❌
 * DEMO-2: Works perfectly offline ✅
 */
import { useState, useEffect } from "react";
import { useNotes } from "./hooks/useNotes";
import NoteEditor from "./components/NoteEditor";
import NoteList from "./components/NoteList";
import NetworkStatus from "./components/NetworkStatus";

export default function Demo2() {
  const {
    notes,
    loading,
    syncing,
    error,
    isOnline,
    addNote,
    editNote,
    removeNote,
  } = useNotes();
  const [editingNote, setEditingNote] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  /**
   * SERVICE WORKER REGISTRATION
   * 
   * Service Worker enables:
   * - Caching API requests
   * - Serving cached responses when offline
   * - Background sync capabilities
   * 
   * This is what makes the app work offline!
   */
  // Register Service Worker
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/demo-2-sw.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);

  const handleCreate = () => {
    setEditingNote(null);
    setShowEditor(true);
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setShowEditor(true);
  };

  const handleSave = async (noteData) => {
    try {
      if (editingNote) {
        await editNote(editingNote.id, noteData);
      } else {
        await addNote(noteData);
      }
      setShowEditor(false);
      setEditingNote(null);
    } catch (err) {
      // Error is handled by the hook
      console.error("Failed to save note:", err);
    }
  };

  const handleCancel = () => {
    setShowEditor(false);
    setEditingNote(null);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this note?")) {
      try {
        await removeNote(id);
      } catch (err) {
        console.error("Failed to delete note:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(36,36,36)] text-gray-300 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Demo - App with offline-first support
          </h1>
          <p className="text-xl text-gray-400 mb-4">
            This notes app works completely offline! Try going offline and see
            how it continues to work seamlessly. All changes sync automatically
            when you're back online.
          </p>
        </div>

        <NetworkStatus syncing={syncing} />

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-300">
            {error}
          </div>
        )}

        <div className="mb-6">
          {!showEditor ? (
            <button
              onClick={handleCreate}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              + Create New Note
            </button>
          ) : (
            <div className="bg-[rgba(50,50,50)] border border-gray-700 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">
                {editingNote ? "Edit Note" : "Create New Note"}
              </h2>
              <NoteEditor
                note={editingNote}
                onSave={handleSave}
                onCancel={handleCancel}
                loading={loading}
              />
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Notes</h2>
          <NoteList
            notes={notes}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
