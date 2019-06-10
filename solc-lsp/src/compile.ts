"use strict";

// import * as solc from "solc";
const solc = require("solc");

export function compile(solidityStr: string, options: any) {

  if (options.logger === undefined) options.logger = console;

  const solcStandardInput = {
    language: "Solidity",
    sources: {
      inputfile: {
        content: solidityStr
      }
    },
    settings: {
      // Of the output produced, what part of it?
      outputSelection: {
        "*": {
          "": [ "ast" ]  // Just return the AST - nothing else
        }
      },
      optimizer: {
        enabled: false // Since we just want AST info, no optimizer please.
      }
    }
  };

  const result = solc.compile(JSON.stringify(solcStandardInput));
  return JSON.parse(result);
}
