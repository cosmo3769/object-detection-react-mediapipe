import './App.css';
import Webcam from 'react-webcam';
import { ObjectDetector, FilesetResolver } from '@mediapipe/tasks-vision';
import * as cam from "@mediapipe/camera_utils";
import { useEffect, useRef } from 'react';

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  var camera = null;
  let objectDetector;
  let runningMode = "VIDEO";
  var predictions;

  // function onResults(results) {
  //   console.log(results)
  // }

  useEffect(() => {
    async function runDemo() {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );
      objectDetector = await ObjectDetector.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-tasks/object_detector/efficientdet_lite0_uint8.tflite`
        },
        scoreThreshold: 0.5,
        runningMode: runningMode
      })
    }

    runDemo();


    console.log(objectDetector)

    // onResults(predictions)


    // if (
    //   typeof webcamRef.current !== "undefined" &&
    //   webcamRef.current !== null
    // ) {
    //   camera = new cam.Camera(webcamRef.current.video, {
    //     onFrame: async () => {
    //       let nowInMs = Date.now();
    //       await objectDetector.detectForVideo(webcamRef.current.video, nowInMs);
    //     },
    //     width: 640,
    //     height: 480,
    //   });
    //   camera.start();
    // }

  }, []);

  return (
    <div className="App">
      <h1>Hello Object Detection</h1>
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: 640,
          height: 480,
        }}
      />
      <canvas
        ref={canvasRef}
        className="output_canvas"
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: 640,
          height: 480,
        }}
      ></canvas>
    </div>
  );
}

export default App;
