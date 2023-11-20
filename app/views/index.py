from flask import Blueprint, render_template, request, session
from autonomous import log

index_page = Blueprint("index", __name__)


@index_page.route("/", methods=("GET",))
def index():
    if request.form:
        session.update(request.form)
    return render_template("index.html")


# @auth_required
# def protected():
#     if request.form:
#         session.update(request.json)
#     context = {"user": AutoAuth.current_user, **request.json}
#     return render_template("index.html", **context)
