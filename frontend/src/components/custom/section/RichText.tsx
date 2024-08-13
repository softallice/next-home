import parse from 'html-react-parser';
// 스타일 적용 확인 필요
import "../../../style/ckeditor.css"
// import IntroContent from "./IntroContent";

interface RichTextProps {
  data: {
    body: string;
  };
}

export default function RichText({ data }: RichTextProps) {
  // TODO: STYLE THE CK EDITOR
  return (
    <section className="rich-text py-6 dark:bg-black dark:text-gray-50 ">
      <div className="container mx-auto py-4 space-y-2 text-center">
        {parse(data.body)}
      </div>
      {/* <IntroContent /> */}
    </section>
  );
}
