import { SiteFooter } from "@/components/layout";
import { useHashScroll } from "@/hooks";
import {
  HeroSection,
  AboutSection,
  ServicesSection,
  ProcessSection,
  MarqueeSection,
  WorkSection,
  FaqSection,
  TestimonialsSection,
  BlogSection,
  LogosSection,
} from "./sections";

const HomePage = () => {
  // Links like /#services land here after mount, so scroll to the target once.
  useHashScroll();

  return (
    <main className="site-shell">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProcessSection />
      <MarqueeSection />
      <WorkSection />
      <FaqSection />
      <TestimonialsSection />
      <BlogSection />
      <LogosSection />
      <SiteFooter page="home" />
    </main>
  );
};

export { HomePage };
