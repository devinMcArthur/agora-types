import * as mongoose from "mongoose";

export interface IPage extends mongoose.Document {
  title: string;
  slug: string;
  paragraphVersionConnections: Array<{
    paragraphID: mongoose.Types.ObjectId;
  }>;
}
