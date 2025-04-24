import Link from "next/link";

export default function NavLinks() {
  return (
    <nav className="hidden gap-6 md:flex">
      <Link href="/services" className="text-sm font-medium hover:underline">
        Үйлчилгээнүүд
      </Link>
      <Link href="/staffs" className="text-sm font-medium hover:underline">
        Манай ажилчид
      </Link>
      <Link href="/about" className="text-sm font-medium hover:underline">
        Бидний тухай
      </Link>
      <Link href="/contact" className="text-sm font-medium hover:underline">
        Холбоо барих
      </Link>
    </nav>
  );
}
