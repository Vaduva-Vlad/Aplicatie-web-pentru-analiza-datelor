import os
import json
import csv

os.chdir(os.path.dirname(__file__))

# Acest script preia datele pentru graficele care folosesc json și le transformă într-un format adecvat.
# În cazul în care datele sunt malformate, graficul va fi creat gol.

class ProcessJSON:
    def __init__(self, filename):
        self.filename = filename

    def process_for_pie_chart(self):
        try:
            result = []
            with open(self.filename, 'r') as file:
                data = json.load(file)
                keys=list(data.keys())
                min_range=min(len(data[keys[0]]),len(data[keys[1]]))
                print(min_range)
                for value in range(min_range):
                    result.append({'value': data[keys[0]][value], 'name': data[keys[1]][value]})
            return result
        except Exception as e:
            pass

    def process_for_line_and_bar_chart(self):
        try:
            with open(self.filename, 'r') as file:
                data = json.load(file)
                keys = list(data.keys())
                result = {'xaxis': data[keys[1]], 'data': data[keys[0]]}
            return result
        except Exception as e:
            pass

    def process_for_scatter_chart(self):
        try:
            result = []
            with open(self.filename, 'r') as file:
                data = json.load(file)
                keys = list(data.keys())
                for value in range(len(data[keys[0]])):
                    row=[data[keys[0]][value],data[keys[1]][value]]
                    result.append(row)
            return result
        except Exception as e:
            pass

    def process_for_waterfall_chart(self):
        try:
            with open(self.filename, 'r') as file:
                data = json.load(file)
                keys = list(data.keys())
                result = {"xaxis": data[keys[0]], "series1": data[keys[1]], "series2": data[keys[2]]}
            return result
        except Exception as e:
            pass