build-dev:
	cd frontend && $(MAKE) build-dev
	cd backend && $(MAKE) build

run-dev:
	docker-compose -f docker-compose-dev.yml up


build-local:
	cd frontend && $(MAKE) build-local
	cd backend && $(MAKE) build

run-local:
	ENV=local docker-compose -f docker-compose-prod.yml up


build-prod:
	cd frontend && $(MAKE) build-prod
	cd backend && $(MAKE) build

run-prod:
	ENV=prod docker-compose -f docker-compose-prod.yml up

SSH_STRING:=root@167.172.137.134

ssh:
	ssh $(SSH_STRING)

copy-files:
	scp -r ./* $(SSH_STRING):/root/