from fastapi import FastAPI, Request, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from data_handling.db_data_handling import get_dashboards, get_dashboard_by_id, get_graph_by_dashboard_id, user_exists, \
    add_user, get_user, add_new_dashboard, add_new_graph,remove_graph,remove_dashboard
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends
from ProcessExcel import ProcessExcel
from models.User import User
from models.Dashboard import Dashboard
from models.Graph import Graph
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from io import BytesIO
import pandas as pd
import os
import csv

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

oauth2=OAuth2PasswordBearer(tokenUrl="token")

def check_token(r:Request):
    try:
        token=r.headers['Authorization'].split(' ')[1]
        print(f"token received {token}")
        user_id=jwt.decode(token,secret,algorithms=["HS256"])['user_id']
        print(user_id)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=401, detail='Invalid token')
    return True,user_id

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
        token = jwt.encode({'user_id': user['id'], 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)},
                           secret, "HS256")
        print(f"token sent:{token}")
        return token
    else:
        raise HTTPException(status_code=400, detail="Nume de utilizator sau parolă greșită")


@app.get("/api/exceldata")
def excelData():
    data = ProcessExcel('data.xlsx').process_simple_data()
    return data


@app.get("/api/graphs/{user_id}/{dashboard_id}")
def get_graph_for_dashboard(user_id,dashboard_id,authorized=Depends(check_token)):
    if authorized[0] and str(authorized[1])==user_id:
        return get_graph_by_dashboard_id(dashboard_id,user_id)


@app.post("/api/graphs")
async def add_graph(request: Request,authorized=Depends(check_token)):
    if authorized[0]:
        data = await request.json()
        dashboard_id = data['dashboard_id']
        user_id=data['user_id']
        title = data['title']
        type = data['type']
        data_source = data['data_source']
        graph = Graph(dashboard_id,user_id, data_source)
        graph.set_option(title, type)
        return add_new_graph(graph, type)

@app.delete("/api/graphs/{graph_id}/{dashboard_id}")
def delete_graph(graph_id,dashboard_id,authorized=Depends(check_token)):
    if authorized[0]:
        remove_graph(graph_id)
        os.remove(f"localdata/{dashboard_id}_{graph_id}.csv")


@app.get("/api/dashboards/{user_id}")
def get_dashboards_list(user_id,authorized=Depends(check_token)):
    if authorized[0]:
        return get_dashboards(user_id)


@app.get("/api/dashboard/{id}")
def get_dashboard_with_id(id,authorized=Depends(check_token)):
    if authorized[0]:
        return get_dashboard_by_id(id)

@app.delete("/api/dashboard/{id}")
def delete_dashboard(id,authorized=Depends(check_token)):
    if authorized[0]:
        remove_dashboard(id)

@app.post("/api/dashboard")
async def add_dashboard(request: Request,authorized=Depends(check_token)):
    if authorized[0]:
        data = await request.json()
        user_id = data['user_id']
        name = data['name']
        dashboard = Dashboard(user_id, name)
        added_dashboard = add_new_dashboard(dashboard)
        return added_dashboard['id']


@app.post("/api/csvupload")
async def upload_csv(file: UploadFile):
    with open(f"localdata/{file.filename}", 'wb') as f:
        file = file.file.read()
        f.write(file)
        df = pd.read_csv(BytesIO(file))

@app.post("/api/columns")
async def edit_csv(request:Request):
    data=await request.json()

    dashboard_id=data['dashboard_id']
    graph_id=data['graph_id']
    columns=data['columns']

    data=pd.read_csv(f'localdata/{dashboard_id}_{graph_id}.csv')
    for column in columns:
        pass
        if columns[column]==False:
            data.drop(column,inplace=True,axis=1)

    data.to_csv(f'localdata/{dashboard_id}_{graph_id}.csv',index=False)

    return "Success"
