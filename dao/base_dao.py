from dao import mysql

__author__ = 'khoi'


class BaseDao:
    def __init__(self):
        self.connection = mysql.get_connection()

    def get_connection(self):
        if not self.connection.open:
            self.connection = mysql.get_connection()
        return self.connection


BaseDao().get_connection()
