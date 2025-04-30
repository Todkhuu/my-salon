import { AppointmentStatusEnum } from "@/server/constant";
import { connectMongoDb } from "@/server/database/db";
import { AppointmentModel } from "@/server/models";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { appointmentId, cancellationReason, reasonType } = await req.json();

    await connectMongoDb();
    const appointment = await AppointmentModel.findById(appointmentId);

    if (!appointment) {
      return NextResponse.json(
        { message: "Уулзалт олдсонгүй" },
        { status: 404 }
      );
    }

    const datePart = appointment.date.toISOString().split("T")[0];
    const appointmentDate = new Date(`${datePart}T${appointment.time}:00`);

    const now = new Date();

    appointmentDate.setHours(appointmentDate.getHours() + 8 * 60 * 60 * 1000);
    const hoursDifference =
      (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    const calculatedCancellationFee =
      hoursDifference <= 24 ? appointment.price * 0.5 : 0;

    appointment.cancellationReason = cancellationReason;
    appointment.reasonType = reasonType;
    appointment.status = AppointmentStatusEnum.CANCELED;
    appointment.cancellationFee = calculatedCancellationFee;

    await appointment.save();

    return NextResponse.json(
      {
        message: "Уулзалтыг амжилттай цуцаллаа",
        cancellationFee: calculatedCancellationFee,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Уулзалт цуцлах үед алдаа гарлаа:", error);
    return NextResponse.json(
      { message: "Уулзалтыг цуцлах үед алдаа гарлаа" },
      { status: 500 }
    );
  }
}
