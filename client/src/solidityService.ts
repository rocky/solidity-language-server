/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from "vscode";
import * as Proto from "./protocol";
import { SolidityServiceConfiguration } from "./utils/configuration";
import Logger from "./utils/logger";

export namespace ServerResponse {

  export class Cancelled {
    public readonly type = "cancelled";

    constructor(
      public readonly reason: string
    ) { }
  }

  export const NoContent = new class { readonly type = "noContent"; };

  export type Response<T extends Proto.Response> = T | Cancelled | typeof NoContent;
}

export interface SolidityRequestTypes {
  "definition": [Proto.FileLocationRequestArgs, Proto.DefinitionResponse];
  "typeDefinition": [Proto.FileLocationRequestArgs, Proto.TypeDefinitionResponse];
}

export interface ISolidityServiceClient {
  /**
   * Convert a path to a resource.
   */
  toResource(filepath: string): vscode.Uri;

  /**
   * Tries to ensure that a vscode document is open on the TS server.
   *
   * Returns the normalized path.
   */
  toOpenedFilePath(document: vscode.TextDocument): string | undefined;

  readonly onProjectLanguageServiceStateChanged: vscode.Event<Proto.ProjectLanguageServiceStateEventBody>;
  readonly onDidBeginInstallTypings: vscode.Event<Proto.BeginInstallTypesEventBody>;
  readonly onDidEndInstallTypings: vscode.Event<Proto.EndInstallTypesEventBody>;
  readonly onTypesInstallerInitializationFailed: vscode.Event<Proto.TypesInstallerInitializationFailedEventBody>;

  readonly configuration: SolidityServiceConfiguration;
  readonly logger: Logger;

  execute<K extends keyof SolidityRequestTypes>(
    command: K,
    args: SolidityRequestTypes[K][0],
    token: vscode.CancellationToken,
    lowPriority?: boolean
  ): Promise<ServerResponse.Response<SolidityRequestTypes[K][1]>>;

  executeWithoutWaitingForResponse(command: "open", args: Proto.OpenRequestArgs): void;
  executeWithoutWaitingForResponse(command: "close", args: Proto.FileRequestArgs): void;
  executeWithoutWaitingForResponse(command: "change", args: Proto.ChangeRequestArgs): void;
  executeWithoutWaitingForResponse(command: "updateOpen", args: Proto.UpdateOpenRequestArgs): void;
  executeWithoutWaitingForResponse(command: "compilerOptionsForInferredProjects", args: Proto.SetCompilerOptionsForInferredProjectsArgs): void;
  executeWithoutWaitingForResponse(command: "reloadProjects", args: null): void;

  executeAsync(command: "geterr", args: Proto.GeterrRequestArgs, token: vscode.CancellationToken): Promise<ServerResponse.Response<Proto.Response>>;

  /**
   * Cancel on going geterr requests and re-queue them after `f` has been evaluated.
   */
  interruptGetErr<R>(f: () => R): R;
}
