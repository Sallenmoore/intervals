import os

from autonomous.assets import build_assets
from config import DevelopmentConfig, ProductionConfig
from flask import Flask
from views.index import index_page


def create_app():
    app = Flask(os.getenv("APP_NAME", __name__))
    app.config.from_object(DevelopmentConfig)
    #################################################################
    #                             Extensions                        #
    #################################################################

    app.before_request(lambda: build_assets())

    #################################################################
    #                             ROUTES                            #
    #################################################################
    ######################################
    #           Blueprints               #
    ######################################
    app.register_blueprint(index_page)
    return app
