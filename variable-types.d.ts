import { Types } from "mongoose";
import AgoraTypes from "./index";

export namespace VariableTypes {
  export type VariableValueTypes =
    | { type: "number"; number: number; sourceURL: string; createdAt: Date }
    | {
        type: "equation";
        equation: EquationTypes;
        sourceURL?: string;
        createdAt: Date;
      };

  export type PopulatedVariableValueTypes =
    | {
        type: "number";
        number: number;
        sourceURL: string;
        createdAt: Date;
        finalValue: number;
      }
    | {
        type: "equation";
        equation: EquationTypes;
        sourceURL: string;
        createdAt: Date;
        finalValue: number;
      };

  export type EquationTypes = Array<
    | {
        type: "operator";
        operator: "(" | ")" | "+" | "-" | "/" | "*" | "^";
      }
    | { type: "number"; number: number }
    | { type: "variable"; variableID: Types.ObjectId }
  >;
}

export default VariableTypes;
