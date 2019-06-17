Solidity Language Server
========================

**This project is in the alpha stage of development.**

This project aims to be a prototype of Solidity Language Server using Microsoft's
[Language Server Protocol (LSP)][lsp]. It includes a minimal client
for demonstration.

Initialy the work is being done on the client side using a common npm library which will be moved to the server side later.

If you are looking for something for ready day-to-day use, I recommend mention the [solidity plugin](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity) written by Juan Blanco.

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

# Acknowledgements

There have been several complete rewrites of this code. The project name comes from the now defunct [kodebox project](https://marketplace.visualstudio.com/items?itemName=kodebox.solidity-language-server). However very little of that code is in current use. Instead, I went back to the Microsoft tutorial on this and picked up the simple code LSP Example from https://github.com/microsoft/vscode-extension-samples/tree/master/lsp-sample.  But right now, since everything is client-side, there isn't much code from that there either. I just have the client-server architecture which I can plug into at a later time.

Finally, at times I've been guided by Juan Blanco's plugin mentioned above.



# Contributing
Always feel free to help out!

[lsp]: https://github.com/Microsoft/language-server-protocol
[solc]: https://github.com/ethereum/solc-js
[vscode]: https://code.visualstudio.com/download
