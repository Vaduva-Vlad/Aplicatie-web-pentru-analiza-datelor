import csv
from .csv_file_handling import ProcessCSV
from .process_db_data import DBDataProcessing


class GetGraphData:
    def __init__(self, graph):
        self.graph = graph

    def get_data(self):
        data = None
        if self.graph['data_source'].lower() == 'csv':
            process_csv = ProcessCSV(f'localdata/{self.graph["dashboard_id"]}_{self.graph["id"]}.csv')
            if self.graph['type'] == 'pie':
                data = process_csv.process_for_pie_chart()
            elif self.graph['type'] == 'line' or self.graph['type'] == 'bar':
                data = process_csv.process_for_line_and_bar_chart()
            elif self.graph['type'] == 'scatter':
                data = process_csv.process_for_scatter_chart()
        # elif self.graph['data_source'].lower() == 'sql':
        #     process_sql = DBDataProcessing()
        return data


if __name__ == '__main__':
    graph = {'id': 1, 'dashboard_id': 1, 'position': '{"x": 100, "y": 100}', 'type': 'pie',
             'option': {'title': {'left': 'center', 'text': 'Referer of a Website', 'subtext': 'Fake Data'},
                        'legend': {'left': 'left', 'orient': 'vertical'}, 'series': [
                     {'data': [], 'name': 'Access From', 'type': 'pie', 'radius': '50 % ',
                      'emphasis': {
                          'itemStyle': {'shadowBlur': 10, 'shadowColor': 'rgba(0, 0, 0, 0.5)', 'shadowOffsetX': 0}}}],
                        'tooltip': {'trigger': 'item'}}, 'data_source': 'csv'
             }

    test = GetGraphData(graph)
    test.get_data()
