import { formatDate, getStrapiMedia } from '@/lib/api-helpers';
import { postRenderer } from '@/lib/post-renderer';
import Image from 'next/image';

interface Notification {
    id: number;
    attributes: {
        title: string;
        description: string;
        slug: string;
        cover: {
            data: {
                attributes: {
                    url: string;
                };
            };
        };
        blocks: any[];
        publishedAt: string;
    };
}

export default function Post({ data }: { data: Notification }) {
    const { title, description, publishedAt, cover } = data.attributes;
    const imageUrl = getStrapiMedia(cover.data?.attributes.url);
    
    return (
        <article className="space-y-8 dark:bg-black dark:text-gray-50">
            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt="article cover image"
                    width={400}
                    height={400}
                    className="w-full h-96 object-cover rounded-lg"
                />
            )}
            <div className="space-y-6">
                <h1 className="leading-tight text-5xl font-bold ">{title}</h1>
                <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-400">
                    <div className="flex items-center md:space-x-2">
                        <p className="text-md dark:text-violet-400">
                            {formatDate(publishedAt)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="dark:text-gray-100">
                <p>{description}</p>

                {data.attributes.blocks.map((section: any, index: number) => postRenderer(section, index))}
            </div>
        </article>
    );
}
