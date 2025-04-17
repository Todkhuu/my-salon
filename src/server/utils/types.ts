import { Schema } from "mongoose";
import {
  AppointmentStatusEnum,
  CategoryEnum,
  StaffRoleEnum,
} from "../constant";

export interface UserType {
  _id: Schema.Types.ObjectId;
  email: string;
  password: string;
  phoneNumber: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StaffType {
  _id: Schema.Types.ObjectId;
  email: string;
  password: string;
  role: StaffRoleEnum;
  name: string;
  experience: number;
  about: string;
  rating: number;
  image: string;
  category: CategoryEnum;
  availableTimes: Date[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AppointmentType {
  _id: Schema.Types.ObjectId;
  userId: UserType;
  staffId: StaffType;
  date: Date;
  status: AppointmentStatusEnum;
  paid: boolean;
  serviceIds: ServiceType;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FeedbackType {
  _id: Schema.Types.ObjectId;
  userId: UserType;
  staffId: StaffType;
  rating: number;
  createdAt?: Date;
}

export interface ServiceType {
  _id: Schema.Types.ObjectId;
  name: string;
  price: number;
  category: CategoryEnum; // HAIR, NAILS
  duration: number; // minutes
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
