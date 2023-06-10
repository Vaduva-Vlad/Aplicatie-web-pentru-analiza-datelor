import pymysql.cursors
from sqlalchemy import create_engine


class UserDBConnection:
    def __init__(self, host, user, password, database,port=3306):
        self.SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{user}:{password}@{host}:{port}/{database}"
        self.engine = create_engine(self.SQLALCHEMY_DATABASE_URL, pool_recycle=3600)
        self.conn = self.engine.raw_connection()
        self.cursor = self.conn.cursor(pymysql.cursors.DictCursor)

    def get_data(self,table,column1,column2):
        sql = f"""SELECT `{column1}`,`{column2}` FROM {table};"""
        self.cursor.execute(sql)
        result = self.cursor.fetchall()
        return result

if __name__=="__main__":
    db=UserDBConnection('localhost','vlad','LetsPass23','user_database')
    print(db.get_data('pie_data','value','key'))