"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findHilightIndex = exports.updateDecorations = exports.getDecorationType = void 0;
const vscode = require("vscode");
const getDecorationType = () => {
    const config = vscode.workspace.getConfiguration("hiLight");
    const backgroundColor = config.get("backgroundColor") || "#2c698c";
    return vscode.window.createTextEditorDecorationType({
        isWholeLine: true,
        backgroundColor,
    });
};
exports.getDecorationType = getDecorationType;
const updateDecorations = (decorationType, decorationsArray, openEditors) => {
    if (!decorationType || !openEditors) {
        return;
    }
    openEditors.forEach((ed) => {
        ed.setDecorations(decorationType, decorationsArray);
    });
};
exports.updateDecorations = updateDecorations;
const findHilightIndex = (hilights) => {
    const active = vscode.window.activeTextEditor?.selection.active;
    if (!active) {
        return undefined;
    }
    const index = hilights.findIndex((dec) => dec.start == active.line ||
        dec.end == active.line ||
        (dec.start < active.line && active.line < dec.end));
    return index;
};
exports.findHilightIndex = findHilightIndex;
//# sourceMappingURL=utils.js.map