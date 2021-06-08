from flask import Flask
from flask_pymongo import PyMongo
from aqi_predictor.config import Config

mongo = PyMongo()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(Config)

    with app.app_context():
        mongo.init_app(app)

        from aqi_predictor.routes.aqi import aqi

        app.register_blueprint(aqi)

    return app