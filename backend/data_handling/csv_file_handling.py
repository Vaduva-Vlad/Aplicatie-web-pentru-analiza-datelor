import csv
import os
os.chdir(os.path.dirname(__file__))

class ProcessCSV:
    def __init__(self, filename):
        self.filename=filename

    def process_for_pie_chart(self):
        result=[]
        with open(self.filename, 'r') as file:
            reader=csv.reader(file)
            for row in reader:
                result.append({'value':row[0],'name':row[1]})

        return result

    def process_for_line_chart(self):
        xaxis=[]
        data=[]

        with open(self.filename,'r') as file:
            reader = csv.reader(file)
            for row in reader:
                data.append(row[0])
                xaxis.append(row[1])
            result={'xaxis':xaxis,'data':data}

        return result


if __name__=='__main__':
    pcsv=ProcessCSV('localdata/6_1.csv')
    pcsv.process_for_pie_chart()