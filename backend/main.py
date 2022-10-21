from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from ProcessExcel import ProcessExcel
app = FastAPI()

origins = [
    "http://localhost:4200"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/exceldata")
def excelData():
    data=ProcessExcel('data.xlsx').process_single_row_data()
    return data