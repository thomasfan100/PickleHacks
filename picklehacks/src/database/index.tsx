

import mongoose, { ConnectOptions } from "mongoose";
import { UserModel } from "./users/users.model";
let database: mongoose.Connection;
export const connect = () => {
  // add your own uri below
  const uri = "mongodb+srv://henrievjen:hepegreen@cluster0-v6q0g.mongodb.net/test?retryWrites=true&w=majority";
  if (database) {
    return;
  }
  let op: ConnectOptions = {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };
  mongoose.connect(uri, op);
  database = mongoose.connection;
  database.once("open", async () => {
    console.log("Connected to database");
  });
  database.on("error", () => {
    console.log("Error connecting to database");
  });
};
export const disconnect = () => {
  if (!database) {
    return;
  }
  mongoose.disconnect();
};