import time
from dao.base_dao import BaseDao, hash_sha, SALT
from dao.db_connector import get_connection

__author__ = 'khoi'



class UserDao(BaseDao):
    def __init__(self):
        super().__init__()

    @classmethod
    def get_api_token(cls, access_token):

        connection = get_connection()
        with connection.cursor() as cursor:
            sql = "select api_token from users FULL OUTER JOIN tokens where %s = token"
            cursor.execute(sql, [access_token])
            result = cursor.fetchone()
        return result('api_token')

    @classmethod
    def check_login(cls, email, password):

        connection = get_connection()
        with connection.cursor() as cursor:
            sql = "select email, password from users where email = %s"
            cursor.execute(sql, [email])
            result = cursor.fetchone()
            if cursor.rowcount == 1:
                if password == result['password']:
                    return True
        return False

    @classmethod
    def get_token(cls, email, hashed_pwd):

        connection = get_connection()
        try:
            with connection.cursor() as cursor:
                sql = "SELECT token, date FROM tokens WHERE email = %s"
                cursor.execute(sql, [email])
                result = cursor.fetchone()
                if cursor.rowcount == 1:
                    current__time_in_seconds = cls.get_current_time_in_seconds()
                    if current__time_in_seconds - int(result['date']) <= 60 * 60 * 24:
                        return result['token']
                return cls.create_token(email, hashed_pwd)
        finally:
            connection.close()

    @classmethod
    def get_current_time_in_seconds(cls):
        return int(round(time.time()))

    @classmethod
    def create_token(cls, email, hashed_pwd):

        connection = get_connection()
        try:
            with connection.cursor() as cursor:

                sql = 'SELECT token FROM users FULL JOIN tokens WHERE tokens.email = %s AND password = %s'
                cursor.execute(sql, [email, hashed_pwd])
                seconds = cls.get_current_time_in_seconds()
                token = hash_sha(email + hashed_pwd + str(seconds) + SALT)
                if cursor.rowcount == 1:
                    sql = 'UPDATE tokens SET token = %s, date = %s WHERE email = %s'
                    cursor.execute(sql, [token, seconds, email])
                    connection.commit()
                    return token
                else:
                    sql = 'INSERT INTO tokens(email, token, date) VALUES (%s, %s, %s)'
                    cursor.execute(sql, [email, token, seconds])
                    connection.commit()
                    return token
        finally:
            connection.close()
        return None

    @classmethod
    def checkToken(cls, token):
        connection = get_connection()
        try:
            with connection.cursor() as cursor:
                sql = 'SELECT token from tokens WHERE token = %s'
                cursor.execute(sql, [token])
                result = cursor.fetchone()
                if result['token'] == token:
                    return True
            return False
        except:
            return False
        finally:
            connection.close()

    @classmethod
    def create_user(cls, email, pwd, token):
        connection = get_connection()
        try:
            with connection.cursor() as cursor:
                sql = 'SELECT email FROM users WHERE email = %s'
                cursor.execute(sql, [email])
                result = cursor.fetchone()
                if cursor.rowcount == 0:
                    sql = 'INSERT INTO users(email, password, api_token) VALUES (%s, %s, %s)'
                    cursor.execute(sql, [email, pwd, token])
                    connection.commit()
                else:
                    sql = 'UPDATE users SET password = %s, api_token = %s WHERE email = %s'
                    cursor.execute(sql, [pwd, token, email])
                    connection.commit()
        finally:
            connection.close()
