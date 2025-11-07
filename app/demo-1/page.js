"use client";
import { useState } from "react";
import { useNotes } from "./hooks/useNotes";
import NoteEditor from "./components/NoteEditor";
import NoteList from "./components/NoteList";

export default function Demo1() {
  const { notes, loading, error, addNote, editNote, removeNote } = useNotes();
  const [editingNote, setEditingNote] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

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
            Demo - App without offline support
          </h1>
          <p className="text-xl text-gray-400 mb-4">
            This notes app requires an internet connection to work. Try going
            offline and see what happens!
          </p>
        </div>

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
