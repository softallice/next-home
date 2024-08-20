import { formatDate, getStrapiMedia } from '@/lib/api-helpers';
import Link from "next/link";
import Image from 'next/image';

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
    media: Media;
}

interface FeaturesProps {
  data: {
    features: Feature[];
  }
}

function Feature({ title, description, media }: Feature) {
  const imageUrl = getStrapiMedia(media.data?.attributes.url);
  return (
    <div className="flex flex-col items-center p-4">
      {imageUrl && (
          <Image
              src={imageUrl}
              alt={media.data.attributes.alternativeText || "article cover image"}
              width={200}
              height={200}
              className="h-48 object-fit rounded-lg"
          />
      )}
      <h3 className="my-3 text-3xl font-semibold">{title}</h3>
      <div className="space-y-1 leading-tight my-6">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function FeaturesRowGroup({ data }: FeaturesProps) {
  return (
    <section className="dark:bg-black dark:text-gray-100 m:py-12 lg:py-24">
      <div className="container mx-auto my-6 grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.features.map((feature: Feature, index: number) => (
          <Feature key={index} {...feature} />
        ))}
      </div>
    </section>
  );
}
