"use client";
import type React from "react";
import { HeroSection } from "./_components/HeroSection";
import { ContactInformation } from "./_components/ContactInformation";
import { ContactForm } from "./_components/ContactForm";
import { FAQSection } from "./_components/FAQSection";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection />
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] m-auto px-4 md:px-6">
          <div className="grid gap-10 md:grid-cols-2">
            <ContactInformation />
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <FAQSection />
    </div>
  );
}
