import { TimelineLayout } from "@/components/timeline/timeline-layout";

interface Timeline {
	id: string;
	title: string;
	date: string;
	description: string;
}

interface TimelineProps {
  data: {
    id: string;
    title: string;
    description: string;
    timelines: Timeline[];
  };
}

export default function History({ data }: TimelineProps) {
  return (
    <section className="py-20 dark:bg-black dark:text-gray-100 ">
      <div className="container w-fit mx-auto py-4 space-y-2 text-center">
        <TimelineLayout timelines={data.timelines}/>
      </div>
    </section>
  );
}
