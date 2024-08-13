import Hero from "@/components/custom/Hero";
import Features from "@/components/custom/Features";
import Testimonials from "@/components/custom/Testimonials";
import Pricing from "@/components/custom/Pricing";
import Email from "@/components/custom/Email";
import RichText from "@/components/custom/RichText";
import PageHeader from "@/components/custom/PageHeader";
import IntroImage from "@/components/custom/IntroImage";

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
    case "sections.heading":
      return <PageHeader key={index} heading={section.heading} text={section.description} />;
    default:
      return null;
  }
}
