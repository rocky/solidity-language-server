import * as path from "path";

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

import {
  commands, /* workspace, WorkspaceFolder, */
  ExtensionContext
} from "vscode";
import * as vscode from "vscode";

import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind
} from "vscode-languageclient";

import { compileActiveContract, gotoDefinition, getTypeDefinition } from "./commands";

let client: LanguageClient;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {


  const diagnosticsCollection = vscode.languages.createDiagnosticCollection("Solidity");
  context.subscriptions.push(diagnosticsCollection);

  /* FIXME: these are done on the client side but may eventually be done on the LSP server side
   */
  context.subscriptions.push(commands.registerCommand("solidity.compile", () => {
    compileActiveContract(diagnosticsCollection);
  }));

  context.subscriptions.push(commands.registerCommand("solidity.gotoDefinition", () => {
    gotoDefinition();
  }));

  context.subscriptions.push(commands.registerCommand("solidity.getTypeDefinition", () => {
    getTypeDefinition();
  }));

  context.subscriptions.push(commands.registerCommand("solidity.signatureHelp", () => {
    getTypeDefinition();
  }));

  // The server is implemented in node
  const serverModule = context.asAbsolutePath(
    path.join("server", "out", "server.js")
  );

  // The debug options for the server
  // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
  const debugOptions = { execArgv: ["-nolazy", "--inspect=6009"] };

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  const serverOptions: ServerOptions = {
    run: {
      module: serverModule,
      transport: TransportKind.ipc
    },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions
    }
  };

  // Options to control the language client
  const clientOptions: LanguageClientOptions = {
    // Register the server for solidity programs
    documentSelector: [
      { language: "solidity", scheme: "file" },
      { language: "solidity", scheme: "untitled" },
    ],
    synchronize: {
      // Synchronize the setting section 'solidity' to the server
      configurationSection: "solidity"
    }
  };

  client = new LanguageClient(
    "solidity",
    "Solidity Language Server",
    serverOptions,
    clientOptions);

  // Start the client. This will also launch the server
  client.start();

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "solidity-language-server" is now active!');

  // context.subscriptions.push(client);

}

// this method is called when your extension is deactivated
export function deactivate() {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
