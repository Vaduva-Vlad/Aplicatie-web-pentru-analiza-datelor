import pymysql
connection = pymysql.connect(host='localhost',
                             user='vlad',
                             password='',
                             database='data_visualizer')



with connection:
    with connection.cursor() as cursor:
        sql="""CREATE TABLE IF NOT EXISTS Users(
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `username` varchar(16),
        `email` varchar(255),
        `password` varchar(255),
        PRIMARY KEY (`id`))
        AUTO_INCREMENT=1"""
        cursor.execute(sql)

        sql="""CREATE TABLE IF NOT EXISTS Dashboards(
        id int(11) NOT NULL AUTO_INCREMENT,
        user_id int(11) NOT NULL,
        name varchar(128) NOT NULL,
        PRIMARY KEY (`id`),
        FOREIGN KEY (user_id) REFERENCES Users(id))"""
        cursor.execute(sql)

        sql="""CREATE TABLE IF NOT EXISTS Graphs(
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `dashboard_id` int(11) NOT NULL,
        `user_id` int (11) NOT NULL,
        `type` VARCHAR(20),
        `option` JSON NOT NULL,
        `data_source` VARCHAR(25),
        PRIMARY KEY(`id`),
        FOREIGN KEY (dashboard_id) REFERENCES Dashboards(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
        )
        AUTO_INCREMENT=1"""
        cursor.execute(sql)

    connection.commit()