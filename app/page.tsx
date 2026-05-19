import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import MoUSection from "./components/MoUSection";
import GreenRingSection from "./components/GreenRingSection";
import MajorProjectsSection from "./components/MajorProjectsSection";
import WhyTreesSection from "./components/WhyTreesSection";
import TraditionalPlantationSection from "./components/TraditionalPlantationSection";
import WorkSection from "./components/WorkSection";
import GallerySection from "./components/GallerySection";
import MediaCoverageSection from "./components/MediaCoverageSection";
import DonationSection from "./components/DonationSection";
import VolunteerCTA from "./components/VolunteerCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <MoUSection />
        <GreenRingSection />
        <MajorProjectsSection />
        <WhyTreesSection />
        <TraditionalPlantationSection />
        <WorkSection />
        <GallerySection />
        <MediaCoverageSection />
        <DonationSection />
        <VolunteerCTA />
      </main>
      <Footer />
    </>
  );
}
