import Image from "next/image";

export const HeroSection = () => {
  return (
    <section className="relative bg-black py-16 text-white md:py-24">
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/placeholder.svg?height=400&width=1200"
          alt="Contact us"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className=" relative z-10 px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Холбогдоорой
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-200">
            Асуух зүйл байна уу эсвэл цаг авахыг хүсэж байна уу? Бид танд
            туслахад үргэлж бэлэн.
          </p>
        </div>
      </div>
    </section>
  );
};
