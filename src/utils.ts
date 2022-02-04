import * as vscode from "vscode";

export interface HiLight {
  start: number;
  end: number;
  decoration: vscode.TextEditorDecorationType;
}

export const getDecorationType = () => {
  const config = vscode.workspace.getConfiguration("hiLight");
  const backgroundColor =
    (config.get("backgroundColor") as string) || "#2c698c";

  return vscode.window.createTextEditorDecorationType({
    isWholeLine: true,
    backgroundColor,
  });
};

export const updateDecorations = (
  decorationType: vscode.TextEditorDecorationType,
  decorationsArray: vscode.Range[] | readonly vscode.DecorationOptions[],
  openEditors: vscode.TextEditor[]
) => {
  if (!decorationType || !openEditors) {
    return;
  }

  openEditors.forEach((ed: vscode.TextEditor) => {
    ed.setDecorations(decorationType, decorationsArray);
  });
};

export const findHilightIndex = (hilights: HiLight[]): number | undefined => {
  const active = vscode.window.activeTextEditor?.selection.active;

  if (!active) {
    return undefined;
  }

  const index = hilights.findIndex(
    (dec) =>
      dec.start == active.line ||
      dec.end == active.line ||
      (dec.start < active.line && active.line < dec.end)
  );

  return index;
};
