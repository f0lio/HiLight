"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const utils_1 = require("./utils");
const hilights = {};
const changeColor = () => { };
const hiLight = (arg) => {
    let openEditors = [
        vscode.window.activeTextEditor,
    ];
    let decorationsArray = [];
    let decorationType;
    const textEditor = vscode.window.activeTextEditor;
    if (textEditor) {
        decorationType = (0, utils_1.getDecorationType)();
        const range = new vscode.Range(new vscode.Position(textEditor.selection.start.line, 0), new vscode.Position(textEditor.selection.end.line, 0));
        const hilight = {
            start: range.start.line,
            end: range.end.line,
            decoration: decorationType,
        };
        decorationsArray.push(range);
        if (!hilights[arg.path]) {
            hilights[arg.path] = [];
        }
        hilights[arg.path].push(hilight);
        try {
            openEditors = vscode.window.visibleTextEditors.filter((editor) => {
                return editor.document.uri.path === arg.path;
            });
            (0, utils_1.updateDecorations)(decorationType, decorationsArray, openEditors);
        }
        catch (error) {
            console.error("Error from ' window.onDidChangeActiveTextEditor' -->", error);
        }
        // updateDecorations(decorationType, decorationsArray, openEditors);
    }
    else {
        console.error("Oops!");
    }
};
const byeAll = (arg) => {
    if (hilights[arg.path].length) {
        hilights[arg.path].forEach((dec) => {
            dec.decoration.dispose();
        });
        hilights[arg.path] = [];
    }
};
const byeLight = (arg) => {
    if (hilights[arg.path].length) {
        const index = (0, utils_1.findHilightIndex)(hilights[arg.path]);
        if (typeof index !== "undefined") {
            hilights[arg.path][index].decoration.dispose();
            hilights[arg.path].splice(index, 1);
        }
    }
};
module.exports = [
    { hi: hiLight },
    { bye: byeLight },
    { byeAll: byeAll },
    { changeColor: changeColor },
];
//# sourceMappingURL=commands.js.map