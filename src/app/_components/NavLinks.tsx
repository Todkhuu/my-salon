import Link from "next/link";

export default function NavLinks() {
  return (
    <nav className="hidden gap-6 md:flex">
      <Link href="/services" className="text-sm font-medium hover:underline">
        Services
      </Link>
      <Link href="/staffs" className="text-sm font-medium hover:underline">
        Our Barbers
      </Link>
      <Link href="/about" className="text-sm font-medium hover:underline">
        About Us
      </Link>
      <Link href="/contact" className="text-sm font-medium hover:underline">
        Contact
      </Link>
    </nav>
  );
}
