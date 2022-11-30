from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from ProcessExcel import ProcessExcel
from models.Graph import Graph
from models.Dashboard import Dashboard
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
    option1 = {
        "title": {
            "text": 'Referer of a Website',
            "subtext": 'Fake Data',
            'left': 'center'
        },
        'tooltip': {
            'trigger': 'item'
        },
        'legend': {
            'orient': 'vertical',
            'left': 'left'
        },
        'series': [
            {
                'name': 'Access From',
                'type': 'pie',
                'radius': '50%',
                'data': [
                    {'value': 1048, 'name': 'Search Engine'},
                    {'value': 735, 'name': 'Direct'},
                    {'value': 580, 'name': 'Email'},
                    {'value': 484, 'name': 'Union Ads'},
                    {'value': 300, 'name': 'Video Ads'}
                ],
                'emphasis': {
                    'itemStyle': {
                        'shadowBlur': 10,
                        'shadowOffsetX': 0,
                        'shadowColor': 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }
    graph1=Graph(1,option1)
    dashboard1=Dashboard(1,[graph1])
    return dashboard1