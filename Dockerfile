FROM python:3.12

RUN apt-get update
RUN apt-get install --no-install-recommends -y build-essential curl git

# Install the vendor applications/configurations
COPY ./vendor/dart-sass /var/dart-sass
ENV PATH="/var/dart-sass:${PATH}"
COPY ./vendor/gunicorn.conf.py /var/gunicorn.conf.py

# install dependencies
RUN pip install --no-cache-dir --upgrade pip wheel
COPY ./requirements.txt /var/tmp/requirements.txt
RUN pip install -r /var/tmp/requirements.txt
RUN pip freeze > /var/tmp/requirements-freeze.txt