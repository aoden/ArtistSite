from random import choice
from string import ascii_uppercase
from dateutil.parser import parser
from flask import Flask
from flask.ext.restful.reqparse import RequestParser

from flask_restful import Resource, Api
import werkzeug

from dao.base_dao import SALT, hash_sha
from service.UserService import UserService
from service.image_service import ImageService

app = Flask(__name__)

api = Api(app)
user_service = UserService()

# def check_token(email, hashed_pwd):
#     if UserService.get_token(email, hashed_pwd) is not None:
#         return True
#     return False

class Login(Resource):
    def post(self):
        parser = RequestParser()
        parser.add_argument('email', type=str)
        parser.add_argument('password', type=str)
        args = parser.parse_args()

        salted_string = (args['password'] + SALT)
        hashed_pwd = hash_sha(salted_string)
        if user_service.check_login(args['email'], hashed_pwd):
            return {'message': 'ok', 'token': user_service.get_token(args['email'], hashed_pwd)}
        else:
            return {'message': 'error'}


class Register(Resource):
    def post(self):
        parser = RequestParser()
        parser.add_argument('email', type=str)
        parser.add_argument('password', type=str)
        parser.add_argument('re_password', type=str)
        parser.add_argument('phone', type=str)
        parser.add_argument('address', type=str)
        parser.add_argument('description', type=str)


class Upload(Resource):
    def post(self):
        parser = RequestParser()
        parser.add_argument('file', type=werkzeug.datastructures.FileStorage)
        parser.add_argument('name', type=str)
        parser.add_argument('price', type=str)
        parser.add_argument('description', type=str)
        parser.add_argument('type', type=int)
        parser.add_argument('token', type=str)

        args = parser.parse_args()
        if UserService.check_token(args['token']):
            if args['type'] == 0:
                return {'message', 'success'}
                ImageService.save_2d_image(args)
            else:
                ImageService.save_3d_image(args)
                return {'message', 'success'}

        return {'message', 'error'}, 403


class Token(Resource):
    def get(self):
        parser = RequestParser()
        parser.add_argument('token', type=str)
        args = parser.parse_args()
        if UserService.check_token():
            return {'message', 'success'}
        return {'message', 'error'}


class ResetPwd(Resource):
    def post(self):
        parser = RequestParser()
        parser.add_argument('email', type=str)
        parser.add_argument('token', type=str)
        args = parser.parse_args()
        pwd = ''.join(choice(ascii_uppercase) for i in range(8))
        salted_string = (pwd + SALT)
        hashed_pwd = hash_sha(salted_string)
        UserService.create_user(args['email'], hashed_pwd, args['token'])


api.add_resource(ResetPwd, '/reset')
api.add_resource(Token, '/token')
api.add_resource(Login, '/login')
api.add_resource(Upload, '/upload')

if __name__ == '__main__':
    app.run(debug=True)
