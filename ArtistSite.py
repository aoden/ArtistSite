from flask import Flask
from flask_restful import Resource, Api

app = Flask(__name__)

api = Api(app)

class HelloWorld(Resource):
    def get(self, dkm):
        return {dkm: dkm}


api.add_resource(HelloWorld, '/<string:dkm>')

if __name__ == '__main__':
    app.run(debug=True)
