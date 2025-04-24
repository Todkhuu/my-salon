import Link from "next/link";

export default function Breadcrumbs() {
  return (
    <div className="mb-8">
      <Link href="/" className="text-sm text-gray-500 hover:underline">
        Home
      </Link>
      /
      <Link href="/services" className="text-sm text-gray-500 hover:underline">
        Services
      </Link>
      /
      <Link href="/barbers" className="text-sm text-gray-500 hover:underline">
        Barbers
      </Link>
      /<span className="text-sm font-medium"> Booking</span>
    </div>
  );
}
