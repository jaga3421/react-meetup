// In-memory storage for demo (resets on server restart)
let notes = [
  {
    id: 1,
    title: "Welcome to Notes App",
    content: "This is a demo notes app without offline support. Try going offline and see what happens!",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// GET - Fetch all notes
export async function GET() {
  try {
    return Response.json(notes);
  } catch (error) {
    return Response.json({ error: "Failed to fetch notes" }, { status: 500 });
  }
}

// POST - Create a new note
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return Response.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const newNote = {
      id: Date.now(),
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    notes.push(newNote);
    return Response.json(newNote, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Failed to create note" }, { status: 500 });
  }
}

// PUT - Update an existing note
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, title, content } = body;

    if (!id || !title || !content) {
      return Response.json(
        { error: "ID, title, and content are required" },
        { status: 400 }
      );
    }

    const noteIndex = notes.findIndex((note) => note.id === id);
    if (noteIndex === -1) {
      return Response.json({ error: "Note not found" }, { status: 404 });
    }

    notes[noteIndex] = {
      ...notes[noteIndex],
      title,
      content,
      updatedAt: new Date().toISOString(),
    };

    return Response.json(notes[noteIndex]);
  } catch (error) {
    return Response.json({ error: "Failed to update note" }, { status: 500 });
  }
}

// DELETE - Delete a note
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id"));

    if (!id) {
      return Response.json({ error: "ID is required" }, { status: 400 });
    }

    const noteIndex = notes.findIndex((note) => note.id === id);
    if (noteIndex === -1) {
      return Response.json({ error: "Note not found" }, { status: 404 });
    }

    notes.splice(noteIndex, 1);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: "Failed to delete note" }, { status: 500 });
  }
}

