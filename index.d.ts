/// <reference types="mongoose" />

declare module "agora" {
  import mongoose = require("mongoose");

  interface IPage extends mongoose.Document {
    title: string;
    slug: string;
    paragraphVersionConnections: Array<{
      paragraphID: mongoose.Types.ObjectId;
    }>;
  }
}
