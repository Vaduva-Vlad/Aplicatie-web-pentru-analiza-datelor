import pymysql
import pymysql.cursors
import json
from .get_data_for_graph import GetGraphData
from sqlalchemy import create_engine

connection = pymysql.connect(host='localhost',
                             user='vlad',
                             password='LetsPass23',
                             database='data_visualizer')

SQLALCHEMY_DATABASE_URL = "mysql+pymysql://vlad:LetsPass23@localhost:3306/data_visualizer"
engine = create_engine(SQLALCHEMY_DATABASE_URL, pool_recycle=3600)
conn = engine.raw_connection()
cursor = conn.cursor(pymysql.cursors.DictCursor)


def get_dashboards(user_id):
    sql = f"""SELECT * FROM Dashboards WHERE user_id='{user_id}'"""
    cursor.execute(sql)
    result = cursor.fetchall()
    return result


def get_dashboard_by_id(id):
    sql = f"""SELECT * FROM Dashboards WHERE id='{id}'"""
    cursor.execute(sql)
    result = cursor.fetchone()
    return result


def get_graph_by_dashboard_id(dashboard_id):
    sql = f"""SELECT * FROM Graphs WHERE dashboard_id='{dashboard_id}'"""
    cursor.execute(sql)
    result = cursor.fetchall()

    for graph in result:
        graph["option"] = json.loads(graph['option'])
        graph["position"] = json.loads(graph['position'])
        graph_data_handler = GetGraphData(graph)
        data = graph_data_handler.get_data()
        graph['option']['series'][0]['data'] = data

    return result


def email_exists(email):
    sql = f"SELECT COUNT(*) as num FROM Users WHERE email='{email}'"
    cursor.execute(sql)
    result = cursor.fetchone()
    if result['num'] == 0:
        return False
    return True


def add_user(user):
    sql=f"""INSERT INTO Users (username,email,password)
            VALUES ('{user.username}','{user.email}','{user.password}')"""
    cursor.execute(sql)
    conn.commit()
    print('here')