import Link from "next/link";

interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
    disclosures: {
      data: Array<{}>;
    };
  };
}

interface Disclosure {
  id: number;
  attributes: {
    title: string;
    slug: string;
  };
}

function selectedFilter(current: string, selected: string) {
  return current === selected
    ? "px-3 py-1 rounded-lg hover:underline dark:bg-violet-700 dark:text-gray-100"
    : "px-3 py-1 rounded-lg hover:underline dark:bg-violet-400 dark:text-gray-900";
}

export default function DisclosureSelect({
  categories,
  disclosures,
  params,
}: {
  categories: Category[];
  disclosures: Disclosure[];
  params: {
    slug: string;
    category: string;
  };
}) {

  return (
    <div className="p-4 rounded-lg dark:bg-gray-900 min-h-[365px] relative">
      <h4 className="text-xl font-semibold">Browse By Category</h4>

      <div>
        <div className="flex flex-wrap py-6 space-x-2 dark:border-gray-400">
          {categories.map((category: Category) => {
            if (category.attributes.disclosures.data.length === 0) return null;
            return (
              <Link
                href={`/brochure/${category.attributes.slug}`}
                className={selectedFilter(
                  category.attributes.slug,
                  params.category
                )}
              >
                #{category.attributes.name}
              </Link>
            );
          })}
          <Link href={"/disclosure"} className={selectedFilter("", "filter")}>
            #all
          </Link>
        </div>

        <div className="space-y-2">
          <h4 className="text-lg font-semibold">Other Posts You May Like</h4>
          <ul className="ml-4 space-y-1 list-disc">
            {disclosures.map((disclosure: Disclosure) => {
              return (
                <li>
                  <Link
                    rel="noopener noreferrer"
                    href={`/disclosure/${params.category}/${disclosure.attributes.slug}`}
                    className={`${
                      params.slug === disclosure.attributes.slug &&
                      "text-violet-400"
                    }  hover:underline hover:text-violet-400 transition-colors duration-200`}
                  >
                    {disclosure.attributes.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
