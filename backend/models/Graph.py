class Graph:
    def __init__(self, dashboard_id,data_source, id=None, option=None, position={"x": 100, "y": 100}):
        self.id = id
        self.dashboard_id = dashboard_id
        self.data_source=data_source
        self.position = position
        self.option = option

    def set_option(self, title, type):
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
