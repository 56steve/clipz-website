import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StatStrip } from "@/components/StatStrip";
import { BentoFeatures } from "@/components/BentoFeatures";
import { InteractiveDemo } from "@/components/InteractiveDemo";
import { SecuritySection } from "@/components/SecuritySection";
import { ShortcutSheet } from "@/components/ShortcutSheet";
import { TechStack } from "@/components/TechStack";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatStrip />
        <BentoFeatures />
        <InteractiveDemo />
        <SecuritySection />
        <ShortcutSheet />
        <TechStack />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
