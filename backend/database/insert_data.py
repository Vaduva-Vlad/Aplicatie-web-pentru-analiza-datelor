import pymysql
import json

connection = pymysql.connect(host='localhost',
                             user='vlad',
                             password='LetsPass23',
                             database='data_visualizer')

option= {
  'title': {
    'text': 'Referer of a Website',
    'subtext': 'Fake Data',
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
        { 'value': 1048, 'name': 'Search Engine' },
        { 'value': 735, 'name': 'Direct' },
        { 'value': 580, 'name': 'Email' },
        { 'value': 484, 'name': 'Union Ads' },
        { 'value': 300, 'name': 'Video Ads' }
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
option_json=json.dumps(option)

with connection:
  with connection.cursor() as cursor:
    sql="""INSERT INTO Users(
    `id`,
    `email`,
    `password`
    )
    VALUES 
    (
    1,
    "user1@mail.com",
    "1234"
    )"""
    cursor.execute(sql)

    sql="""INSERT INTO Dashboards(
    `id`,
    `user_id`,
    `name`
    )VALUES (
    1,
    1,
    "Dashboard1"
    )"""
    cursor.execute(sql)

    sql=f"""INSERT INTO Graphs(
    `id`,
    `dashboard_id`,
    `options`
    )VALUES (
    1,
    1,
    '{option_json}'
    )"""
    cursor.execute(sql)

  connection.commit()