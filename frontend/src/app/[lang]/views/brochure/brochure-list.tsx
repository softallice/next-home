import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia, formatDate } from "@/lib/api-helpers";

interface Brochure {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    category: {
      data: {
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
  };
}

export default function PostList({
  data: brochures,
  children,
}: {
  data: Brochure[];
  children?: React.ReactNode;
}) {
  return (
    <section className="container p-6 mx-auto space-y-6 sm:space-y-12">
      <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {brochures.map((brochure) => {
          const imageUrl = getStrapiMedia(
            brochure.attributes.cover.data?.attributes.url
          );

          const category = brochure.attributes.category.data?.attributes;
          
          return (
            <Link
              href={`/brochure/${category?.slug}/${brochure.attributes.slug}`}
              key={brochure.id}
              className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-900 lg:w-[300px] xl:min-w-[375px] rounded-2xl overflow-hidden shadow-lg"
            >
              {imageUrl && (
                <Image
                  alt="presentation"
                  width="240"
                  height="240"
                  className="object-cover w-full h-44 "
                  src={imageUrl}
                />
              )}
              <div className="p-6 space-y-2 relative">
                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                  {brochure.attributes.title}
                </h3>

                <div className="flex justify-between items-center">
                  <span className="text-xs dark:text-gray-400">
                    {formatDate(brochure.attributes.publishedAt)}
                  </span>
                </div>
                <p className="py-4">{brochure.attributes.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
      {children && children}
    </section>
  );
}
