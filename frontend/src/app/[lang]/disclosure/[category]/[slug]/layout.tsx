import DisclosureSelect from "@/components/custom/select/DisclosureSelect";
import { fetchAPI } from "@/lib/fetch-api";

async function fetchSideMenuData(filter: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const options = { headers: { Authorization: `Bearer ${token}` } };

    const categoriesResponse = await fetchAPI(
      "/disclosure-categories",
      { populate: "*" },
      options
    );

    const disclosuresResponse = await fetchAPI(
      "/disclosures",
      filter
        ? {
            filters: {
              category: {
                name: filter,
              },
            },
          }
        : {},
      options
    );

    return {
      disclosures: disclosuresResponse.data,
      categories: categoriesResponse.data,
    };
  } catch (error) {
    console.error(error);
  }
}

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

interface Data {
  disclosures: Disclosure[];
  categories: Category[];
}

export default async function LayoutRoute({
  params,
  children,
}: {
  children: React.ReactNode;
  params: {
    slug: string;
    category: string;
  };
}) {
  const { category } = params;
  const { categories, disclosures } = (await fetchSideMenuData(category)) as Data;

  return (
    <section className="container p-8 mx-auto space-y-6 sm:space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-4">
        <div className="col-span-2">{children}</div>
        <aside>
          <DisclosureSelect
            categories={categories}
            disclosures={disclosures}
            params={params}
          />
        </aside>
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/disclosures`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const disclosureResponse = await fetchAPI(
    path,
    {
      populate: ["category"],
    },
    options
  );

  return disclosureResponse.data.map(
    (disclosure: {
      attributes: {
        slug: string;
        category: {
          slug: string;
        };
      };
    }) => ({ slug: disclosure.attributes.slug, category: disclosure.attributes.slug })
  );
}
