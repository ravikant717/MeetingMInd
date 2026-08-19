import os
from dotenv import load_dotenv

from langchain_google_genai import ChatGoogleGenerativeAI
load_dotenv()


gemini_model = ChatGoogleGenerativeAI(model="gemini-2.5-flash", 
                                      google_api_key=os.getenv("GEMINI_API_KEY"))