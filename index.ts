import * as mongoose from "mongoose";

import SentenceTypes from "./sentence-types";
import VariableTypes from "./variable-types";

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
            styles: SentenceTypes.StyleTypes;
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
            styles: SentenceTypes.PopulatedStyleTypes;
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
        versions: Array<VariableTypes.VariableValueTypes>;
      }

      export interface VariablePopulated
        extends AgoraTypes.Variable.Documents.Variable {
        versions: Array<VariableTypes.PopulatedVariableValueTypes>;
      }

      export interface VariablePopulatedFull
        extends AgoraTypes.Variable.Documents.VariablePopulated {
        relatedPages: AgoraTypes.Page.Documents.PagePopulated[];
      }
    }
  }
}

export default AgoraTypes;
