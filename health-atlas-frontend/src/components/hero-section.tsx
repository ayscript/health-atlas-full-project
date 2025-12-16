"use client"
import { ArrowRight, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { InstallPWAButton } from "./install-pwa-button"
import Typewriter from "typewriter-effect"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-secondary/20 to-background pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 place-content-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm font-medium text-accent">Available 24/7 in Your Language</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              <Typewriter
                options={{
                  strings: [
                    "Healthcare at Your Fingertips",
                    "Accessible. Smart. Instant.",
                    "AI-Powered Medical Guidance",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 30,
                }}
              />
              {/* Healthcare Assistance in <span className="text-primary">Your Native Language</span> */}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              {
                "Get instant AI-powered medical guidance in Yoruba, Igbo, Hausa, and Pidgin. Breaking language barriers to make healthcare accessible to everyone."
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={"/chat"} className="bg-primary rounded-lg flex items-center justify-center p-3 text-primary-foreground hover:bg-primary/90 text-base">
                Start Chatting Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <InstallPWAButton />
              {/* <Button size="lg" variant="outline" className="text-base bg-transparent">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button> */}
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-lg font-bold text-foreground">4+</div>
                <div className="text-sm text-muted-foreground">Languages</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <div className="text-lg font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">Available</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <div className="text-lg font-bold text-foreground">AI-Powered</div>
                <div className="text-sm text-muted-foreground">Technology</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
              <Image
                src="/hero.jpg"
                alt="Health Atlas Chatbot Interface"
                width={600}
                height={600}
                className="w-full h-[600px] object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-success rounded-full blur-3xl opacity-20" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent rounded-full blur-3xl opacity-20" />
          </div>
        </div>
      </div>
    </section>
  )
}
