from dao.user_dao import UserDao
from service.base_service import BaseService

__author__ = 'khoi'


class UserService(BaseService):
    def __init__(self):
        super().__init__()

    @classmethod
    def find(self, id):
        return

    @classmethod
    def check_login(self, email, password):
        return UserDao().check_login(email, password)

    @classmethod
    def get_api_token(self, access_token):
        return UserDao.get_api_token(access_token)

    @classmethod
    def get_token(self, email, hashed_pwd):
        return UserDao.get_token(email, hashed_pwd)

    @classmethod
    def create_token(self, email, hashed_pwd):
        return UserDao.create_token(email, hashed_pwd)

    @classmethod
    def check_token(self, token):
        if token is None:
            return False
        else:
            return UserDao.checkToken(token)

    @classmethod
    def create_user(self, email, pwd, token):
        UserDao.create_user(email, pwd, token)
