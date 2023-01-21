import pymysql
import pymysql.cursors

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
        result = cursor.fetchall()
    connection.commit()

    return result


def get_graph_by_dashboard_id(dashboard_id):
    with connection.cursor(pymysql.cursors.DictCursor) as cursor:
        sql = f"""SELECT * FROM Graphs WHERE dashboard_id='{dashboard_id}'"""
        cursor.execute(sql)
        result = cursor.fetchall()
    connection.commit()

    return result
