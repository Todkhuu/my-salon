import { UserModel } from "../models/user.model";

export const isExistingUser = async (email: string) => {
  return await UserModel.findOne({ email });
};
