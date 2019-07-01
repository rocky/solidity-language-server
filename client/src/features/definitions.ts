/*
 This code is modeled off of
  vscode/extensions/typescript-language-features/src/features/definitions.ts
*/

import * as vscode from "vscode";
import { ISolidityServiceClient } from "../solidityService";
import * as typeConverters from "../utils/typeConverters";
import DefinitionProviderBase from "./definitionProviderBase";

export default class SolidityDefinitionProvider extends DefinitionProviderBase implements vscode.DefinitionProvider {
  constructor(
    client: ISolidityServiceClient
  ) {
    super(client);
  }

  public async provideDefinition(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): Promise<vscode.DefinitionLink[] | vscode.Definition | undefined> {
    const filepath = this.client.toOpenedFilePath(document);
    if (!filepath) {
      return undefined;
    }

    const args = typeConverters.Position.toFileLocationRequestArgs(filepath, position);

    /* FIXME: Start filling in code here replacing the below. */
    if (token || args) {
      return undefined;
    }
    return undefined;

    /*
    const response = await this.client.execute("definitionAndBoundSpan", args, token);
    if (response.type !== "response" || !response.body) {
      return undefined;
    }

    const span = response.body.textSpan ? typeConverters.Range.fromTextSpan(response.body.textSpan) : undefined;

    return response.body.definitions
      .map((location): vscode.DefinitionLink => {
        const target = typeConverters.Location.fromTextSpan(this.client.toResource(location.file), location);
        return {
          originSelectionRange: span,
          targetRange: target.range,
          targetUri: target.uri,
        };
      });
    */

    // return this.getSymbolLocations("definition", document, position, token);
  }
}

export function register(
  selector: vscode.DocumentSelector,
  client: ISolidityServiceClient,
) {
  return vscode.languages.registerDefinitionProvider(selector,
    new SolidityDefinitionProvider(client));
}
