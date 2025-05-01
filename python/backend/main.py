# main.py

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pydantic import BaseModel
import os

from auth import (
    get_user, verify_password, create_access_token,
    get_current_user, register_new_user,
    LoginRequest, User
)
from isl_converter import convert_to_isl

# Load environment variables
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for ISL conversion
class InputText(BaseModel):
    sentence: str

@app.post("/login")
def login(login_data: LoginRequest):
    user = get_user(login_data.username)
    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    access_token = create_access_token(data={"sub": user.username})
    return {"token": access_token}

@app.get("/protected")
def protected_route(current_user: User = Depends(get_current_user)):
    return {"username": current_user.username}

@app.post("/register")
def register_user(login_data: LoginRequest):
    register_new_user(login_data.username, login_data.password)
    return {"message": "User registered successfully!"}


# For local development
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 5000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
