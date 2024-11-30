import React, { useEffect, useRef, useState} from "react";
import * as faceapi from "face-api.js";

const FaceDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [ faces, setFaces ] = useState(0);
  const [ genderAndAge, setGenderAndAge ] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    let isComponentMounted = true;

    const loadModels = async () => {
      const MODEL_URL = "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights";
      
      try {
        
        /**
         *  Load the models from the CDN
         */
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
        ]);
        
        if (isComponentMounted) {
          console.log("All models loaded from CDN.");
          startVideo();
        }
      } catch (error) {
        console.error("Error loading models:", error);
      }
    };

    /**
     * Start the video stream
     */
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

    const detectFaces = async () => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        const displaySize = { width: video.videoWidth, height: video.videoHeight };
        faceapi.matchDimensions(canvas, displaySize);

        intervalRef.current = setInterval(async () => {
          if (!isComponentMounted) return;

          /**
           * Detect the faces
           */
          try {
            const detections = await faceapi.detectAllFaces(
              video,
              new faceapi.TinyFaceDetectorOptions()
            )
            // .withAgeAndGender();
          
            if (isComponentMounted) {
              setFaces(detections.length);
              
              if (detections.length > 0) {
                const age = Math.round(detections[0].age);
                const gender = detections[0].gender;
                if(age && gender) {
                  setGenderAndAge(`${gender}, ${age} years`);
                }
              } else {
                setGenderAndAge(null);
              }

              const resizedDetections = faceapi.resizeResults(detections, displaySize);

              const ctx = canvas.getContext("2d");
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              
              // Draw detections
              faceapi.draw.drawDetections(canvas, resizedDetections);
              
              // Draw age and gender
              resizedDetections.forEach(detection => {
                const { age, gender, genderProbability } = detection;
                new faceapi.draw.DrawTextField(
                  [
                    `${Math.round(age)} years`,
                    `${gender} (${Math.round(genderProbability * 100)}%)`
                  ],
                  detection.detection?.box?.bottomLeft
                ).draw(canvas);
              });
            }
          } catch (error) {
            console.error("Error in face detection:", error);
          }
        }, 100);
      }
    };

    loadModels();

    return () => {
      isComponentMounted = false;

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

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
      setGenderAndAge(null);

      console.log("Component cleanup completed");
    };
  }, []);

  return (
    <div className="w-full h-screen p-16">
      <h1 className="text-2xl font-bold text-center">Face Detection</h1>
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
        <p>Number of faces: {faces}</p>
        {/* {genderAndAge && <p>Details: {genderAndAge}</p>} */}
      </div>
    </div>
  );
};

export default FaceDetection;