# 🧠 ISL Learning Platform – Indian Sign Language Web App

A full-stack interactive web application to help users learn Indian Sign Language (ISL) through real-time object detection, grammar exercises, and video-based quizzes. Built with modern web technologies, this platform combines computer vision, linguistics, and accessibility features into an educational tool.

---

## 🚀 Features

### 📸 1. Object Detection Module
- Detect real-world objects in real-time using **YOLOv8 in the browser**.
- Users can **click on detected items** to view:
  - The ISL **sign image**.
  - A brief **textual description**.
- Promotes **visual association** between physical objects and ISL vocabulary.

### 🧠 2. ISL Quiz Module
- Watch **video clips of ISL signs** and select the correct meaning from 4 image options.
- Quiz questions and options are **randomly shuffled**.
- Reinforces vocabulary learning through **video interaction**.

### 📘 3. Grammar Learning Module
- Learn ISL grammar by comparing it with basic English sentence structures.
- Includes **manually curated rules** and **practice exercises** (5 per rule).
- Focused on **sentence reordering** tasks for subject-object-verb and interrogatives.

### 🔁 4. English-to-ISL Grammar Translation (Upcoming)
- Rule-based grammar translation system under development.
- Goal: Translate natural English sentences into grammatically correct ISL order.
- Will support **root word extraction** and stopword removal during preprocessing.

### 🔐 5. User Authentication and Tracking
- Login/Signup via **JWT-based authentication**.
- User progress for grammar and quizzes is stored in the **FastAPI backend**.

---

## 💻 System Architecture

### 2.3.1 Real-time Processing
- YOLOv8 runs **in-browser with TensorFlow.js** for fast, client-side object detection.

### 2.3.2 Backend API (FastAPI)
- Manages:
  - **User auth**
  - **Progress tracking**
  - **Grammar translation API** (WIP)

### 2.3.3 Frontend (React)
- Pages:
  - Login/Signup
  - Home
  - Object Detection
  - Grammar
  - Quiz
- React Router DOM for navigation.
- Context API for authentication state.
- Dynamic rendering of detection results and exercises.

### 📦 Dataset & Media Sources

- **Object Images**: Downloaded via `bing_image_downloader`, labeled for YOLO.
- **Quiz Videos**: Pre-recorded ISL signs for key words.
- **Grammar Rules**: Hand-crafted with example sentences and reordered ISL variants.
- **Translation Tool Data**: In-progress collection of aligned English–ISL sentence pairs.

### 📂 Object Detection using YOLOv8 and Tensorflow.js

Object Detection application running entirely in the browser using `TensorFlow.js` with `webgl` backend.

### 🧠 Model

YOLOv8n model converted to TensorFlow.js.

```bash
Model used: yolov8n
Size:       13 MB
```

#### 📂 Note for Custom-trained Model on different classes

If using custom-trained YOLOv8 models:
- Update `src/utils/labels.json` with your new class names.

#### 🔄 Use Another YOLOv8 Model

1. Export your YOLOv8 model to TensorFlow.js:

```python
from ultralytics import YOLO

model = YOLO("yolov8n.pt")
model.export(format="tfjs")
```

2. Copy `yolov8*_web_model` folder to `./public`.

3. Update `modelName` in `App.jsx`:

```jsx
const modelName = "yolov8*";
```

4. Done! ✅

#### 🙏 Credits

- Based on [yolov8-tfjs](https://github.com/Hyuto/yolov8-tfjs) by Wahyu Setianto.
- Other references:
  - https://github.com/ultralytics/ultralytics
  - https://github.com/Hyuto/yolov8-onnxruntime-web

---

## 🛠 Setup

### frontend:

In frontend:

```bash
yarn install # Install dependencies

yarn dev     # Start development server
yarn build   # Build for production
```

### backend:

in python/backend:

```bash
# make a virtual environment
pip install -r requirements_backend.txt # Install dependencies
uvicorn main:app --host 0.0.0.0 --port 5000 --reload # Start development server
```

---

## 📈 Future Enhancements

- Full **translation from English to ISL grammar** using ML models.
- Admin dashboard for content updates.
- Mobile responsiveness and **offline grammar module**.
- **Speech-to-sign** and **sign-to-speech** support for accessibility.

---

## Media
Photos can be downloaded using **bing_image_downloader** library of python as is done in python/images/download_images.py
Videos have been collected from an Indian Sign Language expert.

## 👨‍💻 Author

**Yadwinder Singh**  
Developer | ML Enthusiast | Accessibility Advocate  
LinkedIn: https://www.linkedin.com/in/yadwinder-singh-4a7456248/