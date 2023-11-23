import logging
import os

from config import Config
from flask import Flask

from views.index import index_page

from autonomous import log
from autonomous.assets import build_assets


def create_app():
    app = Flask(os.getenv("APP_NAME", __name__))
    app.config.from_object(Config)
    #################################################################
    #                             Filters                           #
    #################################################################
    # app.jinja_env.filters['datetime_format'] = datefilters.datetime_format

    #################################################################
    #                             Extensions                        #
    #################################################################

    # - Assets

    app.before_request(lambda: build_assets())

    #################################################################
    #                             ROUTES                            #
    #################################################################

    ######################################
    #           Blueprints               #
    ######################################
    app.register_blueprint(index_page)

    return app
