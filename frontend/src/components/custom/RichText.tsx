import parse from 'html-react-parser';
// 스타일 적용 확인 필요
import "../../style/ckeditor.css"
interface RichTextProps {
  data: {
    content: string;
  };
}

export default function RichText({ data }: RichTextProps) {
  // TODO: STYLE THE MARKDOWN
  return (
    <section className="rich-text py-6 dark:bg-black dark:text-gray-50 ">
      {parse(data.content)}
    </section>
  );
}
