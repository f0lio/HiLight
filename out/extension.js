"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const commands = require("./commands");
function activate(context) {
    context.subscriptions.concat(commands.map((cmd) => vscode.commands.registerCommand(`hilight.${Object.keys(cmd)[0]}`, Object.values(cmd)[0])));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map