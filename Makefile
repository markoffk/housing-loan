traefik-up:
	docker-compose -f docker-compose-traefik.yml up -d
traefik-down:
	docker-compose -f docker-compose-traefik.yml down

up:
	LOCAL_USER_ID=$$(id -u) LOCAL_GROUP_ID=$$(id -g) docker-compose up -d $(cmd)

up-and-rebuild:
	make build
	make up

stop:
	docker-compose stop

down:
	docker-compose down $(cmd)

down-and-remove-images:
	docker-compose down -v --rmi=all $(cmd)

ps:
	docker-compose ps $(cmd)

.PHONY: build
build:
	LOCAL_USER_ID=$$(id -u) LOCAL_GROUP_ID=$$(id -g) docker-compose build --pull $(cmd)

start-dev:
	docker exec --user $$(id -u) -it node.api.housing-loan.docker npm run start:dev

.PHONY: all test clean
test:
	docker exec --user $$(id -u) -it node.api.housing-loan.docker npm run test $(cmd)
	docker exec --user $$(id -u) -it node.api.housing-loan.docker npm run test:e2e $(cmd)

shell:
	docker exec --user $$(id -u) -it node.api.housing-loan.docker /bin/bash

npm:
	docker exec --user $$(id -u) -it node.api.housing-loan.docker npm $(cmd)

install:
	make npm cmd="install $(cmd)"

uninstall:
	make npm cmd="uninstall $(cmd)"

code-format:
	make npm cmd="run lint"
	make npm cmd="run format"

db-migration-generate:
	make npm cmd="run typeorm:migration:generate Migration"

db-migration-run:
	make npm cmd="run typeorm:migration:run"

db-populate:
	make console cmd=app:populate-db

console:
	make npm cmd="run console $(cmd)"

# DEMO commands

demo-up-and-init:
	make demo-up cmd="--build"
	make demo-npm cmd="run typeorm:migration:run"
	make demo-db-populate

demo-up:
	docker-compose -f docker-compose-demo.yml up -d $(cmd)

demo-down:
	docker-compose -f docker-compose-demo.yml down $(cmd)

demo-down-and-remove-images:
	docker-compose -f docker-compose-demo.yml down -v --rmi=all $(cmd)

demo-ps:
	docker-compose -f docker-compose-demo.yml ps $(cmd)

demo-start:
	docker exec -it node.api.housing-loan-demo.docker npm run start

demo-test:
	docker exec -it node.api.housing-loan-demo.docker npm run test $(cmd)
	docker exec -it node.api.housing-loan-demo.docker npm run test:e2e $(cmd)

demo-shell:
	docker exec -it node.api.housing-loan-demo.docker /bin/bash

demo-npm:
	docker exec -it node.api.housing-loan-demo.docker npm $(cmd)

demo-db-populate:
	make demo-console cmd=app:populate-db

demo-console:
	make demo-npm cmd="run console $(cmd)"
