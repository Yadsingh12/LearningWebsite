let labelsData = {};

// Function to load labels.json dynamically
const loadLabels = async () => {
  try {
    const response = await fetch("/labels.json"); // Fetch from public folder
    labelsData = await response.json();
  } catch (error) {
    console.error("Error loading labels.json:", error);
  }
};

// Call this function when the application starts
loadLabels();

/**
 * Render prediction boxes
 * @param {HTMLCanvasElement} canvasRef canvas tag reference
 * @param {Array} boxes_data boxes array
 * @param {Array} scores_data scores array
 * @param {Array} classes_data class array
 * @param {Array[Number]} ratios boxes ratio [xRatio, yRatio]
 */
export const renderBoxes = (canvasRef, boxes_data, scores_data, classes_data, ratios, setBoundingBoxes, setShowPopup) => {
  const ctx = canvasRef.getContext("2d");
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clean canvas

  const colors = new Colors();
  const font = `${Math.max(Math.round(Math.max(ctx.canvas.width, ctx.canvas.height) / 40), 14)}px Arial`;
  ctx.font = font;
  ctx.textBaseline = "top";

  let boundingBoxes = []; // Store bounding boxes for click detection

  for (let i = 0; i < scores_data.length; ++i) {
    const labelInfo = labelsData[classes_data[i]];
    if (!labelInfo) continue; // Skip if no label is found

    const { name, description, sample_video } = labelInfo;
    const color = colors.get(classes_data[i]);
    const score = (scores_data[i] * 100).toFixed(1);

    let [y1, x1, y2, x2] = boxes_data.slice(i * 4, (i + 1) * 4);
    
    // Scale box coordinates properly
    x1 *= ratios[0];
    x2 *= ratios[0];
    y1 *= ratios[1];
    y2 *= ratios[1];
    const width = x2 - x1;
    const height = y2 - y1;

    // Store bounding box data
    boundingBoxes.push({ x1, y1, width, height, name, description, sample_video });

    // Draw box.
    ctx.fillStyle = Colors.hexToRgba(color, 0.2);
    ctx.fillRect(x1, y1, width, height);

    // Draw border box.
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(Math.min(ctx.canvas.width, ctx.canvas.height) / 200, 2.5);
    ctx.strokeRect(x1, y1, width, height);

    // Draw label background.
    ctx.fillStyle = color;
    const text = `${name} - ${score}%`;
    const textWidth = ctx.measureText(text).width;
    const textHeight = parseInt(font, 10);
    const yText = y1 - (textHeight + ctx.lineWidth);
    ctx.fillRect(x1 - 1, yText < 0 ? 0 : yText, textWidth + ctx.lineWidth, textHeight + ctx.lineWidth);

    // Draw labels
    ctx.fillStyle = "#ffffff";
    ctx.fillText(text, x1 - 1, yText < 0 ? 0 : yText);
  }

  // Click event listener to detect if the user clicks inside a bounding box
  canvasRef.onclick = (event) => {
    const rect = canvasRef.getBoundingClientRect();
  
    // Adjust click coordinates using ratios
    const clickX = (event.clientX - rect.left) * ratios[0];
    const clickY = (event.clientY - rect.top) * ratios[1];
  
    let clickedBoxes = [];
  
    boundingBoxes.forEach((box) => {
      if (
        clickX >= box.x1 &&
        clickX <= box.x1 + box.width &&
        clickY >= box.y1 &&
        clickY <= box.y1 + box.height
      ) {
        clickedBoxes.push({ name: box.name, description: box.description, sample_video: box.sample_video });
      }
    });
  
    if (clickedBoxes.length > 0) {
      console.log("Clicked on:", clickedBoxes);
      setBoundingBoxes(clickedBoxes);
      setShowPopup(true); // Show popup when a box is clicked
    }
  };
};

class Colors {
  constructor() {
    this.palette = [
      "#FF3838", "#FF9D97", "#FF701F", "#FFB21D", "#CFD231",
      "#48F90A", "#92CC17", "#3DDB86", "#1A9334", "#00D4BB",
      "#2C99A8", "#00C2FF", "#344593", "#6473FF", "#0018EC",
      "#8438FF", "#520085", "#CB38FF", "#FF95C8", "#FF37C7",
    ];
    this.n = this.palette.length;
  }

  get = (i) => this.palette[i % this.n];

  static hexToRgba = (hex, alpha) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`
      : null;
  };
}
