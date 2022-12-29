from models.Graph import Graph
from models.Dashboard import Dashboard

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
dashboard1=Dashboard(1,'Nume Dashboard',[graph1])
dashboard2 = Dashboard(2, 'Nume Dashboard2', [graph1])
DASHBOARDS=[dashboard1,dashboard2]