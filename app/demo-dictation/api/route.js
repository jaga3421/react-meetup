import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function formatTranscriptFragment(existingTranscript, newFragment) {
  const transcriptSoFar = existingTranscript.trim();
  const fragment = newFragment.trim();

  if (!fragment) {
    return "";
  }

  if (!transcriptSoFar) {
    return fragment;
  }

  const transcriptTail = transcriptSoFar.slice(-300);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.1,
    messages: [
      {
        role: "system",
        content:
          "You format only the newest dictation fragment. Improve punctuation, capitalization, and sentence boundaries while preserving wording and meaning. Use the prior transcript tail only as context. Do not rewrite, repeat, or summarize prior text. Return only the corrected new fragment.",
      },
      {
        role: "user",
        content: [
          `Prior transcript tail:\n${transcriptTail}`,
          `New fragment:\n${fragment}`,
          "Return only the corrected new fragment.",
        ].join("\n\n"),
      },
    ],
  });

  return completion.choices[0]?.message?.content?.trim() || fragment;
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const context = formData.get("context");
    const existingTranscript = formData.get("transcript");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const recentContext = typeof context === "string" ? context.trim() : "";
    // For speech-to-text, prompt works best as a short trailing context sample.
    // Instruction-style prompts can leak into the returned transcript.
    const prompt = recentContext || undefined;

    const transcription = await openai.audio.transcriptions.create({
      file,
      model: "gpt-4o-mini-transcribe",
      ...(prompt ? { prompt } : {}),
    });

    const rawText = transcription.text?.trim() ?? "";
    const transcriptSoFar =
      typeof existingTranscript === "string" ? existingTranscript.trim() : "";
    const formattedFragment = rawText
      ? await formatTranscriptFragment(transcriptSoFar, rawText)
      : "";

    return NextResponse.json({ text: formattedFragment, rawText });
  } catch (error) {
    console.error("Transcription error:", error);

    return NextResponse.json(
      {
        error: "Failed to transcribe audio",
        details: error.message || "Unknown transcription error",
      },
      { status: error.status || 500 }
    );
  }
}
