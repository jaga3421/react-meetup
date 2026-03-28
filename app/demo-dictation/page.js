"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaMicrophone,
  FaRobot,
  FaStop,
  FaWaveSquare,
} from "react-icons/fa";
import Link from "next/link";

const SILENCE_GAP_MS = 500;
const SILENCE_RMS_THRESHOLD = 0.02;
const MIN_SPEECH_FRAMES = 6;
const MIN_AUDIO_BLOB_BYTES = 1200;
const MIN_BROWSER_TRANSCRIPT_DELTA_CHARS = 8;

const COMMANDS = [
  {
    id: "next_slide",
    label: "Next Slide",
    description: "Move one slide forward",
    phrases: ["next slide", "next"],
  },
  {
    id: "previous_slide",
    label: "Previous Slide",
    description: "Move one slide backward",
    phrases: ["previous slide", "previous"],
  },
  {
    id: "agenda",
    label: "Agenda",
    description: "Jump to the agenda slide",
    phrases: ["agenda"],
  },
  {
    id: "start_timer",
    label: "Start Timer",
    description: "Start the presentation timer",
    phrases: ["start timer", "start the timer"],
  },
  {
    id: "pause_timer",
    label: "Pause Timer",
    description: "Pause the presentation timer",
    phrases: ["pause timer", "pause the timer"],
  },
  {
    id: "resume_timer",
    label: "Resume Timer",
    description: "Resume the presentation timer",
    phrases: ["resume timer", "resume the timer"],
  },
];

const normalizeTranscript = (text) =>
  text.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();

const hasMeaningfulBrowserTranscriptDelta = (beforeText, afterText) => {
  const before = normalizeTranscript(beforeText);
  const after = normalizeTranscript(afterText);

  if (!after || after === before || after.length < before.length) {
    return false;
  }

  const delta = after.slice(before.length).replace(/\s+/g, "");
  return delta.length >= MIN_BROWSER_TRANSCRIPT_DELTA_CHARS;
};

const mergeTranscriptSegment = (existingText, incomingText) => {
  const prev = existingText.replace(/\s+/g, " ").trim();
  const next = incomingText.replace(/\s+/g, " ").trim();

  if (!next) return prev;
  if (!prev) return next;

  if (prev.toLowerCase().endsWith(next.toLowerCase())) {
    return prev;
  }

  return `${prev} ${next}`.trim();
};

const matchExactCommand = (transcript) => {
  const normalized = normalizeTranscript(transcript);
  if (!normalized) return null;

  return (
    COMMANDS.find((command) =>
      command.phrases.some((phrase) => normalized.includes(normalizeTranscript(phrase)))
    ) || null
  );
};

const formatTime = (date = new Date()) =>
  date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

export default function DictationPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [useAI, setUseAI] = useState(false);
  const [browserTranscript, setBrowserTranscript] = useState("");
  const [aiTranscript, setAiTranscript] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [activeCommandId, setActiveCommandId] = useState(null);
  const [executedCommands, setExecutedCommands] = useState([]);
  const [highlightedExecutionId, setHighlightedExecutionId] = useState(null);

  const isRecordingRef = useRef(false);
  const useAIRef = useRef(false);
  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recognitionRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const audioContextRef = useRef(null);
  const isSegmentingRef = useRef(false);
  const heardSpeechRef = useRef(false);
  const speechFrameCountRef = useRef(0);
  const browserTranscriptRef = useRef("");
  const browserFinalTranscriptRef = useRef("");
  const segmentBrowserTranscriptSnapshotRef = useRef("");
  const recognitionRestartTimerRef = useRef(null);
  const recognitionActiveRef = useRef(false);
  const activeCommandTimerRef = useRef(null);
  const transcriptPanelRef = useRef(null);
  const commandsPanelRef = useRef(null);
  const executedCommandsPanelRef = useRef(null);
  const executionHighlightTimerRef = useRef(null);

  useEffect(() => {
    useAIRef.current = useAI;
  }, [useAI]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return undefined;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      recognitionActiveRef.current = true;
    };

    recognition.onresult = (event) => {
      let finalChunk = "";
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const text = result[0]?.transcript || "";

        if (result.isFinal) {
          finalChunk += `${text} `;
          browserFinalTranscriptRef.current += `${text} `;
        } else {
          interimTranscript += text;
        }
      }

      const nextTranscript =
        `${browserFinalTranscriptRef.current}${interimTranscript}`.trim();
      browserTranscriptRef.current = nextTranscript;
      setBrowserTranscript(nextTranscript);

      if (!useAIRef.current) {
        const matchedCommand = matchExactCommand(finalChunk);
        if (matchedCommand) {
          handleCommandExecution(matchedCommand, finalChunk.trim(), "Word match");
        }
      }
    };

    recognition.onend = () => {
      recognitionActiveRef.current = false;

      if (isRecordingRef.current) {
        recognitionRestartTimerRef.current = window.setTimeout(() => {
          if (!isRecordingRef.current || recognitionActiveRef.current) return;

          try {
            recognition.start();
          } catch (error) {
            console.warn("Speech recognition restart failed:", error);
          }
        }, 150);
      }
    };

    recognition.onerror = (event) => {
      if (event.error !== "aborted" && event.error !== "no-speech") {
        console.warn("Speech recognition error:", event.error);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  useEffect(() => {
    if (transcriptPanelRef.current) {
      transcriptPanelRef.current.scrollTop = transcriptPanelRef.current.scrollHeight;
    }
  }, [browserTranscript, aiTranscript, isTranscribing]);

  useEffect(() => {
    if (commandsPanelRef.current && activeCommandId) {
      const target = commandsPanelRef.current.querySelector(
        `[data-command-id="${activeCommandId}"]`
      );
      target?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeCommandId]);

  useEffect(() => {
    if (executedCommandsPanelRef.current && executedCommands.length > 0) {
      executedCommandsPanelRef.current.scrollTo({
        top: executedCommandsPanelRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [executedCommands]);

  useEffect(() => {
    return () => {
      if (activeCommandTimerRef.current) {
        clearTimeout(activeCommandTimerRef.current);
      }

      if (executionHighlightTimerRef.current) {
        clearTimeout(executionHighlightTimerRef.current);
      }
    };
  }, []);

  const handleCommandExecution = (command, phrase, source, reason = "") => {
    setActiveCommandId(command.id);

    if (activeCommandTimerRef.current) {
      clearTimeout(activeCommandTimerRef.current);
    }

    activeCommandTimerRef.current = window.setTimeout(() => {
      setActiveCommandId(null);
    }, 1800);

    const executionId = `${command.id}-${Date.now()}`;

    setExecutedCommands((prev) =>
      [
        ...prev,
        {
          id: executionId,
          label: command.label,
          source,
          phrase,
          reason,
          at: formatTime(),
        },
      ].slice(-7)
    );

    setHighlightedExecutionId(executionId);

    if (executionHighlightTimerRef.current) {
      clearTimeout(executionHighlightTimerRef.current);
    }

    executionHighlightTimerRef.current = window.setTimeout(() => {
      setHighlightedExecutionId(null);
    }, 2200);
  };

  const sendChunkToCloud = async (audioBlob) => {
    if (!audioBlob || audioBlob.size === 0 || !useAIRef.current) return;

    setIsTranscribing(true);

    const formData = new FormData();
    formData.append("file", audioBlob, "chunk.webm");
    formData.append("context", aiTranscript.slice(-300));
    formData.append("transcript", aiTranscript);
    formData.append("aiMode", "true");
    formData.append(
      "commands",
      JSON.stringify(
        COMMANDS.map((command) => ({
          id: command.id,
          label: command.label,
          phrases: command.phrases,
          description: command.description,
        }))
      )
    );

    try {
      const res = await fetch("/demo-dictation/api", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        console.error("Transcription Error:", errData.details || errData.error);
        return;
      }

      const data = await res.json();
      const nextText = data.text?.trim() || data.rawText?.trim();

      if (nextText) {
        setAiTranscript((prev) => mergeTranscriptSegment(prev, nextText));
      }

      setBrowserTranscript("");
      browserTranscriptRef.current = "";
      browserFinalTranscriptRef.current = "";
      segmentBrowserTranscriptSnapshotRef.current = "";

      if (data.matchedCommandId) {
        const matchedCommand = COMMANDS.find(
          (command) => command.id === data.matchedCommandId
        );

        if (matchedCommand) {
          handleCommandExecution(
            matchedCommand,
            data.rawText?.trim() || nextText || "",
            "AI intent",
            data.matchReason || ""
          );
        }
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setIsTranscribing(false);
    }
  };

  const startMediaRecorder = (stream) => {
    const options = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
      ? { mimeType: "audio/webm;codecs=opus" }
      : undefined;

    const recorder = new MediaRecorder(stream, options);
    audioChunksRef.current = [];
    heardSpeechRef.current = false;
    speechFrameCountRef.current = 0;
    segmentBrowserTranscriptSnapshotRef.current = browserTranscriptRef.current;

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      const chunks = audioChunksRef.current;
      const hadSpeech = heardSpeechRef.current;
      const speechFrameCount = speechFrameCountRef.current;
      const shouldRestart = isRecordingRef.current && stream.active;
      const mimeType = recorder.mimeType || "audio/webm";
      const browserTranscriptChanged = hasMeaningfulBrowserTranscriptDelta(
        segmentBrowserTranscriptSnapshotRef.current,
        browserTranscriptRef.current
      );

      audioChunksRef.current = [];
      heardSpeechRef.current = false;
      speechFrameCountRef.current = 0;
      isSegmentingRef.current = false;

      if (shouldRestart) {
        startMediaRecorder(stream);
      } else if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }

      if (
        useAIRef.current &&
        hadSpeech &&
        speechFrameCount >= MIN_SPEECH_FRAMES &&
        browserTranscriptChanged &&
        chunks.length > 0
      ) {
        const audioBlob = new Blob(chunks, { type: mimeType });
        if (audioBlob.size >= MIN_AUDIO_BLOB_BYTES) {
          void sendChunkToCloud(audioBlob);
        }
      }
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
  };

  const flushCurrentSegment = () => {
    const recorder = mediaRecorderRef.current;

    if (!recorder || recorder.state !== "recording" || isSegmentingRef.current) {
      return;
    }

    isSegmentingRef.current = true;
    recorder.stop();
  };

  const setupSilenceDetection = (stream) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    source.connect(analyser);

    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    const checkSilence = () => {
      if (!isRecordingRef.current) return;

      analyser.getByteTimeDomainData(dataArray);
      let sumSquares = 0;

      for (let i = 0; i < bufferLength; i++) {
        const normalized = (dataArray[i] - 128) / 128;
        sumSquares += normalized * normalized;
      }

      const rms = Math.sqrt(sumSquares / bufferLength);

      if (rms >= SILENCE_RMS_THRESHOLD) {
        speechFrameCountRef.current += 1;
        if (speechFrameCountRef.current >= MIN_SPEECH_FRAMES) {
          heardSpeechRef.current = true;
        }
      }

      if (rms < SILENCE_RMS_THRESHOLD && heardSpeechRef.current) {
        if (!silenceTimerRef.current) {
          silenceTimerRef.current = setTimeout(() => {
            flushCurrentSegment();
            silenceTimerRef.current = null;
          }, SILENCE_GAP_MS);
        }
      } else if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }

      requestAnimationFrame(checkSilence);
    };

    audioContextRef.current = audioContext;
    checkSilence();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      isRecordingRef.current = true;
      setBrowserTranscript("");
      setAiTranscript("");
      setExecutedCommands([]);
      browserTranscriptRef.current = "";
      browserFinalTranscriptRef.current = "";

      mediaStreamRef.current = stream;
      startMediaRecorder(stream);

      if (recognitionRestartTimerRef.current) {
        clearTimeout(recognitionRestartTimerRef.current);
      }

      if (recognitionRef.current && !recognitionActiveRef.current) {
        recognitionRef.current.start();
      }

      setupSilenceDetection(stream);
    } catch (error) {
      console.error(error);
      alert("Microphone access denied.");
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    isRecordingRef.current = false;

    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }

    if (recognitionRestartTimerRef.current) {
      clearTimeout(recognitionRestartTimerRef.current);
      recognitionRestartTimerRef.current = null;
    }

    if (mediaRecorderRef.current?.state === "recording") {
      flushCurrentSegment();
    } else if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    if (recognitionRef.current && recognitionActiveRef.current) {
      recognitionRef.current.stop();
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6 font-sans">
      <Link
        href="/#fullDemo"
        className="fixed top-6 left-6 z-20 flex items-center gap-2 text-gray-400 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold"
      >
        <FaArrowLeft /> Exit Demo
      </Link>

      <div className="max-w-7xl mx-auto pt-16 pb-6 flex flex-col gap-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-3xl text-left">
            <h1 className="text-5xl md:text-6xl font-semibold tracking-[-0.04em] leading-none text-white">
              The Voice Interface Loop
            </h1>
            <p className="text-gray-500 mt-3 text-lg">
              Continuous speech, pause detection, transcription, and command execution.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start">
            {!isRecording ? (
              <button
                onClick={startRecording}
                aria-label="Start recording"
                className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-110"
              >
                <FaMicrophone className="text-xl" />
                <div className="absolute -inset-3 -z-10 scale-150 rounded-full bg-white/5 animate-pulse" />
              </button>
            ) : (
              <button
                onClick={stopRecording}
                aria-label="Stop recording"
                className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-600 text-white transition-all scale-110 active:scale-95 animate-pulse"
              >
                <FaStop className="text-xl" />
              </button>
            )}

            <button
              type="button"
              aria-label={useAI ? "Disable AI intent matching" : "Enable AI intent matching"}
              onClick={() => {
                const nextUseAI = !useAI;
                setUseAI(nextUseAI);
                setAiTranscript("");
                setBrowserTranscript("");
                browserTranscriptRef.current = "";
                browserFinalTranscriptRef.current = "";
                segmentBrowserTranscriptSnapshotRef.current = "";
              }}
              className={`flex h-16 w-16 items-center justify-center rounded-full border transition-colors ${
                useAI
                  ? "border-pink-500/50 bg-pink-500/15 text-pink-400"
                  : "border-gray-700 bg-[#171717] text-gray-500 hover:text-gray-300"
              }`}
            >
              <FaRobot className="text-xl" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_1fr_1fr] gap-5 min-h-[440px]">
          <section className="bg-[#171717] rounded-3xl border border-gray-800 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-gray-500">
                  What you said
                </div>
                <div className="text-xl font-semibold mt-1">
                  Continuous transcript
                </div>
              </div>
              {useAI && (
                <div className="text-xs uppercase tracking-[0.25em] px-3 py-2 rounded-full border border-pink-500/40 text-pink-400">
                  AI on
                </div>
              )}
            </div>

            <div
              ref={transcriptPanelRef}
              className="flex-1 min-h-[220px] overflow-y-auto rounded-2xl bg-black/30 p-5 text-2xl leading-relaxed text-gray-100"
            >
              {browserTranscript || "Start talking..."}
            </div>

            <div className="mt-4 rounded-2xl bg-[#101010] border border-gray-800 p-4">
              <div className="text-gray-500 uppercase tracking-[0.25em] text-[11px] mb-2">
                AI transcription
              </div>
              <div className="text-gray-300 text-base leading-relaxed min-h-[48px]">
                {useAI
                  ? aiTranscript ||
                    (isTranscribing
                      ? "Thinking about intent..."
                      : "Pause after speaking to let AI infer intent.")
                  : "Turn on AI to compare raw words with inferred intent."}
              </div>
            </div>
          </section>

          <section className="bg-[#171717] rounded-3xl border border-gray-800 p-6 flex flex-col">
            <div className="mb-4">
              <div className="text-xs uppercase tracking-[0.3em] text-gray-500">
                Available Commands
              </div>
              <div className="text-xl font-semibold mt-1">Command phrases</div>
            </div>

            <div
              ref={commandsPanelRef}
              className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-3 auto-rows-max"
            >
              {COMMANDS.map((command) => {
                const isActiveCommand = activeCommandId === command.id;
                return (
                  <div
                    key={command.id}
                    data-command-id={command.id}
                    className={`rounded-2xl border p-4 transition-all ${
                      isActiveCommand
                        ? "border-emerald-400 bg-emerald-500/10 shadow-[0_0_0_1px_rgba(52,211,153,0.2)]"
                        : "border-gray-800 bg-black/20"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-lg font-semibold">{command.label}</div>
                      {isActiveCommand && (
                        <div className="text-[11px] uppercase tracking-[0.25em] text-emerald-300">
                          Matched
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">{command.description}</div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {command.phrases.map((phrase) => (
                        <span
                          key={phrase}
                          className="rounded-full border border-gray-700 px-2 py-1 text-xs text-gray-300"
                        >
                          {phrase}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="bg-[#171717] rounded-3xl border border-gray-800 p-6 flex flex-col">
            <div className="mb-4">
              <div className="text-xs uppercase tracking-[0.3em] text-gray-500">
                Commands Executed
              </div>
              <div className="text-xl font-semibold mt-1">What the system picked</div>
            </div>

            <div
              ref={executedCommandsPanelRef}
              className="min-h-0 max-h-[390px] overflow-y-auto space-y-3 pr-1"
            >
              {executedCommands.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-700 bg-black/20 p-5 text-gray-500">
                  No commands executed yet.
                </div>
              ) : (
                executedCommands.map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={
                      highlightedExecutionId === entry.id
                        ? {
                            opacity: 1,
                            y: 0,
                            borderColor: [
                              "rgba(52, 211, 153, 0.85)",
                              "rgba(52, 211, 153, 0.35)",
                              "rgba(52, 211, 153, 0.85)",
                            ],
                            boxShadow: [
                              "0 0 0 0 rgba(52, 211, 153, 0.30)",
                              "0 0 0 6px rgba(52, 211, 153, 0.08)",
                              "0 0 0 0 rgba(52, 211, 153, 0.00)",
                            ],
                          }
                        : {
                            opacity: 1,
                            y: 0,
                            borderColor: "rgba(31, 41, 55, 1)",
                            boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
                          }
                    }
                    transition={
                      highlightedExecutionId === entry.id
                        ? { duration: 1.2, repeat: 1, ease: "easeInOut" }
                        : { duration: 0.2 }
                    }
                    className="rounded-2xl border bg-black/20 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-lg font-semibold">{entry.label}</div>
                      <div className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
                        {entry.at}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em]">
                      <span
                        className={`rounded-full px-2 py-1 ${
                          entry.source === "AI intent"
                            ? "bg-pink-500/15 text-pink-300"
                            : "bg-blue-500/15 text-blue-300"
                        }`}
                      >
                        {entry.source}
                      </span>
                    </div>
                    <div className="mt-3 text-gray-300">"{entry.phrase}"</div>
                    {entry.reason && (
                      <div className="mt-2 text-sm text-gray-500">{entry.reason}</div>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </section>
        </div>

        <div className="rounded-3xl border border-gray-800 bg-[#171717] px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-gray-500">
            <FaWaveSquare />
            {useAI ? "Words -> transcript -> intent" : "Words -> exact command match"}
          </div>

          {useAI && (
            <div className="text-xs uppercase tracking-[0.25em] px-3 py-2 rounded-full border border-pink-500/40 text-pink-400">
              AI mode
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
