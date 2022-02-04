import * as vscode from "vscode";
import * as commands from "./commands";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.concat(
    (commands as []).map((cmd) =>
      vscode.commands.registerCommand(
        `hilight.${Object.keys(cmd)[0]}`,
        Object.values(cmd)[0] as any
      )
    )
  );
}

export function deactivate() {}
