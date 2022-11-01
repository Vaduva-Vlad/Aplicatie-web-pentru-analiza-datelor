import pandas as pd
from SimpleData import SimpleData

class ProcessExcel:
    def __init__(self, file):
        self.file = file

    def process_simple_data(self):
        result=[]
        df = pd.read_excel(self.file)
        for idx,row in df.iterrows():
            data=SimpleData(str(row['name']),int(row['value']))
            result.append(data)
        return result

def main():
    excel = ProcessExcel('data.xlsx')
    excel.process_simple_data()

if __name__ == "__main__":
    main()
