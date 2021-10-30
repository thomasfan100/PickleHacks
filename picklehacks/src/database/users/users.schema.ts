import { Schema } from "mongoose";
import { findOneOrCreate } from "./users.statics";

const UserSchema = new Schema({
  id: Number,
  time: String,
  message: String,
});

UserSchema.statics.findOneOrCreate = findOneOrCreate;

export default UserSchema;