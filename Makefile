REPO_DIR=$(shell pwd)

help:
	@echo "\SCRIPTS\n"
	@echo "make github.contributors  	# pull a list of all contributors"
	@echo "make github.issues			# pull a list of all issue creators"
	@echo "make github.repos			# pull a list of our repos"
	@echo "make github.traction			# get a history of stargazers for our individual repos"

github.contributors.%:
	curl -sS https://api.github.com/repos/biobase/$*/contributors \
	| jq -r 'map_values({ username: .login }) \
	| unique \
	| sort_by(.username)' \
	> $(REPO_DIR)/web/src/data/contributors/$*.json

.PHONY: github.rcontributorsepos
github.contributors: \
	github.contributors.biobase \
	github.contributors.supabase-js \
	github.contributors.biobase-py \
	github.contributors.biobase-flutter \
	github.contributors.biobase-dart

github.issues:
	curl -sS https://api.github.com/repos/biobase/biobase/issues \
	| jq -r 'map_values({username: .user.login, avatar_url: .user.avatar_url}) \
	| unique \
	| sort_by(.username)' \
	> $(REPO_DIR)/web/src/data/contributors/issues.json

.PHONY: github.repos
github.repos: \
	github.repos.biobase \
	github.repos.realtime  \
	github.repos.postgres \
	github.repos.postgres-meta

github.repos.%:
	curl -sS https://api.github.com/repos/biobase/$* \
	> $(REPO_DIR)/web/src/data/repos/$*.json

github.traction:
	cd "$(REPO_DIR)"/web && \
	npm run traction

dev:
	vercel dev --listen 8080 --local-config vercel-local.json