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

    # css_input = os.path.join(app.static_folder, "style/sass/main.scss")
    # css_output = os.path.join(app.static_folder, "style/main.css")
    # js_input = os.path.join(app.static_folder, "js")
    # js_output = os.path.join(app.static_folder, "js/main.min.js")

    app.before_first_request(lambda: build_assets())

    #################################################################
    #                             ROUTES                            #
    #################################################################
    ######################################
    #           Blueprints               #
    ######################################
    app.register_blueprint(index_page)
    return app
