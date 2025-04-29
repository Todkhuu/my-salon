import Link from "next/link";

export const LoginFooter = () => {
  return (
    <div className="mt-4 text-center text-sm text-gray-500">
      Үргэлжлүүлэн оролцохдоо та манай{" "}
      <Link href="/terms" className="underline">
        Үйлчилгээний нөхцөл
      </Link>{" "}
      болон{" "}
      <Link href="/privacy" className="underline">
        Нууцлалын бодлого
      </Link>
      -д зөвшөөрч байна.
    </div>
  );
};
