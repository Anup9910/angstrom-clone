from fastapi import FastAPI

from app.routers.auth import router as auth_router

app = FastAPI(title="FastAPI Auth with MySQL")

app.include_router(auth_router)


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "Welcome to FastAPI Authentication Example!"}
