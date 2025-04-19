import { model, Model, models, Schema } from "mongoose";
import { StaffType } from "../utils/types";
import { ProfessionEnum, StaffRoleEnum } from "../constant";

const StaffSchema: Schema = new Schema<StaffType>(
  {
    email: { type: String, unique: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: Object.values(StaffRoleEnum),
      default: StaffRoleEnum.STAFF,
      required: true,
    },
    name: { type: String, required: true },
    experience: { type: Number, required: true },
    about: { type: String, required: true },
    rating: { type: Number, required: true },
    image: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    profession: {
      type: String,
      enum: Object.values(ProfessionEnum),
      required: true,
    },
    services: {
      type: [Schema.Types.ObjectId],
      ref: "Services",
      required: true,
    },
    availableTimes: { type: [Date], required: true },
  },
  { timestamps: true }
);

export const StaffModel: Model<StaffType> =
  models["Staffs"] || model<StaffType>("Staffs", StaffSchema);
