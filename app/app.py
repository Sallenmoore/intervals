import logging
import os

from config import Config
from flask import Flask

from views.index import index_page

from autonomous import log


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

    #################################################################
    #                             ROUTES                            #
    #################################################################

    ######################################
    #           Blueprints               #
    ######################################
    app.register_blueprint(index_page)

    return app
