import pymysql
connection = pymysql.connect(host='localhost',
                             user='vlad',
                             password='LetsPass23',
                             database='data_visualizer')



with connection:
    with connection.cursor() as cursor:
        sql="""CREATE TABLE IF NOT EXISTS Dashboards(
        id int(11) NOT NULL AUTO_INCREMENT,
        user_id int(11) NOT NULL,
        name varchar(128) NOT NULL,
        PRIMARY KEY (`id`),
        FOREIGN KEY (user_id) REFERENCES Users(id))"""
        cursor.execute(sql)

        sql="""CREATE TABLE IF NOT EXISTS Users(
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `email` varchar(255),
        `password` varchar(255),
        PRIMARY KEY (`id`))
        AUTO_INCREMENT=1"""
        cursor.execute(sql)

        sql="""CREATE TABLE IF NOT EXISTS Graphs(
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `dashboard_id` int(11) NOT NULL,
        `options` JSON NOT NULL,
        PRIMARY KEY(`id`),
        FOREIGN KEY (dashboard_id) REFERENCES Dashboards(id)
        )
        AUTO_INCREMENT=1"""
        cursor.execute(sql)

    connection.commit()