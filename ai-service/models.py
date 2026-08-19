from pydantic import BaseModel

class SummaryRequest(BaseModel): 
    transcript: str

class VectorRequest(BaseModel): 
    audioId: str
    transcript: str
    
class SearchRequest(BaseModel):
    query: str