import * as tf from "@tensorflow/tfjs";
import { renderBoxes } from "./renderBox";

let labels = null;
let labelsLoaded = false;
let enabledClassIndices = new Set(); // ✅ Will hold indices of enabled classes

fetch("/labels.json")
  .then((response) => response.json())
  .then((data) => {
    labels = data;
    labelsLoaded = true;

    // ✅ Store indices of enabled classes
    enabledClassIndices = new Set(
      data
        .map((label, index) => (label.enabled ? index : -1))
        .filter(index => index !== -1)
    );
  })
  .catch((error) => console.error("Error loading labels:", error));

/**
 * Preprocess image / frame before forwarded into the model
 * @param {HTMLVideoElement|HTMLImageElement} source
 * @param {Number} modelWidth
 * @param {Number} modelHeight
 * @returns input tensor, xRatio and yRatio
 */
const preprocess = (source, modelWidth, modelHeight) => {
  let xRatio, yRatio;

  const input = tf.tidy(() => {
    const img = tf.browser.fromPixels(source);
    const [h, w] = img.shape.slice(0, 2);
    const maxSize = Math.max(w, h);
    const imgPadded = img.pad([
      [0, maxSize - h],
      [0, maxSize - w],
      [0, 0],
    ]);

    xRatio = maxSize / w;
    yRatio = maxSize / h;

    return tf.image
      .resizeBilinear(imgPadded, [modelWidth, modelHeight])
      .div(255.0)
      .expandDims(0);
  });

  return [input, xRatio, yRatio];
};

/**
 * Function run inference and do detection from source.
 * @param {HTMLImageElement|HTMLVideoElement} source
 * @param {tf.GraphModel} model loaded YOLOv8 tensorflow.js model
 * @param {HTMLCanvasElement} canvasRef canvas reference
 * @param {VoidFunction} callback function to run after detection process
 */
export const detect = async (source, model, canvasRef, setBoundingBoxes, setShowPopup, callback = () => { }) => {
  if (!labelsLoaded) {
    console.error("Labels not loaded yet! Skipping detection.");
    return;
  }

  const numClass = Object.keys(labels).length;
  if (numClass === 0) {
    console.error("No classes found! Skipping detection.");
    return;
  }

  const [modelWidth, modelHeight] = model.inputShape.slice(1, 3);

  tf.engine().startScope();
  const [input, xRatio, yRatio] = preprocess(source, modelWidth, modelHeight);

  const res = model.net.execute(input);
  const transRes = res.transpose([0, 2, 1]);
  const boxes = tf.tidy(() => {
    const w = transRes.slice([0, 0, 2], [-1, -1, 1]);
    const h = transRes.slice([0, 0, 3], [-1, -1, 1]);
    const x1 = tf.sub(transRes.slice([0, 0, 0], [-1, -1, 1]), tf.div(w, 2));
    const y1 = tf.sub(transRes.slice([0, 0, 1], [-1, -1, 1]), tf.div(h, 2));
    return tf
      .concat(
        [y1, x1, tf.add(y1, h), tf.add(x1, w)],
        2
      )
      .squeeze();
  });

  const [scores, classes] = tf.tidy(() => {
    const rawScores = transRes.slice([0, 0, 4], [-1, -1, numClass]).squeeze(0);
    return [rawScores.max(1), rawScores.argMax(1)];
  });

  const nms = await tf.image.nonMaxSuppressionAsync(boxes, scores, 500, 0.45, 0.2);

  const boxesNMS = boxes.gather(nms, 0);
  const scoresNMS = scores.gather(nms, 0);
  const classesNMS = classes.gather(nms, 0);

  let boxes_data_all = boxesNMS.dataSync();
  let scores_data_all = scoresNMS.dataSync();
  let classes_data_all = classesNMS.dataSync();

  // ✅ Filter by threshold and only enabled classes
  const threshold = 0.5;
  const filteredIndices = Array.from(scores_data_all)
    .map((score, index) => {
      const classIndex = classes_data_all[index];
      return (score >= threshold && enabledClassIndices.has(classIndex)) ? index : -1;
    })
    .filter(index => index !== -1);

  const boxes_data = filteredIndices
    .map(index => Array.from(boxes_data_all.slice(index * 4, index * 4 + 4)))
    .flat();
  const scores_data = filteredIndices.map(index => scores_data_all[index]);
  const classes_data = filteredIndices.map(index => classes_data_all[index]);

  renderBoxes(canvasRef, boxes_data, scores_data, classes_data, [xRatio, yRatio], setBoundingBoxes, setShowPopup);

  tf.dispose([res, transRes, boxes, scores, classes, nms, boxesNMS, scoresNMS, classesNMS]);
  callback();
  tf.engine().endScope();
};

/**
 * @param {HTMLVideoElement} vidSource video source
 * @param {tf.GraphModel} model loaded YOLOv8 tensorflow.js model
 * @param {HTMLCanvasElement} canvasRef canvas reference
 */
export const detectVideo = (vidSource, model, canvasRef, setBoundingBoxes, setShowPopup) => {
  /**
   * Function to detect every frame from video
   */
  const detectFrame = async () => {
    if (vidSource.videoWidth === 0 && vidSource.srcObject === null) {
      const ctx = canvasRef.getContext("2d");
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      return;
    }

    detect(vidSource, model, canvasRef, setBoundingBoxes, setShowPopup, () => {
      requestAnimationFrame(detectFrame);
    });
  };

  detectFrame();
};
