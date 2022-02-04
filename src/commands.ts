import * as vscode from "vscode";
import {
  HiLight,
  findHilightIndex,
  getDecorationType,
  updateDecorations,
} from "./utils";

const hilights: { [key: string]: HiLight[] } = {};

const changeColor = () => {};

const hiLight = (arg: any) => {
  let openEditors: vscode.TextEditor[] = [
    vscode.window.activeTextEditor as vscode.TextEditor,
  ];

  let decorationsArray: vscode.Range[] = [];
  let decorationType: vscode.TextEditorDecorationType;

  const textEditor = vscode.window.activeTextEditor;
  if (textEditor) {
    decorationType = getDecorationType();

    const range = new vscode.Range(
      new vscode.Position(textEditor.selection.start.line, 0),
      new vscode.Position(textEditor.selection.end.line, 0)
    );

    const hilight: HiLight = {
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

      updateDecorations(decorationType, decorationsArray, openEditors);
    } catch (error) {
      console.error(
        "Error from ' window.onDidChangeActiveTextEditor' -->",
        error
      );
    }

    // updateDecorations(decorationType, decorationsArray, openEditors);
  } else {
    console.error("Oops!");
  }
};

const byeAll = (arg: any) => {
  if (hilights[arg.path].length) {
    hilights[arg.path].forEach((dec) => {
      dec.decoration.dispose();
    });
    hilights[arg.path] = [];
  }
};

const byeLight = (arg: any) => {
  if (hilights[arg.path].length) {
    const index = findHilightIndex(hilights[arg.path]);
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
