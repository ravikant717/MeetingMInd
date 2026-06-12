from qdrant_config import qdrant
from embedding import get_embedding
from qdrant_client.models import PointStruct
import uuid

def store_chunks(audio_id, chunks):
    points = []
    
    for chunk in chunks: 
        points.append(PointStruct(
            id = str(uuid.uuid4()), 
            vector=get_embedding(chunk),
            payload={
                "audioId": audio_id, 
                "text": chunk
            }
        ))
    qdrant.upsert(
        collection_name="meetings", 
        points = points,
    )