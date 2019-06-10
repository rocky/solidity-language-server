"use strict";
import * as path from "path";
import { window, workspace, DiagnosticCollection } from "vscode";
// import { compile } from "solc-lsp/out";

export function compileActiveContract(diagnosticCollection: DiagnosticCollection) {
    const editor = window.activeTextEditor;

    if (!editor) {
        return; // We need something open
    }

    if (path.extname(editor.document.fileName) !== ".sol") {
        window.showWarningMessage("This not a solidity file (*.sol)");
        return;
    }

    // Check if is folder, if not stop we need to output to a bin folder on rootPath
    if (workspace.rootPath === undefined) {
        window.showWarningMessage("Please open a folder in Visual Studio Code as a workspace");
        return;
    }

    // const compiled = compile(editor.document.getText(), {});
    // if (!compiled.contracts) {
    //   if (compiled.errors) {
    //     for (const compiledError of compiled.errors) {
    //       console.log(compiledError.formattedMessage);
    //     }
    //   }
    // }

    console.log("compileActiveContract to be completed later...");
    return;

}
