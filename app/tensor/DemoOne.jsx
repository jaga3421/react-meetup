import React, { useEffect, useRef, useState} from "react";
import * as faceapi from "face-api.js";

const FaceDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [ faces, setFaces ] = useState(0);
  const intervalRef = useRef(null); // Reference to store the interval

  useEffect(() => {
    let isComponentMounted = true; // Flag to track component mount state

    const loadModels = async () => {
      const MODEL_URL = "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      if (isComponentMounted) {
        console.log("Models loaded from CDN.");
        startVideo();
      }
    };

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current && isComponentMounted) {
          videoRef.current.srcObject = stream;
          console.log("Video stream started.");
          videoRef.current.onloadedmetadata = () => {
            detectFaces(); // Start detection only after video metadata is loaded
          };
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    const detectFaces = async () => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        // Match canvas size to video dimensions
        const displaySize = { width: video.videoWidth, height: video.videoHeight };
        faceapi.matchDimensions(canvas, displaySize);

        // Store interval reference for cleanup
        intervalRef.current = setInterval(async () => {
          if (!isComponentMounted) return; // Check if component is still mounted

          const detections = await faceapi.detectAllFaces(
            video,
            new faceapi.TinyFaceDetectorOptions()
          );
          
          if (isComponentMounted) {
            setFaces(detections.length);
            console.log("Detections:", detections);

            const resizedDetections = faceapi.resizeResults(detections, displaySize);

            // Clear and draw detections on the canvas
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resizedDetections);
          }
        }, 100);
      }
    };

    loadModels();

    // Cleanup function
    return () => {
      isComponentMounted = false; // Set mounted flag to false

      // Clear the detection interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      // Stop the video stream
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }

      // Clear the canvas
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }

      // Reset faces count
      setFaces(0);

      console.log("Component cleanup completed");
    };
  }, []);

  return (
    <div className="w-full h-screen bg-gray-200 p-16">
      <h1 className="text-2xl font-bold text-center">Simple Detection</h1>
      <div className="relative h-1/2 w-1/2 mx-auto">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
      <p className="text-center text-lg font-bold">
        Number of faces: {faces}
      </p>
    </div>
  );
};

export default FaceDetection;