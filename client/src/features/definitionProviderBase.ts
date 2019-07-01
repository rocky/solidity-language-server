/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from "vscode";
import { ISolidityServiceClient } from "../solidityService";
import * as typeConverters from "../utils/typeConverters";


export default class SolidtyDefinitionProviderBase {
  constructor(
    protected readonly client: ISolidityServiceClient
  ) { }

  protected async getSymbolLocations(
    definitionType: "definition" | "typeDefinition",
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): Promise<vscode.Location[] | undefined> {
    const file = this.client.toOpenedFilePath(document);
    if (!file) {
      return undefined;
    }

    const args = typeConverters.Position.toFileLocationRequestArgs(file, position);
    const response = await this.client.execute(definitionType, args, token);
    if (response.type !== "response" || !response.body) {
      return undefined;
    }

    return response.body.map(location =>
      typeConverters.Location.fromTextSpan(this.client.toResource(location.file), location));
  }
}
