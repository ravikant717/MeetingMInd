from qdrant_client import QdrantClient
import os 
from dotenv import load_dotenv
load_dotenv()

qdrant = QdrantClient(
    url=os.getenv("QDRANT_CLUSTER_URL"),
    api_key=os.getenv("QDRANT_API_KEY")
)