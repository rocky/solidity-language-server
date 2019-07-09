#!/bin/sh
# Things done after an "npm install"

# Make sure a vscode compatibile the package.json:
#    "engines { "vscode": ... }
# is installed
node ./node_modules/vscode/bin/install

# VSCode barfs silently if C bindings are used. So
# we move that out of the way, and the Pure JS code is used instead.
BINDINGS_FILE=node_modules/keccak/bindings.js
if [ -f $BINDINGS_FILE ] ; then
    mv $BINDINGS_FILE ${BINDINGS_FILE}-save
fi
