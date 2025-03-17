from ultralytics import YOLO

# Load the YOLO11 model
model = YOLO("yolov8n.pt")

# Export the model to TF.js format
model.export(format="tfjs")  # creates '/yolov8n_web_model'
