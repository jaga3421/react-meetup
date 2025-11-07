const API_BASE_URL = "/demo-1/api/notes";

// Fetch all notes
export const fetchNotes = async () => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }
  return response.json();
};

// Create a new note
export const createNote = async (note) => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  if (!response.ok) {
    throw new Error("Failed to create note");
  }
  return response.json();
};

// Update an existing note
export const updateNote = async (id, note) => {
  const response = await fetch(API_BASE_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, ...note }),
  });

  if (!response.ok) {
    throw new Error("Failed to update note");
  }
  return response.json();
};

// Delete a note
export const deleteNote = async (id) => {
  const response = await fetch(`${API_BASE_URL}?id=${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete note");
  }
  return response.json();
};

