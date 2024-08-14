import Hero from "@/components/custom/section/Hero";
import Features from "@/components/custom/Features";
import Testimonials from "@/components/custom/Testimonials";
import Pricing from "@/components/custom/section/Pricing";
import Email from "@/components/custom/section/Email";
import RichText from "@/components/custom/section/RichTextContent";
import PageHeader from "@/components/custom/section/PageHeader";
import IntroImage from "@/components/custom/section/IntroImage";
import History from "@/components/custom/section/History";
import FeaturesRowGroup from "@/components/custom/section/FeaturesRowGroup";

export function sectionRenderer(section: any, index: number) {
  // console.log('section : ', section)
  switch (section.__component) {
    case "sections.hero":
      return <Hero key={index} data={section} />;
    case "sections.features":
      return <Features key={index} data={section} />;
    case "sections.testimonials-group":
      return <Testimonials key={index} data={section} />;
    case "sections.pricing":
      return <Pricing key={index} data={section} />;
    case "sections.lead-form":
      return <Email key={index} data={section} />;
    case "sections.rich-text":
      return <RichText key={index} data={section} />;
    case "sections.intro-image":
      return <IntroImage key={index} data={section} />;
    case "sections.heading":
      return <PageHeader key={index} data={section} />;
    case "sections.history":
      return <History key={index} data={section} />;
    case "sections.feature-rows-group":
      return <FeaturesRowGroup key={index} data={section} />;
    default:
      return null;
  }
}
