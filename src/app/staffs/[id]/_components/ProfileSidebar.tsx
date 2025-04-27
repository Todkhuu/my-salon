import { StaffType } from "@/app/utils/types";
import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const ProfileSidebar = ({ staff }: { staff: StaffType }) => {
  return (
    <div className="md:col-span-1">
      <div className="sticky top-8 space-y-6">
        <div className="overflow-hidden rounded-lg">
          <Image
            src={staff?.image || "/placeholder.svg"}
            alt={staff.name}
            width={400}
            height={500}
            className="w-full object-cover"
          />
        </div>
        <div className="space-y-4 rounded-lg border p-4">
          <h2 className="text-xl font-bold">{staff?.name}</h2>
          <p className="text-gray-500">{staff?.profession}</p>

          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{staff?.rating}</span>
            <span className="text-gray-500">(staff.reviews reviews)</span>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 text-gray-500" />
              {/* <span className="text-sm">{staff.availability}</span> */}
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-gray-500" />
              <span className="text-sm">{staff?.location}</span>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 text-gray-500" />
              <span className="text-sm">{staff?.phone}</span>
            </div>
            <div className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 text-gray-500" />
              <span className="text-sm">{staff.email}</span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Link
              href={`https://instagram.com/${staff.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href={`https://${staff.facebook}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
