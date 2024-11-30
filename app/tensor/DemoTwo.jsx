import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const DemoTwo = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [faceDetails, setFaceDetails] = useState([]);
  const [emoji, setEmoji] = useState("🙂"); // Default emoji
  const [showEmoji, setShowEmoji] = useState(false); // Toggle for emoji display

  useEffect(() => {
    let isComponentMounted = true;

    const loadModels = async () => {
      const MODEL_URL = "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);

      if (isComponentMounted) {
        console.log("Models loaded.");
        startVideo();
      }
    };

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current && isComponentMounted) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            detectFeatures();
          };
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    const detectFeatures = async () => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        const displaySize = { width: video.videoWidth, height: video.videoHeight };
        faceapi.matchDimensions(canvas, displaySize);

        const interval = setInterval(async () => {
          if (!isComponentMounted) return;

          const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions();

          if (isComponentMounted) {
            const details = detections.map(det => {
              const { landmarks, expressions } = det;
              const noseTip = landmarks.getNose()[0];
              return {
                expressions,
                tilt: { x: noseTip.x, y: noseTip.y },
              };
            });

            setFaceDetails(details);
            updateEmoji(details); // Update emoji based on expressions
            console.log("Detected face details:", details);

            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            drawLandmarks(canvas, resizedDetections);
          }
        }, 100);

        return () => clearInterval(interval);
      }
    };

    const updateEmoji = (details) => {
      if (details.length > 0) {
        const { expressions } = details[0];
        const maxExpression = Object.keys(expressions).reduce((a, b) =>
          expressions[a] > expressions[b] ? a : b
        );

        // Map expressions to emojis
        const expressionEmojiMap = {
          happy: "😄",
          sad: "😢",
          angry: "😠",
          surprised: "😲",
          disgusted: "🤢",
          fearful: "😨",
          neutral: "🙂",
        };

        setEmoji(expressionEmojiMap[maxExpression] || "🙂");
      } else {
        setEmoji("🙂"); // Default if no face detected
      }
    };

    const drawLandmarks = (canvas, detections) => {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      detections.forEach(detection => {
        faceapi.draw.drawFaceLandmarks(canvas, detection);
      });
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

      setFaceDetails([]);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-gray-200 p-16 relative">
      <h1 className="text-2xl font-bold text-center">Expressions & Landmarks</h1>
      <input
            type="checkbox"
            className="mr-2"
            checked={showEmoji}
            onChange={(e) => setShowEmoji(e.target.checked)}
          />
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
    
      <div className="mt-4 text-center text-lg font-bold">
        {faceDetails.map((face, index) => (
          <div key={index} className="mb-4">
            <p>Expressions:</p>
            <pre>{JSON.stringify(face.expressions, null, 2)}</pre>
            <p>Tilt:</p>
            <pre>{JSON.stringify(face.tilt, null, 2)}</pre>
          </div>
        ))}
      </div>
      {showEmoji && (
        <div
          style={{
            position: "absolute",
            top: "250px",
            right: "500px",
            fontSize: "120px",
          }}
        >
          {emoji}
        </div>
      )}
    </div>
  );
};

export default DemoTwo;