from fastapi import FastAPI, Request, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from data_handling.db_data_handling import get_dashboards, get_dashboard_by_id, get_graph_by_dashboard_id, user_exists, \
    add_user, get_user,add_new_dashboard
from fastapi.security import OAuth2PasswordBearer
from ProcessExcel import ProcessExcel
from models.User import User
from models.Dashboard import Dashboard
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime

secret = 'secret'
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


@app.post("/api/signup")
async def signup(request: Request):
    body = await request.json()
    email = body['email']
    username = body['username']
    password = body['password']

    if user_exists(email, username):
        return "User already exists"

    user = User(username, email, password=generate_password_hash(password, method='sha256'))
    added_user = add_user(user)

    return added_user


@app.post("/api/login")
async def login(request: Request):
    user_data = await request.json()
    user = get_user(user_data['username'])
    if not user:
        raise HTTPException(status_code=400, detail="Nume de utilizator sau parolă greșită")
    if check_password_hash(user['password'], user_data['password']):
        token = jwt.encode({'user_id': user['id'], 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60)},
                           secret, "HS256")
        return token
    else:
        raise HTTPException(status_code=400, detail="Nume de utilizator sau parolă greșită")


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


@app.post("/api/dashboard")
async def add_dashboard(request: Request):
    data = await request.json()
    user_id=data['user_id']
    name=data['name']
    dashboard=Dashboard(user_id,name)
    added_dashboard=add_new_dashboard(dashboard)
    return added_dashboard['id']

