class Graph:
    def __init__(self, dashboard_id, user_id, data_source, id=None, option=None, position={"x": 100, "y": 100}):
        self.id = id
        self.dashboard_id = dashboard_id
        self.user_id=user_id
        self.data_source = data_source
        self.position = position
        self.option = option

    def set_option(self, title, type):
        if type == 'pie':
            self.option = {
                "title": {
                    "left": "center",
                    "text": title
                },
                "legend": {
                    "left": "left",
                    "orient": "vertical"
                },
                "series": [
                    {
                        "data": [

                        ],
                        "name": "Access From",
                        "type": type,
                        "radius": "50%",
                        "emphasis": {
                            "itemStyle": {
                                "shadowBlur": 10,
                                "shadowColor": "rgba(0, 0, 0, 0.5)",
                                "shadowOffsetX": 0
                            }
                        }
                    }
                ],
                "tooltip": {
                    "trigger": "item"
                }
            }
        elif type == 'line' or type == 'bar':
            self.option = {
                'title': {
                    'text': title,
                    'left': 'center'
                },
                'xAxis': {
                    'type': 'category',
                    'data': []
                },
                'yAxis': {
                    'type': 'value'
                },
                'series': [
                    {
                        'data': [],
                        'type': type
                    }
                ]
            }
        elif type=='scatter':
            self.option={
                'title': {
                    'text': f'{title}',
                    'left': 'center'
                },
                'xAxis':{},
                'yAxis':{},
                'series':[
                    {
                        'symbolSize':10,
                        'data':[],
                        'type':type
                    }
                ]
            }
        elif type=='waterfall':
            self.option= {
              title: {
                'text': 'Waterfall Chart',
                'subtext': 'Living Expenses in Shenzhen'
              },
              'tooltip': {
                'trigger': 'axis',
                'axisPointer': {
                  'type': 'shadow'
                }
              },
              'grid': {
                'left': '3%',
                'right': '4%',
                'bottom': '3%',
                'containLabel': True
              },
              'xAxis': {
                'type': 'category',
                'splitLine': { 'show': False },
                'data': []
              },
              'yAxis': {
                'type': 'value'
              },
              'series': [
                {
                  'name': '',
                  'type': 'bar',
                  'stack': 'Total',
                  'itemStyle': {
                    'borderColor': 'transparent',
                    'color': 'transparent'
                  },
                  'emphasis': {
                    'itemStyle': {
                      'borderColor': 'transparent',
                      'color': 'transparent'
                    }
                  },
                  'data': []
                },
                {
                  'name': '',
                  'type': 'bar',
                  'stack': 'Total',
                  'label': {
                    'show': True,
                    'position': 'inside'
                  },
                  'data': []
                }
              ]
            }