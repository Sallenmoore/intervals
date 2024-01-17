
.PHONY: all build run clean deepclean test tests fulltests debug

all: clean build run debug

include .env
export

APP_NAME?=intervals
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