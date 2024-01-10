build-dev:
	docker build -t react-app .

build-local:
	docker build \
	-t react-app-local:local \
	--build-arg CADDYFILE=Caddyfile.local \
	--build-arg BASE_URL=http://localhost:5000/api \
	-f Dockerfile.local .

build-prod:
	docker build \
	-t react-app-prod:prod \
	--build-arg CADDYFILE=Caddyfile.prod \
	--build-arg BASE_URL=https://fittracker5000.com/api \
	-f Dockerfile.prod .