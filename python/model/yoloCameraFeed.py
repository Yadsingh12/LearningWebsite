from ultralytics import YOLO
import cv2

# Open webcam
cap = cv2.VideoCapture(0)
model = YOLO("yolov8n.pt")  # Load YOLO model

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Run YOLOv8 object detection
    results = model(frame)

    for result in results:
        for box in result.boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])  # Bounding box
            confidence = box.conf[0].item()  # Confidence score
            class_id = int(box.cls[0].item())  # Class ID
            class_name = model.names[class_id]  # Get object name

            # Draw bounding box
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)

            # Display label with name and confidence
            label = f"{class_name}: {confidence:.2f}"
            label_size, _ = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 2)
            label_x, label_y = x1, y1 - 10  # Position above the box

            # Ensure label is visible (move inside box if too high)
            if label_y < 10:
                label_y = y1 + 20

            # Draw background rectangle for label
            cv2.rectangle(frame, (label_x, label_y - label_size[1] - 5), 
                          (label_x + label_size[0] + 5, label_y + 5), 
                          (0, 255, 0), cv2.FILLED)

            # Put text on frame
            cv2.putText(frame, label, (label_x, label_y), 
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 2)

    cv2.imshow("YOLOv8 Live Detection", frame)

    # Exit on pressing 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
