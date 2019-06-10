import * as path from "path";
import { window, /*workspace,*/
         Diagnostic,
         DiagnosticCollection, Uri } from "vscode";
import { compile } from "solc-lsp";
import { solcErrToDiagnostic } from "./diagnostics";

export function compileActiveContract(diagnosticCollection: DiagnosticCollection) {

  const editor = window.activeTextEditor;
  if (!editor) {
    return; // We need something open
  }

  const fileName = editor.document.fileName;
  if (path.extname(fileName) !== ".sol") {
    window.showWarningMessage(`{filename} not a solidity file (*.sol)`);
    return;
  }

  /*
  // Check if is folder, if not stop we need to output to a bin folder on rootPath
  if (workspace.rootPath === undefined) {
  window.showWarningMessage("Please open a folder in Visual Studio Code as a workspace");
  return;
  }
  */

  const compiled = compile(editor.document.getText(), fileName, {});
  if (compiled.errors) {
    const uri = Uri.file(fileName);
    diagnosticCollection.clear();
    const diagnostics: Array<Diagnostic> = [];
    for (const compiledError of compiled.errors) {
      const diagnostic = solcErrToDiagnostic(compiledError);
      diagnostics.push(diagnostic);
      console.log(compiledError.formattedMessage);
    }
    diagnosticCollection.set(uri, diagnostics);
  } else {
    console.log("compileActiveContract suceeded");
  }
  return;

}

export function gotoDefinition() {
    const editor = window.activeTextEditor;
    if (!editor) {
        return; // We need something open
    }

    const fileName = editor.document.fileName;
    if (path.extname(fileName) !== ".sol") {
        window.showWarningMessage(`{filename} not a solidity file (*.sol)`);
        return;
    }

    console.log("gotoDefinition to be filled in");
}
