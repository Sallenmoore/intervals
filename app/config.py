import logging
import os


#################################################################
#                         CONFIGURATION                         #
#################################################################
class Config:
    APP_NAME = os.environ.get("APP_NAME", __name__)
    HOST = os.environ.get("HOST", "0.0.0.0")
    PORT = os.environ.get("PORT", 5000)
    SECRET_KEY = os.environ.get("SECRET_KEY", "NATASHA")


class ProductionConfig(Config):
    LOG_LEVEL = logging.ERROR
    DEBUG = False
    TESTING = False


class DevelopmentConfig(Config):
    LOG_LEVEL = logging.DEBUG
    DEBUG = True
    TESTING = True
    TRAP_HTTP_EXCEPTIONS = True
