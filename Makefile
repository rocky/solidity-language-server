.PHONY: check test all

#: "Build" this - really just an "npm install"
all:
	npm install

# Note: most things are just npm and the target name

#: Run tests
check:
	npm test

test: check

#: Compile typescript to javascript
build:
	tsc --build

#: clear out node_modules
clean:
	rm -fr node_modules client/node_modules server/node_modules
