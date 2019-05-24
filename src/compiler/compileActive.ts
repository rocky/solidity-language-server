"use strict";
import { window, workspace, DiagnosticCollection } from "vscode";
import * as path from "path";
// import { compile } from "./compiler";
// import { ContractCollection } from "./model/contractsCollection";
// import { initialiseProject } from "./projectService";
// import { formatPath } from "./util";


let diagnosticCollection: DiagnosticCollection;

export function initDiagnosticCollection(diagnostics: DiagnosticCollection) {
    diagnosticCollection = diagnostics;

    // Squelch a diagnostiCollection not used message.
    // FIXME: Remove when we are more complete.
    if (false) console.log(diagnosticCollection);
}

export function compileActiveContract(): Promise<Array<string>> {
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

    // const contractsCollection = new ContractCollection();
    // const contractCode = editor.document.getText();
    // const contractPath = editor.document.fileName;

    // const packageDefaultDependenciesDirectory = vscode.workspace.getConfiguration("solidity").get<string>("packageDefaultDependenciesDirectory");
    // const packageDefaultDependenciesContractsDirectory = vscode.workspace.getConfiguration("solidity").get<string>("packageDefaultDependenciesContractsDirectory");

    // const project = initialiseProject(vscode.workspace.rootPath, packageDefaultDependenciesDirectory, packageDefaultDependenciesContractsDirectory);
    // const contract = contractsCollection.addContractAndResolveImports(contractPath, contractCode, project);
    // const packagesPath = formatPath(project.packagesDir);

    // return compile(contractsCollection.getContractsForCompilation(),
    //         diagnosticCollection,
    //         project.projectPackage.build_dir,
    //         project.projectPackage.absoluletPath,
    //         null,
    //         packagesPath,
    //         contract.absolutePath);
}
