import * as mongoose from "mongoose";

export declare namespace Page {
  export namespace Documents {
    export interface Page extends mongoose.Document {
      title: string;
      slug: string;
      paragraphVersionConnections: Array<{
        paragraphID: mongoose.Types.ObjectId;
      }>;
    }

    export interface PagePopulated extends Page {
      currentParagraph: {};
    }
  }
}
