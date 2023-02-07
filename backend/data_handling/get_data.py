import pymysql
import pymysql.cursors
import json
from .get_data_for_graph import GetGraphData
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

connection = pymysql.connect(host='localhost',
                             user='vlad',
                             password='LetsPass23',
                             database='data_visualizer')


def get_dashboards(user_id):
    with connection.cursor(pymysql.cursors.DictCursor) as cursor:
        sql = f"""SELECT * FROM Dashboards WHERE user_id='{user_id}'"""
        cursor.execute(sql)
        result = cursor.fetchall()
    connection.commit()

    return result


def get_dashboard_by_id(id):
    with connection.cursor(pymysql.cursors.DictCursor) as cursor:
        sql = f"""SELECT * FROM Dashboards WHERE id='{id}'"""
        cursor.execute(sql)
        result = cursor.fetchone()
    connection.commit()

    return result


def get_graph_by_dashboard_id(dashboard_id):
    with connection.cursor(pymysql.cursors.DictCursor) as cursor:
        sql = f"""SELECT * FROM Graphs WHERE dashboard_id='{dashboard_id}'"""
        cursor.execute(sql)
        result = cursor.fetchall()

    for graph in result:
        graph["option"]=json.loads(graph['option'])
        graph["position"]=json.loads(graph['position'])
        graph_data_handler=GetGraphData(graph)
        data=graph_data_handler.get_data()
        graph['option']['series'][0]['data']=data
    connection.commit()

    return result
