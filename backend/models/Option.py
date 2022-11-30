from abc import ABC, abstractmethod

class Option(ABC):
    def __init__(self,title,series,tooltip):
        self._title=title
        self._series=series
        self._tooltip=tooltip