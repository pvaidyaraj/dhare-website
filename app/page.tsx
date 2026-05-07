import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ImpactCounters from "./components/ImpactCounters";
import AboutSection from "./components/AboutSection";
import MoUSection from "./components/MoUSection";
import GreenRingSection from "./components/GreenRingSection";
import WorkSection from "./components/WorkSection";
import GallerySection from "./components/GallerySection";
import DonationSection from "./components/DonationSection";
import VolunteerCTA from "./components/VolunteerCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ImpactCounters />
        <AboutSection />
        <MoUSection />
        <GreenRingSection />
        <WorkSection />
        <GallerySection />
        <DonationSection />
        <VolunteerCTA />
      </main>
      <Footer />
    </>
  );
}
