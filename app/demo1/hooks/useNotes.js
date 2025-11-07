"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchNotes, createNote, updateNote, deleteNote } from "../services/api";

export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all notes
  const loadNotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchNotes();
      setNotes(data);
    } catch (err) {
      setError(err.message || "Failed to fetch notes");
      setNotes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new note
  const addNote = useCallback(async (note) => {
    setLoading(true);
    setError(null);
    try {
      const newNote = await createNote(note);
      setNotes((prev) => [...prev, newNote]);
      return newNote;
    } catch (err) {
      setError(err.message || "Failed to create note");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update an existing note
  const editNote = useCallback(async (id, note) => {
    setLoading(true);
    setError(null);
    try {
      const updatedNote = await updateNote(id, note);
      setNotes((prev) =>
        prev.map((n) => (n.id === id ? updatedNote : n))
      );
      return updatedNote;
    } catch (err) {
      setError(err.message || "Failed to update note");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete a note
  const removeNote = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete note");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Load notes on mount
  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  return {
    notes,
    loading,
    error,
    loadNotes,
    addNote,
    editNote,
    removeNote,
  };
};

