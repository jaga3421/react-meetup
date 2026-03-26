"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMicrophone, FaStop, FaArrowLeft, FaCloud, FaDesktop } from "react-icons/fa";
import Link from "next/link";

const MAX_TRANSCRIPT_CONTEXT_CHARS = 500;
const SILENCE_GAP_MS = 500;
const SILENCE_RMS_THRESHOLD = 0.02;
const MIN_SPEECH_FRAMES = 6;
const MIN_AUDIO_BLOB_BYTES = 1200;
const MIN_BROWSER_TRANSCRIPT_DELTA_CHARS = 8;

const normalizeTranscript = (text) => text.replace(/\s+/g, " ").trim();

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
  const prev = normalizeTranscript(existingText);
  const next = normalizeTranscript(incomingText);

  if (!next) return prev;
  if (!prev) return next;

  const prevLower = prev.toLowerCase();
  const nextLower = next.toLowerCase();

  if (prevLower.endsWith(nextLower) || prevLower.includes(nextLower)) {
    return prev;
  }

  let overlapLength = 0;
  const maxOverlap = Math.min(prevLower.length, nextLower.length);

  for (let i = maxOverlap; i >= 12; i--) {
    if (prevLower.slice(-i) === nextLower.slice(0, i)) {
      overlapLength = i;
      break;
    }
  }

  const suffix = next.slice(overlapLength).trim();
  return suffix ? `${prev} ${suffix}` : prev;
};

export default function DictationPage() {
  const [isRecording, setIsRecording] = useState(false);
  const isRecordingRef = useRef(false);
  const [cloudTranscript, setCloudTranscript] = useState("");
  const [browserTranscript, setBrowserTranscript] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);
  
  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recognitionRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const isSegmentingRef = useRef(false);
  const heardSpeechRef = useRef(false);
  const speechFrameCountRef = useRef(0);
  const cloudTranscriptRef = useRef("");
  const browserTranscriptRef = useRef("");
  const browserFinalTranscriptRef = useRef("");
  const segmentBrowserTranscriptSnapshotRef = useRef("");
  const recognitionRestartTimerRef = useRef(null);
  const recognitionActiveRef = useRef(false);
  const browserTranscriptPanelRef = useRef(null);
  const cloudTranscriptPanelRef = useRef(null);

  useEffect(() => {
    // Setup Browser Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.maxAlternatives = 1;
      recognitionRef.current.onstart = () => {
        recognitionActiveRef.current = true;
      };
      recognitionRef.current.onresult = (event) => {
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const text = result[0]?.transcript || "";

          if (result.isFinal) {
            browserFinalTranscriptRef.current += `${text} `;
          } else {
            interimTranscript += text;
          }
        }

        const nextBrowserTranscript =
          `${browserFinalTranscriptRef.current}${interimTranscript}`.trim();
        browserTranscriptRef.current = nextBrowserTranscript;
        setBrowserTranscript(nextBrowserTranscript);
      };
      recognitionRef.current.onend = () => {
        recognitionActiveRef.current = false;

        if (isRecordingRef.current) {
          recognitionRestartTimerRef.current = window.setTimeout(() => {
            if (!isRecordingRef.current || recognitionActiveRef.current) return;

            try {
              recognitionRef.current.start();
            } catch (error) {
              console.warn("Speech recognition restart failed:", error);
            }
          }, 150);
        }
      };
      recognitionRef.current.onerror = (event) => {
        if (event.error !== "aborted" && event.error !== "no-speech") {
          console.warn("Speech recognition error:", event.error);
        }
      };
    }
    return () => stopRecording();
  }, []);

  useEffect(() => {
    if (browserTranscriptPanelRef.current) {
      browserTranscriptPanelRef.current.scrollTop =
        browserTranscriptPanelRef.current.scrollHeight;
    }
  }, [browserTranscript]);

  useEffect(() => {
    if (cloudTranscriptPanelRef.current) {
      cloudTranscriptPanelRef.current.scrollTop =
        cloudTranscriptPanelRef.current.scrollHeight;
    }
  }, [cloudTranscript, isTranscribing]);

  const sendChunkToCloud = async (audioBlob) => {
    if (!audioBlob || audioBlob.size === 0) return;

    console.log("Uploading chunk to OpenAI...", audioBlob.size);
    setIsTranscribing(true);

    const recentContext = cloudTranscriptRef.current
      .slice(-MAX_TRANSCRIPT_CONTEXT_CHARS)
      .trim();
    const currentTranscript = cloudTranscriptRef.current.trim();

    const formData = new FormData();
    formData.append("file", audioBlob, "chunk.webm");
    formData.append("context", recentContext);
    formData.append("transcript", currentTranscript);

    try {
      const res = await fetch("/demo-dictation/api", { method: "POST", body: formData });

      if (!res.ok) {
        const errData = await res.json();
        console.error("Transcription Error:", errData.details || errData.error);
        return;
      }

      const data = await res.json();
      const formattedTranscript = data.text?.trim();
      const nextText = data.rawText?.trim();

      if (formattedTranscript) {
        setCloudTranscript((prev) => {
          const merged = mergeTranscriptSegment(prev, formattedTranscript);
          cloudTranscriptRef.current = merged;
          return merged;
        });
      } else if (nextText) {
        setCloudTranscript((prev) => {
          const merged = mergeTranscriptSegment(prev, nextText);
          cloudTranscriptRef.current = merged;
          return merged;
        });
      }
    } catch (err) {
      console.error("Fetch Error:", err);
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
        console.log("Segment received:", event.data.size);
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
        hadSpeech &&
        speechFrameCount >= MIN_SPEECH_FRAMES &&
        browserTranscriptChanged &&
        chunks.length > 0
      ) {
        const audioBlob = new Blob(chunks, { type: mimeType });

        if (audioBlob.size >= MIN_AUDIO_BLOB_BYTES) {
          void sendChunkToCloud(audioBlob);
        } else {
          console.log("Skipping tiny audio segment:", audioBlob.size);
        }
      } else if (hadSpeech && !browserTranscriptChanged) {
        console.log("Skipping OpenAI upload: no browser transcript change detected");
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

      // Log volume every 2 seconds for debugging
      if (Date.now() % 2000 < 20) {
        console.log("Current RMS Volume:", rms.toFixed(4), "Threshold:", SILENCE_RMS_THRESHOLD);
      }

      if (rms >= SILENCE_RMS_THRESHOLD) {
        speechFrameCountRef.current += 1;

        if (speechFrameCountRef.current >= MIN_SPEECH_FRAMES) {
          heardSpeechRef.current = true;
        }
      }

      if (rms < SILENCE_RMS_THRESHOLD && heardSpeechRef.current) {
        if (!silenceTimerRef.current) {
          silenceTimerRef.current = setTimeout(() => {
            console.log("Gap detected. Sending audio...");
            flushCurrentSegment();
            silenceTimerRef.current = null;
          }, SILENCE_GAP_MS);
        }
      } else {
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = null;
        }
      }
      requestAnimationFrame(checkSilence);
    };
    
    audioContextRef.current = audioContext;
    analyserRef.current = analyser;
    checkSilence();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      isRecordingRef.current = true;
      setCloudTranscript("");
      cloudTranscriptRef.current = "";
      browserTranscriptRef.current = "";
      browserFinalTranscriptRef.current = "";
      segmentBrowserTranscriptSnapshotRef.current = "";
      setBrowserTranscript("");

      mediaStreamRef.current = stream;
      startMediaRecorder(stream);

      if (recognitionRestartTimerRef.current) {
        clearTimeout(recognitionRestartTimerRef.current);
        recognitionRestartTimerRef.current = null;
      }

      if (recognitionRef.current && !recognitionActiveRef.current) {
        recognitionRef.current.start();
      }

      setupSilenceDetection(stream);
    } catch (err) {
      console.error(err);
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
    if (audioContextRef.current) audioContextRef.current.close();
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col p-6 font-sans">
      <Link href="/" className="fixed top-6 left-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold">
        <FaArrowLeft /> Exit Demo
      </Link>

      <div className="flex-1 max-w-6xl w-full mx-auto flex flex-col items-center justify-center gap-12">
        <div className="text-center">
          <h1 className="text-6xl font-black mb-2 tracking-tighter uppercase italic">The Listening App</h1>
          <p className="text-gray-500 font-medium">Real-time Browser API vs Cloud Intelligence (OpenAI Transcribe)</p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full h-[400px]">
          {/* Browser Panel */}
          <div className="bg-[#1a1a1a] rounded-3xl p-8 border border-gray-800 flex flex-col gap-4 relative overflow-hidden group">
            <div className="flex items-center gap-3 text-blue-500">
              <FaDesktop />
              <span className="font-bold uppercase tracking-widest text-sm">Built-in API (Zero Latency)</span>
            </div>
            <div
              ref={browserTranscriptPanelRef}
              className={`flex-1 overflow-y-auto text-2xl leading-relaxed text-gray-300 ${isRecording ? 'opacity-100' : 'opacity-50'}`}
            >
              {browserTranscript || "Waiting for speech..."}
            </div>
            {isRecording && <div className="absolute top-8 right-8 w-2 h-2 bg-blue-500 rounded-full animate-ping" />}
          </div>

          {/* Cloud Panel */}
          <div className="bg-[#1a1a1a] rounded-3xl p-8 border border-gray-800 flex flex-col gap-4 relative group">
            <div className="flex items-center gap-3 text-pink-500">
              <FaCloud />
              <span className="font-bold uppercase tracking-widest text-sm">OpenAI Transcribe (High Accuracy)</span>
            </div>
            <div
              ref={cloudTranscriptPanelRef}
              className={`flex-1 overflow-y-auto text-2xl leading-relaxed text-pink-50 ${isTranscribing ? 'opacity-70' : 'opacity-100'}`}
            >
              {cloudTranscript || (isTranscribing ? "Transcribing gap..." : "Waiting for audio segments...")}
            </div>
            <AnimatePresence>
                {isTranscribing && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute bottom-6 right-6 flex gap-1"
                    >
                        {[1,2,3].map(i => <motion.div key={i} animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: i*0.1 }} className="w-1 h-3 bg-pink-500 rounded-full" />)}
                    </motion.div>
                )}
            </AnimatePresence>
          </div>
        </div>

        {/* Record Button */}
        <div className="relative">
          {!isRecording ? (
            <button onClick={startRecording} className="group relative w-24 h-24 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform">
                <FaMicrophone className="text-2xl" />
                <div className="absolute -inset-4 bg-white/5 rounded-full -z-10 animate-pulse scale-150" />
            </button>
          ) : (
            <button onClick={stopRecording} className="w-24 h-24 bg-pink-600 rounded-full flex items-center justify-center text-white scale-110 active:scale-95 transition-all animate-pulse">
                <FaStop className="text-2xl" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
