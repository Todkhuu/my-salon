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
    name: { type: String },
    experience: { type: Number },
    about: { type: String },
    rating: { type: Number },
    image: { type: String },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
    },
    profession: {
      type: String,
      enum: Object.values(ProfessionEnum),
    },
    services: {
      type: [Schema.Types.ObjectId],
      ref: "Services",
    },
    availableTimes: { type: [Date] },
    phone: { type: String },
    location: { type: String },
    instagram: { type: String },
    facebook: { type: String },
    gallery: { type: [String] },
    // clientReviews: {type: [Schema.Types.ObjectId], ref: "Reviews"},
  },
  { timestamps: true }
);

export const StaffModel: Model<StaffType> =
  models["Staff"] || model<StaffType>("Staff", StaffSchema);
