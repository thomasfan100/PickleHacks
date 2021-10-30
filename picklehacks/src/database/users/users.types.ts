// @ts-nocheck

import { Document, Model } from "mongoose";
export interface IUser {
  id: number;
  time: string;
  message: string;
}
export interface IUserDocument extends IUser, Document {}
export interface IUserModel extends Model<IUserDocument> {}