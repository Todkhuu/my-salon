import { model, Model, models, Schema } from "mongoose";
import { UserType } from "../utils/types";

const UserSchema: Schema = new Schema<UserType>(
  {
    email: { type: String, unique: true },
    password: { type: String, required: true, select: false },
    phoneNumber: { type: String },
    username: { type: String, required: true },
    favoriteStaff: { type: [Schema.Types.ObjectId], ref: "Staff" },
  },
  { timestamps: true }
);

export const UserModel: Model<UserType> =
  models["Users"] || model<UserType>("Users", UserSchema);
