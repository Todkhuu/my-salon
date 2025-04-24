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
    phone: { type: String, required: true },
    location: { type: String, required: true },
    instagram: { type: String, required: true },
    facebook: { type: String, required: true },
    gallery: { type: [String] },
    // clientReviews: {type: [Schema.Types.ObjectId], ref: "Reviews"},
  },
  { timestamps: true }
);

export const StaffModel: Model<StaffType> =
  models["Staff"] || model<StaffType>("Staff", StaffSchema);
