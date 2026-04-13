from fastapi import FastAPI, UploadFile, Form, File, BackgroundTasks
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil
import platform
import uuid

# Import the function from our script
from separate_tracks import separate_audio

app = FastAPI(title="Sound Splitter API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create directories if they don't exist
os.makedirs("separated", exist_ok=True)
os.makedirs("inputs", exist_ok=True)

# Mount folders as static
app.mount("/separated", StaticFiles(directory="separated"), name="separated")
app.mount("/frontend", StaticFiles(directory="frontend"), name="frontend")

def detect_device():
    # Helper: Automatically detect Mac GPU, Nvidia, or use CPU
    if platform.system() == "Darwin" and platform.machine() == "arm64":
        return "mps"
    # Add elif for CUDA in the future!
    return "cpu"

@app.get("/", response_class=HTMLResponse)
async def read_index():
    with open("frontend/index.html", "r") as f:
        return f.read()

@app.post("/api/separate")
async def api_separate(file: UploadFile = File(...), stems: int = Form(2)):
    os.makedirs("inputs", exist_ok=True)
    
    # To avoid overwrites if two "song.mp3" are uploaded, we append a UID
    safe_filename = f"{uuid.uuid4().hex[:6]}_{file.filename.replace(' ', '_')}"
    file_path = os.path.join("inputs", safe_filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    device = detect_device()
    
    # Start the separator
    try:
        result_paths = separate_audio(input_file=file_path, device=device, separate_stems=stems)
        return {
            "status": "success",
            "message": "Tracks extracted successfully!",
            "stems": stems,
            "results": result_paths
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
