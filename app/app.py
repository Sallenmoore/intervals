import os

from config import ProductionConfig
from flask import Flask, render_template, request, session


def create_app():
    app = Flask(os.getenv("APP_NAME", __name__))
    app.config.from_object(ProductionConfig)
    #################################################################
    #                             Extensions                        #
    #################################################################

    #################################################################
    #                             ROUTES                            #
    #################################################################
    @app.route("/", methods=["GET", "POST"])
    def index():

        return render_template("index.html")

    return app
