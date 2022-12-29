from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from ProcessExcel import ProcessExcel
from models.Graph import Graph
from models.Dashboard import Dashboard

from dashboards_list import DASHBOARDS

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
    data=ProcessExcel('data.xlsx').process_simple_data()
    return data

@app.get("/api/dashboards")
def getDashboards():
    return DASHBOARDS

@app.get("/api/dashboards/{id}")
def get_dashboard_by_id(id):
    return DASHBOARDS[int(id)-1]