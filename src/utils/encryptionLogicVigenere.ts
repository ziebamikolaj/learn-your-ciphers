import { VisualizationStep } from "../types/vigenereCipherVisualization";

export function encryptText(
  text: string,
  key: string
): {
  result: string;
  visualization: VisualizationStep[];
} {
  let result = "";
  let keyIndex = 0;
  const visualization: VisualizationStep[] = [];

  for (const char of text.toUpperCase()) {
    if (char.match(/[A-Z]/)) {
      const plainCharCode = char.charCodeAt(0) - 65;
      const keyChar = key[keyIndex % key.length].toUpperCase();
      const keyShift = keyChar.charCodeAt(0) - 65;
      const encryptedCharCode = (plainCharCode + keyShift) % 26;
      const encryptedChar = String.fromCharCode(encryptedCharCode + 65);
      result += encryptedChar;

      visualization.push({
        text: char,
        key: keyChar,
        result: encryptedChar,
        row: keyShift,
        col: plainCharCode,
      });
      keyIndex++;
    } else {
      result += char;
      visualization.push({
        text: char,
        key: "",
        result: char,
        row: -1,
        col: -1,
      });
    }
  }
  return { result, visualization };
}
export const decryptText = (ciphertext: string, keyword: string): { result: string; visualization: VisualizationStep[] } => {
  const result: string[] = [];
  const visualization: VisualizationStep[] = [];
  const repeatedKey = keyword.repeat(Math.ceil(ciphertext.length / keyword.length)).slice(0, ciphertext.length);

  for (let i = 0; i < ciphertext.length; i++) {
    const char = ciphertext[i].toUpperCase();
    const keyChar = repeatedKey[i].toUpperCase();

    if (char.match(/[A-Z]/)) {
      const charCode = char.charCodeAt(0) - 65;
      const keyCode = keyChar.charCodeAt(0) - 65;
      const decryptedCode = (charCode - keyCode + 26) % 26;
      const decryptedChar = String.fromCharCode(decryptedCode + 65);

      result.push(decryptedChar);
      visualization.push({
        text: char,
        key: keyChar,
        result: decryptedChar,
        row: keyCode,
        col: charCode,
      });
    } else {
      result.push(char);
      visualization.push({
        text: char,
        key: keyChar,
        result: char,
        row: -1,
        col: -1,
      });
    }
  }

  return { result: result.join(""), visualization };
};
