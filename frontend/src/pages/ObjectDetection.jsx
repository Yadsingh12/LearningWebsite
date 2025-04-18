import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; // set backend to webgl
import Loader from "../components/loader";
import ButtonHandler from "../components/btn-handler";
import { detect, detectVideo } from "../utils/detect";
import BoundingBoxPopup from "../components/BoundingBoxPopup"; // Import Popup Component
import "../style/ObjectDetection.css";

const ObjectDetection = () => {
  const [loading, setLoading] = useState({ loading: true, progress: 0 });
  const [model, setModel] = useState({ net: null, inputShape: [1, 0, 0, 3] });
  const [boundingBoxes, setBoundingBoxes] = useState([]); // Store detected boxes
  const [showPopup, setShowPopup] = useState(false);

  const imageRef = useRef(null);
  const cameraRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // model configs
  const modelName = "yolov8n";

  useEffect(() => {
    tf.ready().then(async () => {
      const yolov8 = await tf.loadGraphModel(
        `${window.location.origin}/${modelName}_web_model/model.json`,
        {
          onProgress: (fractions) => setLoading({ loading: true, progress: fractions }),
        }
      ); // load model

      // warming up model
      const dummyInput = tf.ones(yolov8.inputs[0].shape);
      const warmupResults = yolov8.execute(dummyInput);

      setLoading({ loading: false, progress: 1 });
      setModel({ net: yolov8, inputShape: yolov8.inputs[0].shape });

      tf.dispose([warmupResults, dummyInput]); // cleanup memory
    });
  }, []);

  useEffect(() => {
    return () => {
      [cameraRef, videoRef].forEach((ref) => {
        if (ref.current && ref.current.srcObject) {
          ref.current.srcObject.getTracks().forEach((track) => track.stop());
          ref.current.srcObject = null;
        }
      });
    };
  }, []);


  return (
    <div className="App">
      {loading.loading && (
        <Loader>
          Loading model... {(loading.progress * 100).toFixed(2)}%
        </Loader>
      )}

      <div className="header">
        <h1>📷 YOLOv8 Live Detection App</h1>
        <p>YOLOv8 live detection powered by TensorFlow.js</p>
        <p>
          Serving: <code className="code">{modelName}</code>
        </p>
      </div>

      {/* 👉 About Section */}
      <section className="about">
        <h2>What is this page?</h2>
        <p>
          This tool uses a lightweight object detection model (YOLOv8) to
          recognize and track signs from your webcam, images, or uploaded videos
          in real-time. It's perfect for sign language detection and gesture-based
          learning systems.
        </p>

        <h3>How to use:</h3>
        <ul>
          <li>📸 Choose between image, camera, or video input.</li>
          <li>✅ Grant camera permission when prompted.</li>
          <li>🔍 The model will detect and highlight objects or signs it recognizes.</li>
          <li>🧠 Click on a bounding box to view more information.</li>
        </ul>
      </section>

      <div className="content">
        <img
          src="#"
          ref={imageRef}
          onLoad={() =>
            detect(
              imageRef.current,
              model,
              canvasRef.current,
              setBoundingBoxes,
              setShowPopup
            )
          }
        />
        <video
          autoPlay
          muted
          ref={cameraRef}
          onPlay={() =>
            detectVideo(
              cameraRef.current,
              model,
              canvasRef.current,
              setBoundingBoxes,
              setShowPopup
            )
          }
        />
        <video
          autoPlay
          muted
          ref={videoRef}
          onPlay={() =>
            detectVideo(
              videoRef.current,
              model,
              canvasRef.current,
              setBoundingBoxes,
              setShowPopup
            )
          }
        />
        <canvas
          width={model.inputShape[1]}
          height={model.inputShape[2]}
          ref={canvasRef}
        />
      </div>

      {showPopup && (
        <BoundingBoxPopup
          boundingBoxes={boundingBoxes}
          onClose={() => setShowPopup(false)}
        />
      )}

      <ButtonHandler
        imageRef={imageRef}
        cameraRef={cameraRef}
        videoRef={videoRef}
      />
    </div>
  );


};

export default ObjectDetection;
