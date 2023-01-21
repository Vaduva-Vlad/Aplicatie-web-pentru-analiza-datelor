from models.Graph import Graph
from models.Dashboard import Dashboard
import pymysql
import json
import pandas as pd

connection = pymysql.connect(host='localhost',
                             user='vlad',
                             password='LetsPass23',
                             database='data_visualizer')

with connection:
    with connection.cursor() as cursor:
        sql="""SELECT * FROM Graphs"""
        cursor.execute(sql)
        result=cursor.fetchall()
        dff=pd.DataFrame(result,columns=['id','dashboard_id','options'])
        print(result)


"""g=Graph(1,option)
graphs=[g]
dashboard=Dashboard(1,'name',graphs)
DASHBOARDS=[dashboard]"""