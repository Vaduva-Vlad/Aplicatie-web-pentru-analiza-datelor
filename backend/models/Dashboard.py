from models.Graph import Graph

class Dashboard:
    def __init__(self,id,graphs):
        self.id=id
        self.graphs:list[Graph]=graphs