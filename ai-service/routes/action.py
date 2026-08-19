from fastapi import APIRouter
from models import SummaryRequest
from services.gemini_service import gemini_model

import json

router = APIRouter()

@router.post("/action")
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
        response = gemini_model.invoke(prompt)

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
