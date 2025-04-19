import Link from "next/link";

export const LoginFooter = () => {
  return (
    <div className="mt-4 text-center text-sm text-gray-500">
      By continuing, you agree to our{" "}
      <Link href="/terms" className="underline">
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link href="/privacy" className="underline">
        Privacy Policy
      </Link>
      .
    </div>
  );
};
