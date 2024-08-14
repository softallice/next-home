import MainTitle from "../Titles/MainTitle";

interface PageHeaderProps {
  data: {
    heading: string,
    text?: string,
  }
}

export default function PageHeader({ data } : PageHeaderProps) {
  return (
    <section className="dark:bg-black dark:text-gray-100">
      <div className="my-16 w-full text-center">
        <MainTitle title={data.heading} description={data.text} />
        {/* { data.text && <span className="text-violet-400 font-bold">{data.text}</span> }
        <h2 className="text-4xl my-4 lg:text-5xl font-bold font-heading">{data.heading}</h2> */}
      </div>
    </section>
  );
}
