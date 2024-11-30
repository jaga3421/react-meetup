"use client";

import React, { useEffect } from "react";
import DemoOne from "@/app/tensor/DemoOne";
import DemoTwo from "@/app/tensor/DemoTwo";
import DemoThree from "@/app/tensor/DemoThree";

import { useState } from 'react';

const Demos = () => {
    const [activeDemo, setActiveDemo] = useState(null);

    // Cleanup function to stop all media streams
    const cleanupMediaStreams = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            })
            .catch(err => console.log("Cleanup error:", err));
    };

    // Handle demo changes
    const handleDemoChange = (demo) => {
        // Cleanup existing streams before changing demos
        cleanupMediaStreams();
        setActiveDemo(demo);
    };

    // Cleanup on component unmount
    useEffect(() => {
        return () => {
            cleanupMediaStreams();
        };
    }, []);

    return (
        <>
            <nav className="flex flex-row gap-4 justify-center w-full absolute top-0">
                <button 
                    className={`cursor-pointer p-2 hover:bg-gray-100 rounded-md ${activeDemo === 'demoOne' ? 'bg-gray-200' : ''}`} 
                    onClick={() => handleDemoChange('demoOne')}
                >
                    Demo One
                </button>
                <button 
                    className={`cursor-pointer p-2 hover:bg-gray-100 rounded-md ${activeDemo === 'demoTwo' ? 'bg-gray-200' : ''}`}
                    onClick={() => handleDemoChange('demoTwo')}
                >
                    Demo Two
                </button>
                <button 
                    className={`cursor-pointer p-2 hover:bg-gray-100 rounded-md ${activeDemo === 'demoThree' ? 'bg-gray-200' : ''}`}
                    onClick={() => handleDemoChange('demoThree')}
                >
                    Demo Three
                </button>
            </nav>
            <div className="mt-16">
                {activeDemo === 'demoOne' && <DemoOne />}
                {activeDemo === 'demoTwo' && <DemoTwo />}
                {activeDemo === 'demoThree' && <DemoThree />}
            </div>
        </>
    );
};

export default Demos;
