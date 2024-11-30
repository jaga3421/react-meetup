import React, { useEffect, useRef, useState} from "react";
import * as faceapi from "face-api.js";

const DemoThree = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [ faces, setFaces ] = useState(0);
  const maskImageRef = useRef(null);

  useEffect(() => {
    let isComponentMounted = true;

    // Load the mask image
    const maskImage = new Image();
    maskImage.src = '/images/mask.png'; // Update the path to your mask image
    maskImage.onload = () => {
      console.log("Mask image loaded");
      maskImageRef.current = maskImage;
    };

    const loadModels = async () => {
      const MODEL_URL = "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights";
      
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL), // Added for better face landmark detection
        ]);
        
        if (isComponentMounted) {
          console.log("All models loaded from CDN.");
          startVideo();
        }
      } catch (error) {
        console.error("Error loading models:", error);
      }
    };

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current && isComponentMounted) {
          videoRef.current.srcObject = stream;
          console.log("Video stream started.");
          videoRef.current.onloadedmetadata = () => {
            detectFaces();
          };
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    const drawMaskOnFace = (ctx, detection, displaySize) => {
      if (!maskImageRef.current) return;

      const landmarks = detection.landmarks;
      const nose = landmarks.getNose();
      const jawline = landmarks.getJawOutline();

      // Calculate face size and distance
      const faceWidth = jawline[16].x - jawline[0].x;
      const faceHeight = (nose[6].y - landmarks.positions[24].y) * 2;
      
      // Calculate distance factor (based on face width relative to screen width)
      const distanceFactor = faceWidth / displaySize.width;
      const scaleFactor = 1.4 + (1 - distanceFactor) * 0.5; // Adjust scale based on distance

      // Calculate base dimensions with 40% increase
      const baseWidth = faceWidth * 1.4;  // 40% wider
      const baseHeight = faceHeight * 1.4; // 40% taller

      // Apply distance-based scaling
      const maskWidth = baseWidth * scaleFactor;
      const maskHeight = baseHeight * scaleFactor;

      // Adjust position to maintain center alignment
      const widthDiff = maskWidth - faceWidth;
      const heightDiff = maskHeight - faceHeight;
      
      const maskX = jawline[0].x - (widthDiff / 2);
      const maskY = landmarks.positions[24].y - (heightDiff / 3); // Adjusted to better align with face

      // Add smoothing for mask position
      let lastX = maskX;
      let lastY = maskY;
      const smoothingFactor = 0.8;
      
      const smoothX = lastX * (1 - smoothingFactor) + maskX * smoothingFactor;
      const smoothY = lastY * (1 - smoothingFactor) + maskY * smoothingFactor;
      
      lastX = smoothX;
      lastY = smoothY;

      // Draw the mask with adjusted position and size
      ctx.drawImage(
        maskImageRef.current,
        smoothX,
        smoothY,
        maskWidth,
        maskHeight
      );
    };

    const detectFaces = async () => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        const displaySize = { width: video.videoWidth, height: video.videoHeight };
        faceapi.matchDimensions(canvas, displaySize);

        const detectFacesInterval = setInterval(async () => {
          if (!isComponentMounted) return;

          try {
            const detections = await faceapi
              .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
              .withFaceLandmarks(); // Add landmarks detection
          
            if (isComponentMounted) {
              setFaces(detections.length);

              const resizedDetections = faceapi.resizeResults(detections, displaySize);
              const ctx = canvas.getContext("2d");
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              
              // Draw mask on each detected face
              resizedDetections.forEach(detection => {
                drawMaskOnFace(ctx, detection, displaySize);
              });
            }
          } catch (error) {
            console.error("Error in face detection:", error);
          }
        }, 100);

        return () => clearInterval(detectFacesInterval);
      }
    };

    loadModels();

    return () => {
      isComponentMounted = false;

      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }

      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }

      setFaces(0);
    };
  }, []);

  return (
    <div className="w-full h-screen p-16">
      <h1 className="text-2xl font-bold text-center">Face Mask Overlay</h1>
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
      <div className="text-center text-lg font-bold mt-4">
        <p>Number of faces detected: {faces}</p>
      </div>
    </div>
  );
};

export default DemoThree;