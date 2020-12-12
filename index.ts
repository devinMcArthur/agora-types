import * as mongoose from "mongoose";

namespace AgoraTypes {
  // Page Namespace
  export namespace Page {
    export namespace Documents {
      export interface Page extends mongoose.Document {
        title: string;
        slug: string;
        paragraphVersionConnections: Array<{
          paragraphID: mongoose.Types.ObjectId;
        }>;
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
        pageID: mongoose.Types.ObjectId;
        sentences:
          | AgoraTypes.Sentence.Documents.SentencePopulated[]
          | mongoose.Types.ObjectId[];
        version: number;
        mostRecent: boolean;
      }

      export interface ParagraphPopulated extends mongoose.Document {
        sentences: AgoraTypes.Sentence.Documents.SentencePopulated[];
      }
    }
  }

  // Sentence Namespace
  export namespace Sentence {
    export namespace Documents {
      export interface Sentence {
        pageID: mongoose.Types.ObjectId;
        versions: {
          stringArray: {
            string?: string;
            styles: AgoraTypes.Sentence.Types.StyleTypes;
          }[];
          createdAt: Date;
        }[];
        sources: {
          pages: AgoraTypes.Page.Documents.Page[] | mongoose.Types.ObjectId[];
          urls: string[];
        };
        questions:
          | AgoraTypes.Question.Documents.Question[]
          | mongoose.Types.ObjectId[];
      }

      export interface SentencePopulated
        extends AgoraTypes.Sentence.Documents.Sentence {
        versions: {
          stringArray: {
            string?: string;
            styles: AgoraTypes.Sentence.Types.PopulatedStyleTypes;
          }[];
          createdAt: Date;
        }[];
        sources: {
          pages: AgoraTypes.Page.Documents.Page[];
          urls: string[];
        };
        questions: AgoraTypes.Question.Documents.Question[];
      }

      export interface SentencePopulatedFull
        extends AgoraTypes.Sentence.Documents.SentencePopulated {
        relatedPages: AgoraTypes.Page.Documents.PagePopulated[];
      }
    }

    export namespace Types {
      export type InternalMentionStyleType = {
        type: "mention";
        variant: "internal";
        value: {
          pageID: mongoose.Types.ObjectId;
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
          variableID: mongoose.Types.ObjectId;
        };
      };

      export type QuoteStyleType = {
        type: "quote";
        value: {
          sentenceID: mongoose.Types.ObjectId;
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
          pageID: mongoose.Types.ObjectId;
          page: AgoraTypes.Page.Documents.Page;
        };
      };

      export type PopulatedVariableStyleType = VariableStyleType & {
        value: {
          variable: AgoraTypes.Variable.Documents.VariablePopulated;
          variableID: mongoose.Types.ObjectId;
        };
      };

      export type PopulatedQuoteStyleType = QuoteStyleType & {
        value: {
          page: AgoraTypes.Page.Documents.Page;
          sentence: AgoraTypes.Sentence.Documents.SentencePopulated;
          sentenceID: mongoose.Types.ObjectId;
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
      export interface PageConnection {
        referencedPageID: mongoose.Types.ObjectId;
        referrerPageID: mongoose.Types.ObjectId;
        sentenceID: mongoose.Types.ObjectId;
      }
    }
  }

  export namespace QuestionPageConnection {
    export namespace Documents {
      export interface QuestionPageConnection {
        referrerPageID: mongoose.Types.ObjectId;
        questionID: mongoose.Types.ObjectId;
        sentenceID: mongoose.Types.ObjectId;
      }
    }
  }

  export namespace VariablePageConnection {
    export namespace Documents {
      export interface VariablePageConnection {
        referrerPageID: mongoose.Types.ObjectId;
        variableID: mongoose.Types.ObjectId;
        sentenceID: mongoose.Types.ObjectId;
      }
    }
  }
}

export default AgoraTypes;
