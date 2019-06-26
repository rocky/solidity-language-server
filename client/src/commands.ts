import * as path from "path";
import {
  window, /*workspace,*/
  Diagnostic,
  DiagnosticCollection,
  Range,
  Selection,
  Position,
  Uri
} from "vscode";

const lspManager = require("../node_modules/solc-lsp/out/lspManager");
import { solcErrToDiagnostic } from "./diagnostics";

const lspMgr = new lspManager.LspManager();

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

  const sm = lspMgr.fileInfo[fileName].sourceMapping;
  const range = selectionToRange(editor.selection);
  const defNode = lspMgr.gotoDefinition(fileName, range);
  if (defNode) {
    const defPosition = defNode.src;
    const defRange = sm.srcToLineColumnRange(defPosition);

    // Debug information.
    window.showInformationMessage(`Definition at solc offset + length: ${defPosition}`);
    window.showInformationMessage(`Definition starts at line ${defRange.start.line} char ${defRange.start.character} to line ${defRange.end.line} char ${defRange.end.character}`);

    /* Update editor position.
       Selections are 0-based, even though the editor reports 1-based. */
    const pos = new Position(defRange.start.line - 1, defRange.start.character - 1);
    editor.selection = new Selection(pos, pos);
  } else {
    window.showInformationMessage(`No definition found for ${range.start.line} char ${range.start.character} to line ${range.end.line} char ${range.end.character}`)
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

  const range = selectionToRange(editor.selection);
  const selectedNode = lspMgr.gotoTypeDefinition(fileName, range);
  if (selectedNode) {
    const typeName = selectedNode.typeDescriptions.typeString;
    const mess = "name" in selectedNode ?
      `${selectedNode.name} has type: ${typeName}` :
      ` type: ${typeName}`;
    window.showInformationMessage(mess);
  }
}
