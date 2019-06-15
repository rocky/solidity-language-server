import * as path from "path";
import {
  window, /*workspace,*/
  Diagnostic,
  DiagnosticCollection,
  Range,
  Selection,
  Uri
} from "vscode";
import * as solcLsp from "solc-lsp";
import { solcErrToDiagnostic } from "./diagnostics";

const lspMgr = new solcLsp.LspManager();

function selectionToRange(selection: Selection): Range {
  // FIXME put into a function
  return new Range(
    selection.start.line + 1,
    selection.start.character,
    selection.end.line + 1,
    selection.end.character
  );
}


export function compileActiveContract(diagnosticCollection: DiagnosticCollection) {

  const editor = window.activeTextEditor;
  if (!editor) {
    return; // We need something open
  }

  const fileName = editor.document.fileName;
  if (path.extname(fileName) !== ".sol") {
    window.showWarningMessage(`${fileName} not a solidity file (*.sol)`);
    return;
  }

  /*
  // Check if is folder, if not stop we need to output to a bin folder on rootPath
  if (workspace.rootPath === undefined) {
  window.showWarningMessage("Please open a folder in Visual Studio Code as a workspace");
  return;
  }
  */

  const uri = Uri.file(fileName);
  const compiled = lspMgr.compile(editor.document.getText(), fileName, {});
  diagnosticCollection.delete(uri);
  if (compiled.errors) {
    const diagnostics: Array<Diagnostic> = [];
    for (const compiledError of compiled.errors) {
      const diagnostic = solcErrToDiagnostic(compiledError);
      diagnostics.push(diagnostic);
      console.log(compiledError.formattedMessage);
    }
    diagnosticCollection.set(uri, diagnostics);
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
    window.showWarningMessage(`${fileName} not a solidity file (*.sol)`);
    return;
  }

  const lineBreakOffsets = lspMgr.fileInfo[fileName].sourceMapping.lineBreaks;
  const range = selectionToRange(editor.selection);
  const srcPosition = solcLsp.rangeToLspPosition(range, lineBreakOffsets);
  const defNode = lspMgr.gotoDefinition(fileName, srcPosition);
  if (defNode) {
    const defPosition = defNode.src;
    window.showInformationMessage(`Definition at ${defPosition}`);
  }
}

export function getTypeDefinition() {
  const editor = window.activeTextEditor;
  if (!editor) {
    return; // We need something open
  }

  const fileName = editor.document.fileName;
  if (path.extname(fileName) !== ".sol") {
    window.showWarningMessage(`${fileName} not a solidity file (*.sol)`);
    return;
  }

  const lineBreakOffsets = lspMgr.fileInfo[fileName].sourceMapping.lineBreaks;
  const range = selectionToRange(editor.selection);
  const srcPosition = solcLsp.rangeToLspPosition(range, lineBreakOffsets);
  const selectedNode = lspMgr.gotoTypeDefinition(fileName, srcPosition);
  if (selectedNode) {
    const typeName = selectedNode.typeDescriptions.typeString;
    const mess = "name" in selectedNode ?
      `${selectedNode.name} has type: ${typeName}` :
      ` type: ${typeName}`;
    window.showInformationMessage(mess);
  }
}
