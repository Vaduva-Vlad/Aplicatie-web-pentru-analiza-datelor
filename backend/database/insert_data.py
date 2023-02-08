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
      'data': [],
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
position_json=json.dumps({'x':100,'y':100})

with connection:
  with connection.cursor() as cursor:


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

    sql = f"""INSERT INTO Graphs(
        `id`,
        `dashboard_id`,
        `position`,
        `type`,
        `option`,
        `data_source`
        )VALUES (
        1,
        1,
        '{position_json}',
        'pie',
        '{option_json}',
        'csv'
        )"""
    cursor.execute(sql)

  connection.commit()