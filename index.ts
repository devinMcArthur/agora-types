import * as mongoose from "mongoose";

namespace AgoraTypes {
  // Page Namespace
  export namespace Page {
    export namespace Documents {
      export interface Page extends mongoose.Document {
        title: string;
        slug: string;
        paragraphVersionConnections: AgoraTypes.Paragraph.Documents.Paragraph["_id"][];
      }

      export interface PagePopulated extends Page {
        currentParagraph: AgoraTypes.Paragraph.Documents.ParagraphPopulated;
        referencedCount: number;
      }

      export interface PagePopulatedFull
        extends AgoraTypes.Page.Documents.PagePopulated {
        relatedPages: AgoraTypes.Page.Documents.PagePopulated[];
      }
    }
  }

  // Paragraph Namespace
  export namespace Paragraph {
    export namespace Documents {
      export interface Paragraph extends mongoose.Document {
        pageID: AgoraTypes.Page.Documents.Page["_id"];
        statements:
          | AgoraTypes.Statement.Documents.Statement["_id"][]
          | AgoraTypes.Statement.Documents.StatementPopulated[];
        version: number;
        mostRecent: boolean;
      }

      export interface ParagraphPopulated extends mongoose.Document {
        statements: AgoraTypes.Statement.Documents.StatementPopulated[];
      }
    }
  }

  // Statement Namespace
  export namespace Statement {
    export namespace Documents {
      export interface Statement extends mongoose.Document {
        pageID: AgoraTypes.Page.Documents.Page["_id"];
        versions: {
          stringArray: {
            string?: string;
            styles: AgoraTypes.Statement.Types.StyleTypes;
          }[];
          createdAt: Date;
        }[];
        sources: {
          pages:
            | AgoraTypes.Page.Documents.Page["_id"][]
            | AgoraTypes.Page.Documents.Page[];
          urls: string[];
        };
        questions:
          | AgoraTypes.Question.Documents.Question["_id"][]
          | AgoraTypes.Question.Documents.Question[];
      }

      export interface StatementPopulated
        extends AgoraTypes.Statement.Documents.Statement {
        versions: {
          stringArray: {
            string?: string;
            styles: AgoraTypes.Statement.Types.PopulatedStyleTypes;
          }[];
          createdAt: Date;
        }[];
        sources: {
          pages: AgoraTypes.Page.Documents.Page[];
          urls: string[];
        };
        questions: AgoraTypes.Question.Documents.Question[];
      }

      export interface StatementPopulatedFull
        extends AgoraTypes.Statement.Documents.StatementPopulated {
        relatedPages: AgoraTypes.Page.Documents.PagePopulated[];
      }
    }

    export namespace Types {
      export type InternalMentionStyleType = {
        type: "mention";
        variant: "internal";
        value: {
          pageID: AgoraTypes.Page.Documents.Page["_id"];
        };
      };

      export type ExternalMentionStyleType = {
        type: "mention";
        variant: "external";
        value: {
          url: string;
        };
      };

      export type VariableStyleType = {
        type: "variable";
        value: {
          variableID: AgoraTypes.Variable.Documents.Variable["_id"];
        };
      };

      export type QuoteStyleType = {
        type: "quote";
        value: {
          statementID: AgoraTypes.Statement.Documents.Statement["_id"];
        };
      };

      export type BoldStyleType = {
        type: "bold";
      };

      export type StyleTypes = Array<
        | InternalMentionStyleType
        | ExternalMentionStyleType
        | VariableStyleType
        | QuoteStyleType
        | BoldStyleType
      >;

      export type PopulatedInternalMentionStyleType = InternalMentionStyleType & {
        value: {
          pageID: AgoraTypes.Page.Documents.Page["_id"];
          page: AgoraTypes.Page.Documents.Page;
        };
      };

      export type PopulatedVariableStyleType = VariableStyleType & {
        value: {
          variable: AgoraTypes.Variable.Documents.VariablePopulated;
          variableID: AgoraTypes.Variable.Documents.Variable["_id"];
        };
      };

      export type PopulatedQuoteStyleType = QuoteStyleType & {
        value: {
          page: AgoraTypes.Page.Documents.Page;
          statement: AgoraTypes.Statement.Documents.StatementPopulated;
          statementID: AgoraTypes.Statement.Documents.Statement["_id"];
        };
      };

      export type PopulatedStyleTypes = Array<
        | PopulatedInternalMentionStyleType
        | ExternalMentionStyleType
        | PopulatedVariableStyleType
        | PopulatedQuoteStyleType
        | BoldStyleType
      >;
    }
  }

  // Question Namespace
  export namespace Question {
    export namespace Documents {
      export interface Question extends mongoose.Document {
        question: string;
      }

      export interface QuestionPopulated
        extends AgoraTypes.Question.Documents.Question {
        relatedPages: AgoraTypes.Page.Documents.PagePopulated[];
        referencedCount: number;
      }
    }
  }

  // Variable Namespace
  export namespace Variable {
    export namespace Documents {
      export interface Variable extends mongoose.Document {
        title: string;
        versions: Array<AgoraTypes.Variable.Types.VariableValueTypes>;
      }

      export interface VariablePopulated
        extends AgoraTypes.Variable.Documents.Variable {
        versions: Array<AgoraTypes.Variable.Types.PopulatedVariableValueTypes>;
      }

      export interface VariablePopulatedFull
        extends AgoraTypes.Variable.Documents.VariablePopulated {
        relatedPages: AgoraTypes.Page.Documents.PagePopulated[];
      }
    }

    export namespace Types {
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
        | { type: "variable"; variableID: mongoose.Types.ObjectId }
      >;
    }
  }

  // PageConnection namespace
  export namespace PageConnection {
    export namespace Documents {
      export interface PageConnection extends mongoose.Document {
        referencedPageID: AgoraTypes.Page.Documents.Page["_id"];
        referrerPageID: AgoraTypes.Page.Documents.Page["_id"];
        statementID: AgoraTypes.Statement.Documents.Statement["_id"];
      }
    }
  }

  export namespace QuestionPageConnection {
    export namespace Documents {
      export interface QuestionPageConnection extends mongoose.Document {
        referrerPageID: AgoraTypes.Page.Documents.Page["_id"];
        questionID: AgoraTypes.Question.Documents.Question["_id"];
        statementID: AgoraTypes.Statement.Documents.Statement["_id"];
      }
    }
  }

  export namespace VariablePageConnection {
    export namespace Documents {
      export interface VariablePageConnection extends mongoose.Document {
        referrerPageID: AgoraTypes.Page.Documents.Page["_id"];
        variableID: AgoraTypes.Variable.Documents.Variable["_id"];
        statementID: AgoraTypes.Statement.Documents.Statement["_id"];
      }
    }
  }
}

export default AgoraTypes;
