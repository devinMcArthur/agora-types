import * as mongoose from "mongoose";

import AgoraTypes from "./index";

declare namespace SentenceTypes {
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

export = SentenceTypes;
