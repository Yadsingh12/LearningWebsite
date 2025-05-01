from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import JWTError, jwt
from typing import Optional
from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Environment variables
MONGODB_URI = os.getenv("MONGODB_URI")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")

# MongoDB setup
client = MongoClient(MONGODB_URI)
db = client["auth_db"]
users_collection = db["users"]

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# Pydantic models
class User(BaseModel):
    username: str


class UserInDB(User):
    hashed_password: str
    completed_modules: list # List of completed module names
    high_score: int = 0 # Default high score in quiz


class LoginRequest(BaseModel):
    username: str
    password: str


class HighScoreRequest(BaseModel):
    highScore: int


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(username: str) -> Optional[UserInDB]:
    user_data = users_collection.find_one({"username": username})
    if user_data:
        user_data.setdefault("completed_modules", [])
        user_data.setdefault("high_score", 0)

        # Patch DB if missing keys
        users_collection.update_one(
            {"username": username},
            {"$set": {
                "completed_modules": user_data["completed_modules"],
                "high_score": user_data["high_score"]
            }},
        )

        # Return UserInDB object with completed_modules
        return UserInDB(
            username=user_data["username"],
            hashed_password=user_data["password"],
            completed_modules=user_data["completed_modules"],
            high_score=user_data["high_score"],
        )
    return None


def create_access_token(data: dict):
    return jwt.encode(data.copy(), SECRET_KEY, algorithm=ALGORITHM)


def register_new_user(username: str, password: str):
    if users_collection.find_one({"username": username}):
        raise HTTPException(status_code=400, detail="Username already exists")
    users_collection.insert_one({
        "username": username,
        "password": get_password_hash(password),
        "completed_modules": [],
        "high_score": 0,
    })


# Update user progress (mark a module as completed)
def update_user_progress(username: str, module_name: str):
    user = get_user(username)
    if user:
        if module_name not in user.completed_modules:
            user.completed_modules.append(module_name)
            users_collection.update_one(
                {"username": username},
                {"$set": {"completed_modules": user.completed_modules}},
            )
            return {
                "message": f"Grammar module '{module_name}' marked as completed for {username}"
            }
        else:
            return {
                "message": "Module already completed"
            }
    else:
        raise HTTPException(status_code=404, detail="User not found")


def update_user_high_score(username: str, new_score: int):
    user_data = users_collection.find_one({"username": username})
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")

    current_high = user_data.get("high_score", 0)
    if new_score > current_high:
        users_collection.update_one(
            {"username": username},
            {"$set": {"high_score": new_score}},
        )
        return {"message": "High score updated"}
    else:
        return {"message": "Score not higher than existing high score"}


def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise credentials_exception
        return User(username=username)
    except JWTError:
        raise credentials_exception
