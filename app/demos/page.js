"use client";

import React from "react";
import DemoOne from "@/app/tensor/DemoOne";
import DemoTwo from "@/app/tensor/DemoTwo";
import DemoThree from "@/app/tensor/DemoThree";

import { useState } from 'react';




const Demos = () => {
    const [activeDemo, setActiveDemo] = useState(null);
  return (
    <>
      <nav className="flex flex-row gap-4 justify-center w-full absolute top 0">
        <button className="cursor-pointer p-2 hover:bg-gray-100 rounded-md" onClick={() => setActiveDemo('demoOne')}>
          Demo One
        </button>
        <button className="cursor-pointer p-2 hover:bg-gray-100 rounded-md" onClick={() => setActiveDemo('demoTwo')}>
          Demo Two
        </button>
        <button className="cursor-pointer p-2 hover:bg-gray-100 rounded-md" onClick={() => setActiveDemo('demoThree')}>
          Demo Three
        </button>
      </nav>
      {activeDemo === 'demoOne' && <DemoOne />}
      {activeDemo === 'demoTwo' && <DemoTwo />}
      {activeDemo === 'demoThree' && <DemoThree />}
    </>
  );
};

export default Demos;
