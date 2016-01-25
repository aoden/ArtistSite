import hashlib
from dao import db_connector

__author__ = 'khoi'

SALT = '*&(^^(&^%$%#HJBH$#^R^*&##$@!@(())_+'


def hash_sha(salted_string):
    h = hashlib.sha256()
    h.update(salted_string.encode('utf-8'))
    hashed_pwd = h.hexdigest()
    return hashed_pwd

class BaseDao:
    def __init__(self):
        self.connection = db_connector.get_connection()

    def get_connection(self):
        if not self.connection.open:
            self.connection = db_connector.get_connection()
        return self.connection


