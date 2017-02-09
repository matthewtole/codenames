ENV_VARS=PORT=0 \
	NODE_ENV=test

test: lint
	@ $(ENV_VARS) npm test

lint:
	@ find . -name "*.js" \
		-not -path "./node_modules/*" \
		-not -path "./dist/*" \
		-not -path "./coverage/*" -print0 | \
		xargs -0 ./node_modules/.bin/eslint
open-cov:
	open coverage/lcov-report/index.html

test-travis: lint
	@ $(ENV_VARS) npm test

	@ node node_modules/.bin/istanbul check-coverage \
		--statements 100 --functions 100 --branches 100 --lines 100

.PHONY: test lint open-cov test-travis
