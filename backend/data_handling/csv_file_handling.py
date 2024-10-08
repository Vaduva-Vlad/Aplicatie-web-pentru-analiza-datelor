import csv
import os

os.chdir(os.path.dirname(__file__))

# Acest script preia datele pentru graficele care folosesc csv și le transformă într-un format adecvat.

class ProcessCSV:
    def __init__(self, filename):
        self.filename = filename

    def process_for_pie_chart(self):
        result = []
        with open(self.filename, 'r') as file:
            reader = csv.reader(file)
            for row in reader:
                result.append({'value': row[0], 'name': row[1]})
        return result

    def process_for_line_and_bar_chart(self):
        xaxis = []
        data = []

        with open(self.filename, 'r') as file:
            reader = csv.reader(file)
            for row in reader:
                data.append(row[0])
                xaxis.append(row[1])
            result = {'xaxis': xaxis, 'data': data}

        return result

    def process_for_scatter_chart(self):
        result = []
        with open(self.filename, 'r') as file:
            reader = csv.reader(file)
            for row in reader:
                result.append(row)
        return result

    def process_for_waterfall_chart(self):
        xaxis = []
        series1 = []
        series2 = []

        with open(self.filename, 'r') as file:
            reader = csv.reader(file)
            for row in reader:
                xaxis.append(row[0])
                series1.append(row[1])
                series2.append(row[2])
            result = {"xaxis": xaxis, "series1": series1, "series2": series2}
        print(result)
        return result


if __name__ == '__main__':
    pcsv = ProcessCSV('localdata/6_1.csv')
    pcsv.process_for_pie_chart()
