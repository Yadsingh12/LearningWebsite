import os
import json
import shutil
from bing_image_downloader import downloader

# Paths
LABELS_JSON = r'C:\Users\yadau\Desktop\coding\sign\LearningWebsite\frontend\yolov8-tfjs\public\labels.json'
OUTPUT_DIR = r'C:\Users\yadau\Desktop\coding\sign\LearningWebsite\python\images\downloaded'
FINAL_IMAGES_DIR = r'C:\Users\yadau\Desktop\coding\sign\LearningWebsite\frontend\yolov8-tfjs\public\images'

# Ensure output folders exist
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(FINAL_IMAGES_DIR, exist_ok=True)

# Load labels from labels.json
with open(LABELS_JSON, 'r', encoding='utf-8') as f:
    labels_data = json.load(f)

# Process each label
for item in labels_data:
    label = item['name']
    print(f"Downloading image for: {label}")
    
    query = f"{label} object"
    safe_label = label.replace(" ", "_")
    
    # Download image to temp folder
    downloader.download(query, limit=1, output_dir=OUTPUT_DIR, adult_filter_off=True, force_replace=False, timeout=60)
    
    # Find the downloaded image
    image_folder = os.path.join(OUTPUT_DIR, query)
    if os.path.exists(image_folder):
        image_files = os.listdir(image_folder)
        if image_files:
            image_path = os.path.join(image_folder, image_files[0])
            dest_path = os.path.join(FINAL_IMAGES_DIR, f"{safe_label}.jpg")
            shutil.move(image_path, dest_path)
            print(f"✅ Saved: {dest_path}")
        else:
            print(f"⚠️ No image found for {label}")
    else:
        print(f"⚠️ Folder not found for {label}")

print("🎉 Done downloading all images!")
