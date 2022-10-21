import pandas as pd
from SingleRowData import SingleRowData

class ProcessExcel:
    def __init__(self, file):
        self.file = file

    def process_single_row_data(self):
        df = pd.read_excel(self.file)
        name=df.columns.tolist()
        values=df.values[0].tolist()
        data=SingleRowData(name,values)
        return data

def main():
    excel = ProcessExcel('data.xlsx')
    excel.process_single_row_data()

if __name__ == "__main__":
    main()
