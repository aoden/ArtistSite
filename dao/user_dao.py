import datetime
from dao.base_dao import BaseDao, hash_sha, SALT
from dao.db_connector import get_connection

__author__ = 'khoi'

epoch = datetime.datetime.utcfromtimestamp(0)


def get_time_in_seconds(dt):
    return (dt - epoch).total_seconds()


class UserDao(BaseDao):
    def __init__(self):
        super().__init__()

    def get_api_token(self, access_token):

        connection = get_connection()
        with connection.cursor() as cursor:
            sql = "select api_token from users FULL OUTER JOIN tokens where %s = token"
            cursor.execute(sql, [access_token])
            result = cursor.fetchone()
        return result('api_token')

    def check_login(self, email, password):

        connection = get_connection()
        with connection.cursor() as cursor:
            sql = "select email, password from users where email = %s"
            cursor.execute(sql, [email])
            result = cursor.fetchone()
            if result is not None:
                if password == result['password']:
                    return True
        return False

    def get_token(self, email, hashed_pwd):

        connection = get_connection()
        with connection.cursor() as cursor:
            sql = "SELECT token, date FROM tokens WHERE email = %s"
            cursor.execute(sql, [email])
            result = cursor.fetchone()
            if result is not None and result['token'] is not None:
                current__time_in_seconds = self.get_current_time_in_seconds()
                if current__time_in_seconds - int(result['date']) <= 60 * 60 * 24:
                    return result['token']
            return self.create_token(email, hashed_pwd)

    def get_current_time_in_seconds(self):
        return lambda: int(round(datetime.time.time()))

    def create_token(self, email, hashed_pwd):

        connection = get_connection()
        with connection.cursor() as cursor:

            sql = 'SELECT * FROM users WHERE email = %s AND password = %s'
            cursor.execute(sql, [email, hashed_pwd])
            result = cursor.fetchone
            token = hash_sha(email + hashed_pwd + get_time_in_seconds() + SALT)
            if result is None or result['email'] is None:
                sql = 'UPDATE tokens SET token = %s, date = %s WHERE email = %s'
                cursor.execute(sql, [email, token, self.get_current_time_in_seconds()])
                return token
            else:
                sql = 'INSERT INTO tokens(email, token, "date") VALUES (%s, %s, %s)'
                cursor.execute(sql, [email, token, self.get_current_time_in_seconds()])
                return token
        return None

    def checkToken(self, token):
        connection = get_connection()
        with connection.cursor() as cursor:
            sql = 'SELECT token from tokens WHERE token = %s'
            cursor.execute(sql, [token])
            result = cursor.fetchone
            if result['token'] == token:
                return True
        return False

    def create_user(self, email, pwd, token):
        connection = get_connection()
        with connection.cursor() as cursor:
            sql = 'SELECT email FROM users WHERE email = %s'
            cursor.execute(sql, [email])
            result = cursor.fetchone
            if result is None or result['email'] is None:
                sql = 'INSERT INTO users(email, password, api_token) VALUES (%s, %s, %s)'
                cursor.execute(sql, [email, pwd, token])
            else:
                sql = 'UPDATE users SET password = %s, api_token = %s WHERE email = %s'
                cursor.execute(sql, [pwd, token, email])
