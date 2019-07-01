/* A placeholder for a hover provider for Solidity */

import * as vscode from "vscode";
import * as util from "util";
import { LspManager } from "solc-lsp";
export function registerSolidityHover(lspMgr: LspManager) {
  vscode.languages.registerHoverProvider("solidity",
    {
      provideHover(document: vscode.TextDocument, position: vscode.Position,
        token: vscode.CancellationToken) {
        if (document.uri.fsPath in lspMgr.fileInfo) {
          /* FIXME: look up postion in lspMgr */
          const mess = `I am a hover for ${document}, ${util.inspect(position)}, ${util.inspect(token)}`;
          return new vscode.Hover(mess);
        } else {
          return undefined;
        }
      }
    });
}
