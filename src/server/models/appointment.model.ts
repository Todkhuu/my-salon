import { model, Model, models, Schema } from "mongoose";
import { AppointmentStatusEnum } from "../constant";
import { AppointmentType } from "../utils/types";

const AppointmentSchema: Schema = new Schema<AppointmentType>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    staffId: {
      type: Schema.Types.ObjectId,
      ref: "Staffs",
      required: true,
    },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: Object.values(AppointmentStatusEnum),
      default: AppointmentStatusEnum.PENDING,
      required: true,
    },
    paid: { type: Boolean, required: true },
    serviceIds: {
      type: [Schema.Types.ObjectId],
      ref: "Services",
      required: true,
    },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export const AppointmentModel: Model<AppointmentType> =
  models["Appointments"] ||
  model<AppointmentType>("Appointments", AppointmentSchema);
