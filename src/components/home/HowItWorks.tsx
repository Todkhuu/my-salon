import { Button } from "../ui/button";
import Link from "next/link";

const HowItWorks = () => {
  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="max-w-[1400px] m-auto px-4 md:px-6">
        <h2 className="mb-8 text-center text-3xl font-bold">How It Works</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
              <span className="text-xl font-bold">1</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Choose a Service</h3>
            <p className="text-gray-500">
              Browse our range of professional services
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
              <span className="text-xl font-bold">2</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Select Your Barber</h3>
            <p className="text-gray-500">
              Pick your preferred stylist and time slot
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
              <span className="text-xl font-bold">3</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Confirm & Pay</h3>
            <p className="text-gray-500">
              Secure your appointment with easy payment
            </p>
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <Link href="/services">
            <Button className="bg-black text-white hover:bg-gray-800">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
