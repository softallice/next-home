import { getStrapiMedia } from "@/lib/api-helpers";
import Image from "next/image";


interface CoverProps {
    data: {
      id: string;
      attributes: {
        url: string;
        name: string;
        alternativeText: string;
      };
    };
}

interface IntroProps {
  title: string;
  description: string;
  slogan: string;
  cover: CoverProps
}

export default function IntroImage({ data }: { data: IntroProps }) {
  const imgUrl = getStrapiMedia(data.cover.data.attributes.url);
  return (
    <section className="dark:bg-black dark:text-gray-100">
      <div className="relative flex items-center justify-center mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 ">
          <div className="absolute inset-0">
            <Image
              src={imgUrl || ""}
              alt={data.cover.data.attributes.alternativeText || "none provided"}
              className="object-cover w-full h-full rounded-lg overflow-hidden"
              width={400}
              height={400}
            />
          </div>

          <div className="relative max-w-screen-xl mx-auto px-8 z-10 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">{data.title}</h1>
            <p className="text-lg md:text-xl mb-12">{data.description}</p>
          </div>
      </div>
    </section>
  );
}