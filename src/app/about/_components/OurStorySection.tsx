import Image from "next/image";

const OurStorySection = () => {
  return (
    <section className="max-w-[1400px] m-auto py-16 md:py-24">
      <div className="px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mb-4 text-3xl font-bold">StyleCut-ийн Аялал</h2>
            <p className="mb-6 text-gray-600">
              2010 онд мастер үсчин Жэймс Уилсон үүсгэн байгуулсан StyleCut нь
              анх нэг сандалтай жижигхэн салон байдлаар үйл ажиллагаагаа
              эхэлсэн. Бидний зорилго энгийн байсан: хүн бүрт үнэ цэнтэй гэж
              мэдрэгдэх дулаан уур амьсгалд, өндөр чанартай үс арчилгааны
              үйлчилгээг хүргэх.
            </p>
            <p className="mb-6 text-gray-600">
              Цаг хугацааны явцад бид мэргэжлийн ур чадвартай баг бүрдүүлж, иж
              бүрэн үйлчилгээг үзүүлдэг салоны хэмжээнд хүрсэн ч бидний үндсэн
              үнэт зүйлс өөрчлөгдөөгүй. Сайн үйлчилгээ гэдэг нь зүгээр нэг
              үйлчилгээ бус — энэ бол өөртөө итгэх итгэлийг нэмэгдүүлж,
              өөрийнхөө шилдэг хувилбарыг харуулах боломж юм гэдэгт бид итгэдэг.
            </p>
            <p className="text-gray-600">
              Өнөөдөр StyleCut нь олон насны, янз бүрийн гаралтай үйлчлүүлэгчдэд
              зориулан, анхны өдрөөс хойш хадгалж ирсэн чанар болон үйлчилгээний
              тууштай сэтгэлгээгээрээ орон нутгийн үнэт зүйл болсон гэдэгтээ
              бахархдаг.
            </p>
          </div>
          <div className="relative h-[400px] overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Barbershop history"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
