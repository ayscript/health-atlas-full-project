import { Shield, Clock, Languages, Heart, Zap, Lock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Languages,
    title: "Multilingual Support",
    description: "Communicate seamlessly in Yoruba, Igbo, Hausa, and Nigerian Pidgin with our AI assistant.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Get instant medical guidance anytime, anywhere. Our AI never sleeps, so help is always available.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Heart,
    title: "Personalized Care",
    description: "Receive tailored health recommendations based on your symptoms and medical history.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: Shield,
    title: "Trusted Medical Info",
    description: "Access reliable health information verified by medical professionals and latest research.",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    icon: Zap,
    title: "Instant Responses",
    description: "Get immediate answers to your health questions without waiting in long queues.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Your health data is encrypted and secure. We prioritize your privacy and confidentiality.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Healthcare Made Simple and Accessible
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {
              "Breaking down barriers to quality healthcare with AI-powered assistance that understands your language and culture."
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
