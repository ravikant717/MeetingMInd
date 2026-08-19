import os 
import traceback 

from fastapi import APIRouter, UploadFile, File 
from services.whisper_service import model

router = APIRouter()

@router.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    
    temp_file = f"temp_{file.filename}"

    try:
        # Save uploaded file
        with open(temp_file, "wb") as f:
            f.write(await file.read())

        print("Transcript Started\n")

        result = model.transcribe(temp_file)

        print("Transcription Success\n")

        return {
            "success": True,
            "transcript": result["text"]
        }

    except Exception as e:
        print("\n========== ERROR ==========")
        print("Exception Type:", type(e).__name__)
        print("Exception:", str(e))
        traceback.print_exc()
        print("===========================\n")

        return {
            "success": False,
            "error": str(e)
        }

    finally:
        if os.path.exists(temp_file):
            os.remove(temp_file)
            

