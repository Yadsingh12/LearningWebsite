from ultralytics import YOLO
import cv2
import numpy as np

# Load YOLOv8 segmentation model
model = YOLO("yolov8n-seg.pt")

# Open webcam
cap = cv2.VideoCapture(0)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Run inference
    results = model(frame)

    for result in results:
        if result.masks is not None:  # Check if masks exist
            masks = result.masks.xy  # Get segmentation masks as polygons
            
            for mask, box in zip(masks, result.boxes):
                x1, y1, x2, y2 = map(int, box.xyxy[0])  # Bounding box
                class_id = int(box.cls[0].item())  # Object class ID
                confidence = box.conf[0].item()  # Confidence score
                label = model.names[class_id]  # Get class name

                # Convert polygon mask to numpy array
                mask = np.array(mask, dtype=np.int32)

                # Draw only the outer boundary (contour)
                cv2.polylines(frame, [mask], isClosed=True, color=(0, 255, 0), thickness=2)  # Green contour

                # Display class name & confidence above bounding box
                text = f"{label}: {confidence:.2f}"
                cv2.putText(frame, text, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    # Show output
    cv2.imshow("YOLOv8 Segmentation - Outer Boundary", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
