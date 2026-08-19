from fastapi import FastAPI

from routes.transcribe import router as transcribe_router
from routes.summary import router as summary_router
from routes.action import router as action_router
from routes.vector import router as vector_router
from routes.search import router as search_router

app = FastAPI()

app.include_router(transcribe_router)
app.include_router(summary_router)
app.include_router(action_router)
app.include_router(vector_router)
app.include_router(search_router)




































# DEV DUMP
# @app.get("/test-qdrant")
# async def test_qdrant():
#     collections = qdrant.get_collections()
#     return collections.model_dump()

# @app.get("/create-collection")
# async def create_collection():
#     qdrant.recreate_collection(
#         collection_name="meetings",
#         vectors_config=VectorParams(
#             size=384,
#             distance=Distance.COSINE,
#         ),
#     )

#     return {"success": True}

