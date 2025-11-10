from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.auth import router as auth_router
from app.routers.material_master import router as material_master_router

app = FastAPI(title="FastAPI Auth with MySQL")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Register routers
app.include_router(auth_router)
app.include_router(material_master_router)


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "Welcome to FastAPI Authentication Example!"}
