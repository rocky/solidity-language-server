/* A placeholder for a hover provider for Solidity */

import * as vscode from "vscode";
import { LspManager } from "solc-lsp";
export function registerSolidityHover(lspMgr: LspManager) {
  vscode.languages.registerHoverProvider("solidity",
    {
      provideHover(document: vscode.TextDocument, position: vscode.Position,
        token: vscode.CancellationToken) {
        if (document.uri.fsPath in lspMgr.fileInfo) {
          const info = lspMgr.fileInfo[document.uri.fsPath];
          const staticInfo = info.staticInfo;
          const solcOffset = info.sourceMapping.offsetFromLineColPosition(position);
          const node = staticInfo.offsetToAstNode(solcOffset);
          let mess: string;
          if (node) {
            token;
            if (node.typeName && node.typeName.name) {
              mess = `${node.nodeType} node at ${node.src} has type ${node.typeName.name}`;
            } else if (node.typeDescriptions && node.typeDescriptions.typeString) {
              mess = `${node.nodeType} node at ${node.src} has is type description ${node.typeDescriptions.typeString}`;
            } else {
              mess = `node at ${node.src} is ${node.nodeType}`;
              // console.log(util.inspect(node));
            }
            return new vscode.Hover(mess);
          }
        }
        return undefined;
      }
    });
}
