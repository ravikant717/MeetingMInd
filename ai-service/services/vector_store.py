from langchain_qdrant import QdrantVectorStore
from services.embedding import get_embedding_model
from qdrant_config import qdrant

embedding = get_embedding_model()

vectorstore = QdrantVectorStore(
    client=qdrant, 
    collection_name="meetings", 
    embedding=embedding
)
def store_chunks(audio_id, chunks):

    for i, chunk in enumerate(chunks):
       chunk.metadata["audio_id"] = str(audio_id)
       chunk.metadata["chunk_index"] = i
    
    vectorstore.add_documents(chunks)
        

