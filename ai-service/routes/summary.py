from fastapi import APIRouter
from models import SummaryRequest
from services.gemini_service import gemini_model
router = APIRouter()

@router.post("/summary")
async def summarise(data: SummaryRequest):
    try:
        transcript = data.transcript
        prompt = f"""
        You are an AI meeting summarizer.

        Analyze the following transcript and generate a concise, app-friendly summary.

        Transcript:
        {transcript}

        Instructions:
        - Do not summarize the instructions.
        - Summarize only the transcript.
        - Do not use Markdown headings, bold text, or bullet syntax like ###, **, or *.
        - Return the output in exactly this format:

        Content Type: <meeting/lecture/podcast/interview/song/etc>

        Summary:
        <3-5 sentence paragraph>

        Key Points:
        - point 1
        - point 2
        - point 3
        - point 4
        - point 5

        Tone:
        <2-4 words>
        """

        response = gemini_model.invoke(prompt)

        return {
            "success": True,
            "summary": response.text
        }
    except Exception as e: 
        return {
            "success": False, 
            "error": str(e)
        }
    
