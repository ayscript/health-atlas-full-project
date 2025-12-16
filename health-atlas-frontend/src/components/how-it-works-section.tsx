import { MessageSquare, Brain, Stethoscope } from "lucide-react"

const steps = [
  {
    icon: MessageSquare,
    title: "Share Your Symptoms",
    description: "Describe what you're experiencing in your preferred language - Yoruba, Ibo, Hausa, or Pidgin.",
    step: "01",
  },
  {
    icon: Brain,
    title: "AI Analyzes Your Input",
    description: "Our advanced AI processes your information using medical knowledge and best practices.",
    step: "02",
  },
  {
    icon: Stethoscope,
    title: "Get Personalized Guidance",
    description: "Receive clear, actionable health advice and recommendations tailored to your situation.",
    step: "03",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">How Health Atlas AI Works</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {"Simple, fast, and effective healthcare assistance in three easy steps."}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <step.icon className="w-10 h-10 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
