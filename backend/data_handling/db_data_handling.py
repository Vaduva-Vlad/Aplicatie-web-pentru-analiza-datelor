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


def remove_dashboard(id):
    sql = f"""DELETE FROM Dashboards WHERE id='{id}'"""
    cursor.execute(sql)
    conn.commit()


def get_graph_by_dashboard_id(dashboard_id,user_id):
    # commit temporar, altfel apar randuri sterse
    conn.commit()
    sql = f"""SELECT * FROM Graphs WHERE dashboard_id='{dashboard_id}' AND user_id='{user_id}'"""
    cursor.execute(sql)
    result = cursor.fetchall()

    for graph in result:
        graph["option"] = json.loads(graph['option'])
        graph["position"] = json.loads(graph['position'])
        graph_data_handler = GetGraphData(graph)
        data = graph_data_handler.get_data()
        if graph['type'] == 'pie':
            graph['option']['series'][0]['data'] = data
        elif graph['type'] == 'line' or graph['type'] == 'bar':
            graph['option']['xAxis']['data'] = data['xaxis']
            graph['option']['series'][0]['data'] = data['data']
        elif graph['type'] == 'scatter':
            graph['option']['series'][0]['data'] = data
        elif graph['type'] == 'waterfall':
            graph['option']['xAxis']['data'] = data['xaxis']
            graph['option']['series'][0]['data'] = data['series1']
            graph['option']['series'][1]['data'] = data['series2']

    return result


def user_exists(email, username):
    sql = f"SELECT COUNT(*) as num FROM Users WHERE email='{email}' OR username='{username}'"
    cursor.execute(sql)
    result = cursor.fetchone()
    if result['num'] == 0:
        return False
    return True


def add_user(user):
    sql = f"""INSERT INTO Users (username,email,password)
            VALUES ('{user.username}','{user.email}','{user.password}')"""
    cursor.execute(sql)
    conn.commit()

    sql = f"""SELECT id,username,email FROM Users WHERE email='{user.email}'"""
    cursor.execute(sql)
    result = cursor.fetchone()
    return result


def get_user(username):
    sql = f"SELECT * FROM Users WHERE username='{username}'"
    cursor.execute(sql)
    result = cursor.fetchone()
    return result


def add_new_dashboard(dashboard):
    sql = f"""INSERT INTO Dashboards (user_id,name)
            VALUES ('{dashboard.user_id}','{dashboard.name}')"""
    cursor.execute(sql)
    conn.commit()
    sql = f"SELECT LAST_INSERT_ID() AS id"
    cursor.execute(sql)
    result = cursor.fetchone()
    return result


def add_new_graph(graph, type):
    option_json = json.dumps(graph.option)
    position_json = json.dumps(graph.position)
    sql = f"""INSERT INTO Graphs (dashboard_id,user_id,position,type,`option`,data_source)
                VALUES ({graph.dashboard_id},{graph.user_id},'{position_json}','{type}','{option_json}','{graph.data_source}')"""
    cursor.execute(sql)
    conn.commit()
    sql = f"SELECT LAST_INSERT_ID() AS id"
    cursor.execute(sql)
    result = cursor.fetchone()
    return result['id']


def remove_graph(graph_id):
    sql = f"DELETE FROM Graphs WHERE id={graph_id}"
    cursor.execute(sql)
    conn.commit()

def dashboard_belongs_to_user(dashboard_id,user_id):
    sql=f"SElECT user_id from Dashboards where id={dashboard_id}"
    cursor.execute(sql)
    result=cursor.fetchone()
    result=result['user_id']
    return user_id==str(result)
