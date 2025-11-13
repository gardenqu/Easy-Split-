import os
import torch
import pytesseract
from PIL import Image
from transformers import LayoutLMv3Processor, LayoutLMv3ForTokenClassification

# --- Configuration (Must match training configuration) ---
MODEL_DIR = "./final_layoutlmv3_model"
LABELS = ['O', 'B-SHOP', 'I-SHOP', 'B-TOTAL', 'I-TOTAL', 'B-DATE', 'I-DATE', 'B-ITEM', 'I-ITEM']
ID2LABEL = {i: label for i, label in enumerate(LABELS)}
LABEL2ID = {label: i for i, label in enumerate(LABELS)}

# --- Global Model and Processor Variables ---
MODEL = None
PROCESSOR = None
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

def initialize_model():
    """Loads the model and processor once."""
    global MODEL, PROCESSOR, DEVICE
    
    if MODEL is not None:
        return # Model is already loaded

    try:
        print("Loading LayoutLMv3 model and processor...")
        PROCESSOR = LayoutLMv3Processor.from_pretrained(MODEL_DIR)
        MODEL = LayoutLMv3ForTokenClassification.from_pretrained(
            MODEL_DIR,
            num_labels=len(LABELS),
            id2label=ID2LABEL,
            label2id=LABEL2ID
        )
        MODEL.eval()
        MODEL.to(DEVICE)
        print(f"Model successfully loaded on {DEVICE}.")
    except Exception as e:
        print(f"ERROR: Could not load the model from {MODEL_DIR}. Details: {e}")
        MODEL = None
        PROCESSOR = None

# --- Core Prediction Logic ---

def predict_receipt_from_image_structured(image_path: str) -> dict:
    """
    Parses a receipt image using OCR + LayoutLMv3.
    Raises an exception if the model is not initialized.
    """
    
    if MODEL is None or PROCESSOR is None:
        raise Exception("Model not initialized. Call initialize_model() first and check logs.")

    image = Image.open(image_path).convert("RGB")
    ocr_data = pytesseract.image_to_data(image, output_type=pytesseract.Output.DICT)

    words, boxes = [], []
    width, height = image.size

    # 1. OCR and Normalization
    for i in range(len(ocr_data["text"])):
        if ocr_data["text"][i].strip() != "":
            words.append(ocr_data["text"][i])
            x, y, w, h = ocr_data["left"][i], ocr_data["top"][i], ocr_data["width"][i], ocr_data["height"][i]
            boxes.append([
                int(1000 * x / width), int(1000 * y / height),
                int(1000 * (x + w) / width), int(1000 * (y + h) / height)
            ])

    # 2. Encoding and Inference
    encoding = PROCESSOR(
        image, words, boxes=boxes,
        return_tensors="pt", truncation=True, padding="max_length", max_length=512
    )

    for k, v in encoding.items():
        if isinstance(v, torch.Tensor):
            encoding[k] = v.to(DEVICE)

    with torch.no_grad():
        outputs = MODEL(**encoding)
        predictions = outputs.logits.argmax(-1).squeeze().tolist()
        labels_list = [ID2LABEL[p] for p in predictions]

    # 3. Post-processing logic (simplified for brevity, ensuring it matches your original logic)
    structured_data = {"store_name": "", "items": [], "total_amount": "", "date": ""}
    current_entity = {"tag": None, "text": []}
    tag_map = {"SHOP": "store_name", "ITEM": "items", "TOTAL": "total_amount", "DATE": "date"}

    for word, label in zip(words, labels_list[:len(words)]):
        primary_tag = label.split("-")[-1] if "-" in label else label
        
        # Logic to handle O, B-, and I- tags and aggregate text...
        if label.startswith("B-") or (label != "O" and current_entity["tag"] != primary_tag):
            # Finalize previous entity
            if current_entity["tag"]:
                key = tag_map.get(current_entity["tag"])
                text = " ".join(current_entity["text"])
                if key == "items": structured_data[key].append(text)
                elif key is not None: structured_data[key] = text
            # Start new entity
            current_entity = {"tag": primary_tag, "text": [word]}
        elif label.startswith("I-") or (label != "O" and current_entity["tag"] == primary_tag):
             current_entity["text"].append(word)
        elif label == "O":
             # Finalize entity on 'O' transition
             if current_entity["tag"]:
                key = tag_map.get(current_entity["tag"])
                text = " ".join(current_entity["text"])
                if key == "items": structured_data[key].append(text)
                elif key is not None: structured_data[key] = text
                current_entity = {"tag": None, "text": []}


    # Finalize the last entity at end of loop
    if current_entity["tag"]:
        key = tag_map.get(current_entity["tag"])
        text = " ".join(current_entity["text"])
        if key == "items": structured_data[key].append(text)
        elif key is not None: structured_data[key] = text

    return structured_data

# The model will be initialized when the app starts
initialize_model()