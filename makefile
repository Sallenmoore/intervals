
.PHONY: all build run clean deepclean test tests fulltests debug

all: test clean run

include .env
export

APP_NAME?=app
CONTAINERS=$$(sudo docker ps -a -q)

###### BUILD and RUN #######
build:
	docker compose build --no-cache

run: 
	docker compose up --build -d

###### CLEANING #######
APPCONTAINERS=$$(sudo docker ps --filter "name=${APP_NAME}" -q)
clean:
	sudo docker ps -a
	-docker compose down --remove-orphans
	-sudo docker kill $(APPCONTAINERS)

cleanall: 
	sudo docker kill $$(sudo docker ps -a -q)

deepclean: clean
	-sudo docker kill $(CONTAINERS)
	-sudo docker container prune -f
	-sudo docker image prune -f
	-sudo docker network prune -f
	-sudo docker system prune -a -f --volumes

###### TESTING #######

debug: run
	docker compose logs -f --since=5m &

fulltests: clean build debug tests

tests: debug
	docker compose exec -it $(APP_NAME) python -m pytest --cov=app -rx -l -x --log-level=DEBUG --no-cov-on-fail

RUNTEST?=""
test: build
	docker compose exec -it $(APP_NAME) python -m pytest --log-level=INFO -s -rx -l -x -k $(RUNTEST)