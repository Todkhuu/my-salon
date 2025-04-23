import { model, Model, models, Schema } from "mongoose";
import { AppointmentStatusEnum } from "../constant";
import { AppointmentType } from "../utils/types";

const AppointmentSchema: Schema = new Schema<AppointmentType>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: false,
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
    paid: { type: Boolean, default: false, required: true },
    paymentMethod: {
      type: String,
      enum: ["Qpay"],
      required: true,
    },
    serviceIds: {
      type: [Schema.Types.ObjectId],
      ref: "Services",
      required: true,
    },
    price: { type: Number, required: true },
    username: { type: String, required: false, minlength: 2 },
    email: { type: String, required: false, match: /.+\@.+\..+/ },
    phone: { type: String, required: false, match: /^[0-9]{8}$/ },
  },
  { timestamps: true }
);

// ✨ Pre-save validation
AppointmentSchema.pre("save", function (next) {
  if (!this.userId) {
    if (!this.username || !this.email || !this.phone) {
      const error = new Error(
        "Зочин хэрэглэгч нэр, и-мэйл болон утасны дугаар заавал оруулах шаардлагатай."
      );
      return next(error);
    }
  }
  next();
});

export const AppointmentModel: Model<AppointmentType> =
  models["Appointments"] ||
  model<AppointmentType>("Appointments", AppointmentSchema);
