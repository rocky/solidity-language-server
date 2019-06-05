"use strict";
import * as path from "path";

/** From Juan's code
import { compileAllContracts } from "./compiler/compileAll";
import { compileActiveContract, initDiagnosticCollection } from "./compiler/compileActive";
**/

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

/* From Juan's code
import { commands } from "vscode";
*/

import { workspace, WorkspaceFolder,
         DiagnosticCollection, ExtensionContext } from "vscode";

import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    TransportKind
} from "vscode-languageclient";

let client: LanguageClient;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {


    // tslint:disable-next-line:prefer-const
    let diagnosticCollection: DiagnosticCollection;
    context.subscriptions.push(diagnosticCollection);

    /** From Juan's code;
    initDiagnosticCollection(diagnosticCollection);

    context.subscriptions.push(commands.registerCommand("solidity.compile.active", () => {
        compileActiveContract();
    }));

    context.subscriptions.push(commands.registerCommand("solidity.compile", () => {
        compileAllContracts(diagnosticCollection);
    }));
    **/

    // The server is implemented in node
    const serverModule = context.asAbsolutePath(
       path.join("out", "src", "server", "languageServerIpc.js")
    );

    // The debug options for the server
    // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
    const debugOptions = { execArgv: ["-nolazy", "--inspect=6009"] };

    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    const serverOptions: ServerOptions = {
        run: { module: serverModule, transport: TransportKind.ipc },
        debug: {
            module: serverModule,
            _transport: TransportKind.ipc,
            get transport() {
                return this._transport;
            },
            set transport(value) {
                this._transport = value;
            },
            options: debugOptions
        },
    };

    // Options to control the language client
    const clientOptions: LanguageClientOptions = { // Register the server for solicity programs
        documentSelector: [
            { language: "solidity", scheme: "file" },
            { language: "solidity", scheme: "untitled" },
        ],
        synchronize: {
            // Synchronize the setting section 'solidity' to the server
            configurationSection: "solidity"
        }
    };

    const ws: WorkspaceFolder[] | undefined = workspace.workspaceFolders;

    if (ws) {
        client = new LanguageClient(
            "solidity",
            "Solidity Language Server",
            serverOptions,
            clientOptions);

        // Start the client. This will also launch the server
        client.start();
    }

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    debugger;
    console.log('Congratulations, your extension "solidity-language-server" is now active!');

    // context.subscriptions.push(client);

}

// this method is called when your extension is deactivated
export function deactivate(): Thenable<void> | undefined {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
