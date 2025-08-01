"use client";

import {
  Navigation,
  AnimatedBackground,
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  TestimonialsSection,
  PricingSection,
  CTASection,
  Footer,
} from "@/components/landing";
import { ScrollToTop } from "@/components/ScrollToTop";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyberpunk-black via-cyberpunk-darkgray to-cyberpunk-black relative overflow-hidden">
      <AnimatedBackground />
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
