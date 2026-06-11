from fastapi import FastAPI, UploadFile, File
from dotenv import load_dotenv
from pydantic import BaseModel
import whisper
import os
import shutil
import traceback
import google.generativeai as genai 
import json 

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
gemini_model = genai.GenerativeModel("gemini-2.5-flash")
app = FastAPI()

class SummaryRequest(BaseModel): 
    transcript: str



print("===================================")
print("FFMPEG:", shutil.which("ffmpeg"))
print("===================================")

model = whisper.load_model("base")

@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    
    temp_file = f"temp_{file.filename}"

    try:
        # Save uploaded file
        with open(temp_file, "wb") as f:
            f.write(await file.read())

        print("\n========== DEBUG ==========")
        print("Temp file:", temp_file)
        print("Exists:", os.path.exists(temp_file))
        print("File size:", os.path.getsize(temp_file), "bytes")
        print("Starting transcription...")
        print("===========================\n")

        result = model.transcribe(temp_file)

        print("\n========== SUCCESS ==========")
        print("Finished transcription")
        print("=============================\n")

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
            
@app.post("/summary")
async def summarise(data: SummaryRequest):
    try:
        transcript = data.transcript
        prompt = f"""
                Summarize the following meeting transcript.

                Return:
                1. Short Summary
                2. Key Points

                Transcript:
                {transcript}
                """

        response = gemini_model.generate_content(prompt)

        return {
            "success": True,
            "summary": response.text
        }
    except Exception as e: 
        return {
            "success": False, 
            "error": str(e)
        }
    

@app.post("/action")
async def getActionItems(data: SummaryRequest): 
    try: 
        transcript = data.transcript
        prompt = f"""
        You are an AI meeting assistant.

        Extract all action items from the meeting transcript.

        Return ONLY a valid JSON array.

        Schema:

        [
        {{
            "owner": "person responsible",
            "task": "work to be done",
            "deadline": "deadline if mentioned, otherwise null"
        }}
        ]

        Do not include markdown.
        Do not include explanations.
        Do not include code fences.

        Transcript:
        {transcript}
        """
        response = gemini_model.generate_content(prompt)

        text = response.text.strip()

        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

        action_items = json.loads(text)

        return {
            "success": True,
            "actionItems": action_items
        }
    except Exception as e: 
        return {
            "success": False, 
            "error": str(e)
        }
        