from ultralytics import YOLO
import cv2

# Load YOLOv8 model
model = YOLO("yolov8n.pt")

# Run detection on an image
image_path = "../frontend/assets/images/apple.png"
results = model(image_path)  

# Load image
image = cv2.imread(image_path)

for result in results:
    for box in result.boxes:
        x1, y1, x2, y2 = map(int, box.xyxy[0])  # Bounding box
        confidence = box.conf[0].item()  # Confidence score
        class_id = int(box.cls[0].item())  # Convert class ID to integer
        class_name = model.names[class_id]  # Get object name

        print(f"Class: {class_name}, Confidence: {confidence:.2f}")
        print(f"Bounding Box: ({x1}, {y1}), ({x2}, {y2})")

        # Draw bounding box and label
        cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 2)
        cv2.putText(image, f"{class_name}: {confidence:.2f}", (x1, y1 - 10), 
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

# Show image with detections
cv2.imshow("Detections", image)
cv2.waitKey(0)
cv2.destroyAllWindows()
