from models.Graph import Graph

class Dashboard:
    def __init__(self,id,name,graphs):
        self.id=id
        self.name=name
        self.graphs:list[Graph]=graphs