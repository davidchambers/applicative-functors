ESLINT = node_modules/.bin/eslint --config node_modules/sanctuary-style/eslint-es6.json --env es6 --env node
MOCHA = node_modules/.bin/mocha
NPM = npm

SRC = $(shell find . -name '*.js' -not -path './node_modules/*' -not -path './test/*' | sort)
TEST = $(shell find test -name '*.js' | sort)


.PHONY: lint
lint:
	$(ESLINT) -- $(SRC)
	$(ESLINT) --env mocha --rule 'brace-style: [off]' --rule 'max-len: [off]' -- $(TEST)


.PHONY: setup
setup:
	$(NPM) install


.PHONY: test
test:
	$(MOCHA) --harmony_destructuring -- $(TEST)
