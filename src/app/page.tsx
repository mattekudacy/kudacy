import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <HeroSection>
        <ProjectsSection />
        <BlogSection />
        <ContactSection />
      </HeroSection>
    </div>
  );
}
