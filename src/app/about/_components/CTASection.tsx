import { Button } from "@/components/ui/button";
import Link from "next/link";

export const CTASection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[1400px] m-auto px-4 md:px-6">
        <div className="rounded-lg bg-gradient-to-r from-gray-900 to-black p-8 text-center text-white md:p-12">
          <h2 className="mb-4 text-3xl font-bold">Шинэ дүр төрхөд бэлэн үү?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-200">
            StyleCut-ийн ялгааг өнөөдөр мэдрээрэй. Манай мэргэжлийн хамт олон
            танд хамгийн сайхан төрхийг мэдрүүлэхэд бэлэн.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/services">
              <Button className="bg-white text-black hover:bg-gray-100">
                Үйлчилгээнүүдтэй танилцах
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
