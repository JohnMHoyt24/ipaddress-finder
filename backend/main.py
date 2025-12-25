from fastapi import FastAPI
import os
from dotenv import load_dotenv
import httpx

load_dotenv()

app = FastAPI

api_key = os.getenv("IPIFY_API_KEY")
api_url = os.getenv("IPIFY_URL")
