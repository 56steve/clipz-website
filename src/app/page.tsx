import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { InteractiveDemo } from "@/components/InteractiveDemo";
import { SecuritySection } from "@/components/SecuritySection";
import { ShortcutSheet } from "@/components/ShortcutSheet";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <InteractiveDemo />
        <SecuritySection />
        <ShortcutSheet />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
