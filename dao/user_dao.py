from dao.base_dao import BaseDao
from dao.db_connector import get_connection

__author__ = 'khoi'


class UserDao(BaseDao):
    def __init__(self):
        super().__init__()

    def check_login(self, email, password):

        connection = get_connection()
        with connection.cursor() as cursor:
            sql = "select email, password from users where email = email"
            cursor.execute(sql)
            result = cursor.fetchone()
            if result is not None:
                if (password == result['password']):
                    return True
        return False
