"use client";

import {
  Navigation,
  AnimatedBackground,
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  PricingSection,
  CTASection,
  Footer,
} from "@/components/landing";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyberpunk-black via-cyberpunk-darkgray to-cyberpunk-black relative overflow-hidden">
      <AnimatedBackground />
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}
