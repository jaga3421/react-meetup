"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { FaCirclePause } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";

const TimerComponent = ({ timer }) => {
  const totalTime = timer * 60; // Convert minutes to seconds
  const [secondsLeft, setSecondsLeft] = useState(totalTime);
  const [isActive, setIsActive] = useState(false);
  const [showTimerFocus, setShowTimerFocus] = useState(false);
  const [timerActionLabel, setTimerActionLabel] = useState("");
  const focusTimerRef = useRef(null);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (secondsLeft === 0) {
      setIsActive(false); // Automatically stop the timer when it reaches 0
    }
  }, [secondsLeft]);

  useEffect(() => {
    return () => {
      if (focusTimerRef.current) {
        clearTimeout(focusTimerRef.current);
      }
    };
  }, []);

  const triggerTimerFocus = (actionLabel) => {
    setTimerActionLabel(actionLabel);
    setShowTimerFocus(true);

    if (focusTimerRef.current) {
      clearTimeout(focusTimerRef.current);
    }

    focusTimerRef.current = setTimeout(() => {
      setShowTimerFocus(false);
    }, 3000);
  };

  const getPlayActionLabel = () =>
    secondsLeft === totalTime ? "Start" : "Resume";

  useEffect(() => {
    const handleVoiceTimerCommand = (event) => {
      const action = event.detail?.action;

      if (action === "start" || action === "resume") {
        if (secondsLeft > 0) {
          setIsActive(true);
          triggerTimerFocus(action === "start" ? "Start" : "Resume");
        }
      }

      if (action === "pause") {
        setIsActive(false);
        triggerTimerFocus("Pause");
      }
    };

    window.addEventListener("voice-interface:timer-command", handleVoiceTimerCommand);
    return () =>
      window.removeEventListener("voice-interface:timer-command", handleVoiceTimerCommand);
  }, [secondsLeft]);

  const toggleTimer = () => {
    if (secondsLeft > 0) {
      const nextIsActive = !isActive;
      setIsActive(nextIsActive);
      triggerTimerFocus(nextIsActive ? getPlayActionLabel() : "Pause");
    }
  };

  const formatTime = () => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const getColor = () => {
    const thirdOfTime = totalTime / 3;
    if (secondsLeft > 2 * thirdOfTime) return "text-green-500";
    else if (secondsLeft > thirdOfTime) return "text-yellow-500";
    else return "text-red-500";
  };

  return (
    <>
      <div
        className={`absolute cursor-pointer text-2xl top-0 right-0 p-2 z-[9999]  ${getColor()} ${
          secondsLeft === 0 ? "blink" : ""
        }`}
        onClick={toggleTimer}
      >
        <span className="text-left flex flex-row space-x-2 items-center justify-center w-[100px] opacity-55">
          <span className="my-2 inline-block px-2">
            {isActive ? <FaCirclePause /> : <FaPlayCircle />}
          </span>
          {"  "} {formatTime()}
        </span>
      </div>

      <AnimatePresence>
        {showTimerFocus && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(6px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="pointer-events-none fixed inset-0 z-[9998] flex items-center justify-center bg-black/20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.55, y: 80, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.72, y: -48, rotate: 4 }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 16,
                mass: 0.8,
              }}
              className={`rounded-[2rem] border border-white/10 bg-black/70 px-12 py-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.45)] ${getColor()}`}
            >
              <div className="mb-2 text-sm uppercase tracking-[0.35em] text-gray-300">
                {timerActionLabel}
              </div>
              <div className="flex items-center justify-center gap-5 text-8xl font-semibold">
                <span>{isActive ? <FaCirclePause /> : <FaPlayCircle />}</span>
                <span>{formatTime()}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TimerComponent;
