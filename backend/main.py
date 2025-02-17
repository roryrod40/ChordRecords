from fastapi import FastAPI
from routes import router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="Chord Records API")

# Include API routes
app.include_router(router, prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

@app.get("/")
def root():
    return {"message": "Welcome to Chord Records API!"}
