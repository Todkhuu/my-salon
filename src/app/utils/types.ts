import {
  AppointmentStatusEnum,
  ProfessionEnum,
  StaffRoleEnum,
} from "../../server/constant/enums";

export interface UserType {
  _id: string;
  email: string;
  password: string;
  phoneNumber?: string;
  username?: string;
  favoriteStaff?: StaffType[];
  favoriteServices?: ServiceType[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface StaffType {
  _id: string;
  email: string;
  password: string;
  role: StaffRoleEnum;
  name: string;
  experience: number;
  about: string;
  rating: number;
  image: string;
  category: CategoryType;
  profession: ProfessionEnum;
  services: ServiceType[];
  availableTimes: Date[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AppointmentType {
  _id: string;
  userId: UserType;
  staffId: StaffType;
  date: Date;
  status: AppointmentStatusEnum;
  paid: boolean;
  paymentMethod: string;
  serviceIds: ServiceType;
  price: number;
  username?: string;
  email?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FeedbackType {
  _id: string;
  userId: UserType;
  staffId: StaffType;
  rating: number;
  createdAt?: Date;
}

export interface ServiceType {
  _id: string;
  name: string;
  price: number;
  category: CategoryType;
  duration: number; // minutes
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryType {
  _id: string;
  name: string;
  image: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
