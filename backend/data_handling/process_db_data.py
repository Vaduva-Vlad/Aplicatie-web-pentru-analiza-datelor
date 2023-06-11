class DBDataProcessing:
    def __init__(self, data):
        self.data = data

    def db_process_for_piechart(self):
        result=[]
        for row in self.data:
            new_row={"value":row[0],"name":row[1]}
            result.append(new_row)

        return result
