
.PHONY: all build run clean deepclean test tests fulltests debug

all: test clean run

include .env
export

APP_NAME?=app
CONTAINERS=$$(sudo docker ps -a -q)

###### BUILD and RUN #######
build:
	sudo docker compose build --no-cache

run: 
	sudo docker compose up --build -d

###### CLEANING #######
APPCONTAINERS=$$(sudo docker ps --filter "name=${APP_NAME}" -q)
clean:
	sudo docker ps -a
	-sudo docker compose down --remove-orphans
	-sudo docker kill $(APPCONTAINERS)

###### TESTING #######

debug: run
	sudo docker compose logs -f --since=5m &

fulltests: clean build debug tests

tests: debug
	sudo docker compose exec -it $(APP_NAME) python -m pytest --cov=app -rx -l -x --log-level=DEBUG --no-cov-on-fail

RUNTEST?=""
test: build
	sudo docker compose exec -it $(APP_NAME) python -m pytest --log-level=INFO -s -rx -l -x -k $(RUNTEST)