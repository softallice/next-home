import NotificationSelect from "@/components/custom/select/NotificationSelect";
import { fetchAPI } from "@/lib/fetch-api";

async function fetchSideMenuData(filter: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const options = { headers: { Authorization: `Bearer ${token}` } };

    const categoriesResponse = await fetchAPI(
      "/notification-categories",
      { populate: "*" },
      options
    );

    const notificationsResponse = await fetchAPI(
      "/notifications",
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
      notifications: notificationsResponse.data,
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
    notifications: {
      data: Array<{}>;
    };
  };
}

interface Notification {
  id: number;
  attributes: {
    title: string;
    slug: string;
  };
}

interface Data {
  notifications: Notification[];
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
  const { categories, notifications } = (await fetchSideMenuData(category)) as Data;

  return (
    <section className="container p-8 mx-auto space-y-6 sm:space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-4">
        <div className="col-span-2">{children}</div>
        <aside>
          <NotificationSelect
            categories={categories}
            notifications={notifications}
            params={params}
          />
        </aside>
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/notifications`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const notificationResponse = await fetchAPI(
    path,
    {
      populate: ["category"],
    },
    options
  );

  return notificationResponse.data.map(
    (notification: {
      attributes: {
        slug: string;
        category: {
          slug: string;
        };
      };
    }) => ({ slug: notification.attributes.slug, category: notification.attributes.slug })
  );
}
