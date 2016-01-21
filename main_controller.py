import hashlib
from flask import Flask
from flask.ext.restful import abort
from flask.ext.restful.reqparse import RequestParser
from flask_restful import Resource, Api
from service.UserService import UserService

app = Flask(__name__)

api = Api(app)
user_service = UserService()

salt = '*&(^^(&^%$%#HJBH$#^R^*&##$@!@(())_+'


class Login(Resource):
    def post(self):
        parser = RequestParser()
        parser.add_argument('email', type=str)
        parser.add_argument('password', type=str)
        h = hashlib.sha256()
        args = parser.parse_args()

        h.update((args['password'] + salt).encode('utf-8'))
        hashed_pwd = h.hexdigest()
        if user_service.check_login(args['email'], hashed_pwd):
            return {'message': 'ok'}
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


api.add_resource(Login, '/login')
api.add_resource(Register, '/signup')

if __name__ == '__main__':
    app.run(debug=True)
