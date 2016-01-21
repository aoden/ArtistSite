from dao.user_dao import UserDao
from service.base_service import BaseService

__author__ = 'khoi'


class UserService(BaseService):
    def __init__(self):
        super().__init__()

    def find(self, id):
        return

    def check_login(self, email, password):
        return UserDao().check_login(email, password)
