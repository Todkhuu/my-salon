import { model, Model, models, Schema } from "mongoose";
import { ServiceType } from "../utils";
import { CategoryEnum } from "../constant";

const ServiceSchema: Schema = new Schema<ServiceType>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: Object.values(CategoryEnum),
      required: true,
    },
    duration: { type: Number, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export const ServiceModel: Model<ServiceType> =
  models["Services"] || model<ServiceType>("Services", ServiceSchema);
