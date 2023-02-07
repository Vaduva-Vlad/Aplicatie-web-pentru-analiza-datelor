from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from data_handling.get_data import get_dashboards, get_dashboard_by_id, get_graph_by_dashboard_id
from ProcessExcel import ProcessExcel
from models.User import User
from werkzeug.security import generate_password_hash,check_password_hash

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
    data = ProcessExcel('data.xlsx').process_simple_data()
    return data


@app.get("/api/graphs/{dashboard_id}")
def get_graph_for_dashboard(dashboard_id):
    return get_graph_by_dashboard_id(dashboard_id)


@app.get("/api/dashboards/{user_id}")
def get_dashboards_list(user_id):
    return get_dashboards(user_id)


@app.get("/api/dashboard/{id}")
def get_dashboard_with_id(id):
    return get_dashboard_by_id(id)


@app.post("/signup")
def signup(user: User):
    return user
