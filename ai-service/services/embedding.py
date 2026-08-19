from langchain_huggingface import HuggingFaceEmbeddings

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

def get_embedding(text):
    return embeddings.embed_query(text)

def get_embedding_model(): 
    return embeddings 
