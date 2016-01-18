from flask import Flask
from flask.ext.restful.reqparse import RequestParser
from flask_restful import Resource, Api

app = Flask(__name__)

api = Api(app)


class Login(Resource):
    def post(self):
        parseer = RequestParser()
        parseer.add_argument('email', type=str)
        parseer.add_argument('password', type=str)
        return parseer.parse_args()


api.add_resource(Login, '/login')

if __name__ == '__main__':
    app.run(debug=True)
