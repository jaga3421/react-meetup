"use client";
import React, { useState, useEffect } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { FaCirclePause } from "react-icons/fa6";

const TimerComponent = ({ timer }) => {
  const totalTime = timer * 60; // Convert minutes to seconds
  const [secondsLeft, setSecondsLeft] = useState(totalTime);
  const [isActive, setIsActive] = useState(false);

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

  const toggleTimer = () => {
    if (secondsLeft > 0) {
      setIsActive(!isActive);
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
  );
};

export default TimerComponent;
