from fastapi import APIRouter
from models import VectorRequest
from services.chunker import chunk_text
from services.vector_store import store_chunks

router = APIRouter()


@router.post("/store-vectors")
async def store_vectors(data: VectorRequest):
    try: 
        chunks = chunk_text(data.transcript)
        
        store_chunks(
            data.audioId, 
            chunks
        )
        return {
            "success": True 
        }
    except Exception as e: 
        return {
            "success": False, 
            "error": str(e)
        }