from dao import db_connector

__author__ = 'khoi'


class BaseDao:
    def __init__(self):
        self.connection = db_connector.get_connection()

    def get_connection(self):
        if not self.connection.open:
            self.connection = db_connector.get_connection()
        return self.connection


