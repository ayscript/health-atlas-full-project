import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { InstallPWAButton } from "./install-pwa-button";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-linear-to-br from-primary to-accent relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5" />
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-balance">
            Ready to Experience Healthcare in Your Language?
          </h2>
          <p className="text-lg text-white/90 leading-relaxed mb-8">
            {
              "Join thousands of Nigerians who trust Health Atlas AI for accessible, multilingual healthcare guidance."
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={"/chat"}
              className="bg-white rounded-sm flex items-center justify-center p-2 px-4 text-primary font-semibold hover:bg-white/90 text-base"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <InstallPWAButton />
          </div>
          <p className="text-sm text-white/70 mt-6">
            {"No credit card required • Available on all devices"}
          </p>
        </div>
      </div>
    </section>
  );
}
