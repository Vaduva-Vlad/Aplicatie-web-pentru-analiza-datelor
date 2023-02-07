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


if __name__=='__main__':
    pcsv=ProcessCSV('localdata/1_1.csv')
    pcsv.process_for_pie_chart()