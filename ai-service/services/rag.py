from langchain_qdrant import QdrantVectorStore
from langchain_core.prompts import ChatPromptTemplate 
from langchain_classic.chains.retrieval import create_retrieval_chain 
from langchain_classic.chains.combine_documents import create_stuff_documents_chain 
from services.embedding import get_embedding_model
from services.gemini_service import gemini_model
from qdrant_config import qdrant
from qdrant_client.models import Filter, FieldCondition, MatchValue

embedding_model = get_embedding_model()

vector_store = QdrantVectorStore(
    client=qdrant, 
    collection_name="meetings", 
    embedding=embedding_model
)

prompt = ChatPromptTemplate.from_template("""
    You are MeetingMind
    
    Answer only from the meeting transcript. 
    
    If the answer is not available, reply: 
    "I couldn't find that information in this meeting."
    
    Context: 
    {context}
    
    Question: 
    {input}
    
    
                                          
                                          """)

document_chain = create_stuff_documents_chain(
    llm=gemini_model,
    prompt=prompt
)

def get_retriever(audio_id): 
    return vector_store.as_retriever(
        search_kwargs= {
            "k": 5, 
            "filter": Filter(
                must=[
                    FieldCondition(
                        key="metadata.audio_id", 
                        match=MatchValue(
                            value=str(audio_id)
                        )
                    )
                ]
            )
        }
    )
    
def ask_question(audio_id, question):
    retriever = get_retriever(audio_id)
    
    retrieval_chain = create_retrieval_chain(
        retriever, document_chain
    ) 
    response = retrieval_chain.invoke({ 
        "input": question
    })

    return response    