# main.py

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pydantic import BaseModel
import os

from auth import (
    get_user,
    verify_password,
    create_access_token,
    get_current_user,
    register_new_user,
    update_user_progress,
    update_user_high_score,
    LoginRequest,
    HighScoreRequest,
    User,
)
from isl_converter import convert_to_isl

# Load environment variables
load_dotenv()

app = FastAPI()

# CORS settings
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


class CompleteModuleRequest(BaseModel):
    module_name: str


@app.post("/login")
def login(login_data: LoginRequest):
    user = get_user(login_data.username)
    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    token = create_access_token(data={"sub": user.username})
    return {"token": token}


@app.post("/register")
def register_user(login_data: LoginRequest):
    register_new_user(login_data.username, login_data.password)
    return {"message": "User registered successfully!"}


@app.get("/protected")
def protected_route(current_user: User = Depends(get_current_user)):
    return {"username": current_user.username}


@app.post("/complete_grammar_module")
def complete_grammar_module(
    data: CompleteModuleRequest, current_user: User = Depends(get_current_user)
):
    try:
        return update_user_progress(current_user.username, data.module_name)
    except HTTPException as e:
        raise e  # Pass through expected errors


@app.get("/user")
def get_user_data(current_user: User = Depends(get_current_user)):
    user_in_db = get_user(current_user.username)
    if not user_in_db:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "username": user_in_db.username,
        "completed_modules": user_in_db.completed_modules,
        "high_score": user_in_db.high_score,
    }


@app.post("/update_highscore")
def update_high_score(
    data: HighScoreRequest, current_user: User = Depends(get_current_user)
):
    return update_user_high_score(current_user.username, data.highScore)


@app.post("/convert")
def convert(input: InputText):
    return convert_to_isl(input.sentence)


# For local development
if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", 5000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
