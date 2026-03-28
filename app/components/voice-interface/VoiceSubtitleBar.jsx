"use client";

import { useEffect, useReducer } from "react";

const MAX_SUBTITLE_PHRASES = 1;

const normalizeText = (text) => text.replace(/\s+/g, " ").trim();

const getSubtitleText = (phrases, liveFragment) => {
  const committedText = phrases.map(normalizeText).filter(Boolean).join(" ");
  const currentText = normalizeText(liveFragment);
  const combined = [committedText, currentText].filter(Boolean).join(" ").trim();

  if (!combined) return "";

  const sentences = combined
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  if (sentences.length >= 2) {
    return sentences.slice(-2).join(" ");
  }

  const words = combined.split(" ");
  if (words.length > 24) {
    return words.slice(-24).join(" ");
  }

  return combined;
};

const initialState = {
  isVisible: false,
  subtitlePhrases: [],
  liveFragment: "",
};

function subtitleReducer(state, action) {
  switch (action.type) {
    case "set_visibility":
      return {
        ...state,
        isVisible: action.visible,
        subtitlePhrases: [],
        liveFragment: "",
      };
    case "update_live":
      if (!state.isVisible) {
        return state;
      }

      return {
        ...state,
        liveFragment: action.text,
      };
    case "commit_phrase":
      if (!state.isVisible) {
        return state;
      }

      if (!action.text) {
        return {
          ...state,
          liveFragment: "",
        };
      }

      return {
        ...state,
        subtitlePhrases: [...state.subtitlePhrases, action.text].slice(
          -MAX_SUBTITLE_PHRASES
        ),
        liveFragment: "",
      };
    case "reset_text":
      return {
        ...state,
        subtitlePhrases: [],
        liveFragment: "",
      };
    default:
      return state;
  }
}

export default function VoiceSubtitleBar() {
  const [state, dispatch] = useReducer(subtitleReducer, initialState);

  useEffect(() => {
    const handleVisibility = (event) => {
      dispatch({
        type: "set_visibility",
        visible: Boolean(event.detail?.visible),
      });
    };

    const handleFragmentUpdate = (event) => {
      dispatch({
        type: "update_live",
        text: event.detail?.text || "",
      });
    };

    const handleCommit = (event) => {
      const phrase = normalizeText(event.detail?.text || "");
      dispatch({
        type: "commit_phrase",
        text: phrase,
      });
    };

    const handleReset = () => {
      dispatch({ type: "reset_text" });
    };

    window.addEventListener(
      "voice-interface:subtitle-visibility",
      handleVisibility
    );
    window.addEventListener(
      "voice-interface:subtitle-fragment",
      handleFragmentUpdate
    );
    window.addEventListener("voice-interface:subtitle-commit", handleCommit);
    window.addEventListener("voice-interface:subtitle-clear", handleReset);

    return () => {
      window.removeEventListener(
        "voice-interface:subtitle-visibility",
        handleVisibility
      );
      window.removeEventListener(
        "voice-interface:subtitle-fragment",
        handleFragmentUpdate
      );
      window.removeEventListener("voice-interface:subtitle-commit", handleCommit);
      window.removeEventListener("voice-interface:subtitle-clear", handleReset);
    };
  }, []);

  if (!state.isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[9997] flex justify-center px-8 pb-6">
      <div className="max-w-5xl rounded-2xl bg-black/75 px-6 py-4 text-center text-3xl font-medium leading-tight text-white shadow-2xl backdrop-blur-md">
        <div
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {getSubtitleText(state.subtitlePhrases, state.liveFragment) || "Listening..."}
        </div>
      </div>
    </div>
  );
}
