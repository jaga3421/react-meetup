"use client";

export default function NoteItem({ note, onEdit, onDelete, loading }) {
  return (
    <div className="bg-[rgba(50,50,50)] border border-gray-700 rounded-lg p-4 hover:bg-[rgba(60,60,60)] transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold text-gray-200">{note.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(note)}
            disabled={loading}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(note.id)}
            disabled={loading}
            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
      <p className="text-gray-400 whitespace-pre-wrap">{note.content}</p>
      <p className="text-xs text-gray-500 mt-2">
        {new Date(note.updatedAt).toLocaleString()}
      </p>
    </div>
  );
}

