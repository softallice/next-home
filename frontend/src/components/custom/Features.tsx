import { formatDate, getStrapiMedia } from '@/lib/api-helpers';
import Link from "next/link";
import Image from 'next/image';
interface FeaturesProps {
  data: {
    heading: string;
    description: string;
    feature: Feature[];
  };
}

interface MediaAttributes {
  url: string; // 이미지의 URL 경로
  alternativeText: string | null; // 대체 텍스트 또는 null
  caption: string | null; // 캡션 또는 null
  width: number; // 이미지의 너비
  height: number; // 이미지의 높이
}

interface MediaData {
  id: number; // 미디어의 고유 ID
  attributes: MediaAttributes; // 미디어의 속성
}

interface Media {
  data: MediaData; // 미디어 데이터
}

interface Feature {
  id: string;
  title: string;
  description: string;
  showLink: boolean;
  newTab: boolean;
  url: string;
  text: string;
  media: Media;
}

function Feature({ title, description, showLink, newTab, url, text, media }: Feature) {
  const imageUrl = getStrapiMedia(media.data.attributes.url);
  return (
    <div className="flex flex-col items-center p-4">
      {imageUrl && (
          <Image
              src={imageUrl}
              alt="article cover image"
              width={200}
              height={200}
              className="h-48 object-fit rounded-lg"
          />
      )}
      <h3 className="my-3 text-3xl font-semibold">{title}</h3>
      <div className="space-y-1 leading-tight my-6">
        <p>{description}</p>
      </div>
      {showLink && url && text && (
        <div>
          <Link
            href={url}
            target={newTab ? "_blank" : "_self"}
            className="inline-block px-4 py-2 mt-4 text-sm font-semibold text-white transition duration-200 ease-in-out bg-violet-500 rounded-lg hover:bg-violet-600"
          >
            {text}
          </Link>
        </div>
      )}
    </div>
  );
}

export default function Features({ data }: FeaturesProps) {
  return (
    <section className="dark:bg-black dark:text-gray-100 m:py-12 lg:py-24">
      <div className="container mx-auto py-4 space-y-2 text-center">
        <h2 className="text-5xl font-bold">{data.heading}</h2>
        <p className="dark:text-gray-400">{data.description}</p>
      </div>
      <div className="container mx-auto my-6 grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.feature.map((feature: Feature, index: number) => (
          <Feature key={index} {...feature} />
        ))}
      </div>
    </section>
  );
}
