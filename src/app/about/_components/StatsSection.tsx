export const StatsSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[1400px] m-auto px-4 md:px-6">
        <div className="grid gap-8 rounded-lg bg-black p-8 text-white md:grid-cols-4">
          <div className="text-center">
            <p className="text-4xl font-bold">12+</p>
            <p className="mt-2">Жилийн туршлагатай</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold">15k+</p>
            <p className="mt-2">Сэтгэл хангалуун үйлчлүүлэгч</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold">8</p>
            <p className="mt-2">Мэргэшсэн стилист</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold">20+</p>
            <p className="mt-2">Үйлчилгээний төрөл</p>
          </div>
        </div>
      </div>
    </section>
  );
};
