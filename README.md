Solidity Language Server
========================

**Warning: This project is in the alpha stage of development. Use at your own risk.**

This project aims to be a prototype Solidity Language Server using Microsoft's
[Language Server Protocol (LSP)][lsp]. It includes a minimal client
for demonstration.

Right now thow most of the work is being done on the client side via a common library
and will be moved to the server side later.

# Running

Though the solidity-language-server is built to work with many IDEs and editors, we currently use VSCode to test the solidity-language-server.

To run with VSCode, you'll need a [recent VSCode version][vscode] installed.

Next, you'll need to run the VSCode extension (for this step, you'll need a recent node installed):

```
git clone https://github.com/codechain-io/solidity-language-server.git
cd solidity-language-server
npm install
code .
```

VSCode will open into the solidity-language-server project. From here, click the Debug button on the left-hand side (a bug with a line through it). Next, click the green triangle at the top. This will launch a new instance of VSCode with the solidity-language-server plugin enabled.

# Contributing
Always feel free to help out! Whether it's filing bugs and feature requests or working on some of the open issues, we welcome your contributions.

In general, all contributions will be done using [GitHub’s pull request model][pr]. That is, you’ll fork our project, perform the work in a topic branch and then submit a pull request against our master branch.

[lsp]: https://github.com/Microsoft/language-server-protocol
[solc]: https://github.com/ethereum/solc-js
[vscode]: https://code.visualstudio.com/download
[pr]: https://help.github.com/articles/about-pull-requests/
