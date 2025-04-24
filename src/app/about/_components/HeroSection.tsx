import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative bg-black py-20 text-white md:py-32">
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/placeholder.svg?height=600&width=1200"
          alt="Barbershop interior"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="relative z-10 px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Бидний Түүх
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-200 md:text-xl">
            2010 оноос хойш гайхалтай гоо сайхны үйлчилгээ үзүүлж, өөртөө итгэх
            итгэлийг бий болгосоор ирлээ
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
