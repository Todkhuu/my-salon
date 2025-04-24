"use client";
import HeroSection from "./_components/HeroSection";
import OurStorySection from "./_components/OurStorySection";
import { ValuesSection } from "./_components/ValuesSection";
import { TeamSection } from "./_components/TeamSection";
import { TestimonialsSection } from "./_components/TestimonialsSection";
import { StatsSection } from "./_components/StatsSection";
import { LocationHoursSection } from "./_components/ LocationHoursSection";
import { CTASection } from "./_components/CTASection";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection />
      <OurStorySection />
      <ValuesSection />
      <TeamSection />
      <TestimonialsSection />
      <StatsSection />
      <LocationHoursSection />
      <CTASection />
    </div>
  );
}
