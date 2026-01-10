"""
This file makes a GET request to the Ipify API where the API key and the API URL are stored
as environmental variables.
"""

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
import httpx

load_dotenv()

app = FastAPI()

api_key = os.getenv("IPIFY_API_KEY")
api_url = os.getenv("IPIFY_URL")

origins = [
    "http://localhost:5173/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/geolocation')
async def get_ip_location(ip: str = Query(..., description="IP address to lookup")):
    params = {
        "ipAddress": ip
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(api_url, params=params)
            response.raise_for_status()
            return response.json()

    except httpx.HTTPStatusError as http_err:
        raise HTTPException(status_code=http_err.response.status_code, detail=f"API Error: {http_err}")
    except httpx.RequestError as req_err:
        raise HTTPException(status_code=500, detail=f"Request Error: {req_err}")
