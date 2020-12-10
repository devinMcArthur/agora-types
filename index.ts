import * as mongoose from "mongoose";

namespace Page {
  export interface IPage extends mongoose.Document {
    title: string;
    slug: string;
    paragraphVersionConnections: Array<{
      paragraphID: mongoose.Types.ObjectId;
    }>;
  }
}

export default Page;
