import Link from "next/link";

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

function selectedFilter(current: string, selected: string) {
  return current === selected
    ? "px-3 py-1 rounded-lg hover:underline dark:bg-violet-700 dark:text-gray-100"
    : "px-3 py-1 rounded-lg hover:underline dark:bg-violet-400 dark:text-gray-900";
}

export default function NotificationSelect({
  categories,
  notifications,
  params,
}: {
  categories: Category[];
  notifications: Notification[];
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
            if (category.attributes.notifications.data.length === 0) return null;
            return (
              <Link
                href={`/notification/${category.attributes.slug}`}
                className={selectedFilter(
                  category.attributes.slug,
                  params.category
                )}
              >
                #{category.attributes.name}
              </Link>
            );
          })}
          <Link href={"/notification"} className={selectedFilter("", "filter")}>
            #all
          </Link>
        </div>

        <div className="space-y-2">
          <h4 className="text-lg font-semibold">Other Posts You May Like</h4>
          <ul className="ml-4 space-y-1 list-disc">
            {notifications.map((notification: Notification) => {
              return (
                <li>
                  <Link
                    rel="noopener noreferrer"
                    href={`/notification/${params.category}/${notification.attributes.slug}`}
                    className={`${
                      params.slug === notification.attributes.slug &&
                      "text-violet-400"
                    }  hover:underline hover:text-violet-400 transition-colors duration-200`}
                  >
                    {notification.attributes.title}
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
