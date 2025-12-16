import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { LanguagesSection } from "@/components/languages-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { CTASection } from "@/components/cta-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {Callout} from "@/components/callout"
import Team from "@/components/team"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <LanguagesSection />
        <Callout />
        <HowItWorksSection />
        <Team />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
