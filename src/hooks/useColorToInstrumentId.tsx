import { Type } from "../types/layer.tsx";

export const ChangeColorToInstrumentId = (color: string) => {
  switch (color) {
    case "black":
      return 0;
    case "red":
      return 1;
    case "blue":
      return 2;
    case "yellow":
      return 3;
    case "green":
      return 4;
    case "orange":
      return 5;
    case "lightblue":
      return 6;
    case "purple":
      return 7;
    default:
      return 0;
  }
};

export const ChangeColorToInstrumentName = (color: string, type: Type) => {
  switch (color) {
    case "black":
      return type === Type.Line ? "piano" : "kick";
    case "red":
      return type === Type.Line ? "violin" : "snare";
    case "blue":
      return type === Type.Line ? "bass" : "hi hat1";
    case "yellow":
      return type === Type.Line ? "flute" : "clap";
    case "green":
      return type === Type.Line ? "synth1" : "hi hat2";
    case "orange":
      return type === Type.Line ? "xlylo" : "tom";
    case "lightblue":
      return type === Type.Line ? "synth2" : "snap";
    case "purple":
      return type === Type.Line ? "picopico" : "cymbal";
    default:
      return "piano";
  }
}
