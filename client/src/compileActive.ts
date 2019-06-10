"use strict";
import { window, workspace, DiagnosticCollection } from "vscode";
import * as path from "path";

export function compileActiveContract(diagnosticCollection: DiagnosticCollection): Promise<Array<string>> {
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

    console.log("compileActiveContract to be completed later...");
    return;

}
