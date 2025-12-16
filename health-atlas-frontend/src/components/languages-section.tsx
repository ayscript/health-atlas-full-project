import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

const languages = [
  {
    name: "Yoruba",
    native: "Èdè Yorùbá",
    example: "Ẹ káàárọ̀! Báwo ni?",
  },
  {
    name: "Igbo",
    native: "Asụsụ Igbo",
    example: "Nnọọ! Kedu ka ị mere?",
  },
  {
    name: "Hausa",
    native: "هَرْشٜن هَوْسَ",
    example: "Sannu! Yaya lafiya?",
  },
  {
    name: "Pidgin",
    native: "Nigerian Pidgin",
    example: "How you dey? Wetin dey happen?",
  },
]

export function LanguagesSection() {
  return (
    <section id="languages" className="py-20 md:py-28 bg-secondary/20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Speak Your Language, Get the Care You Need
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {
              "Our AI understands and responds fluently in Nigeria's major languages, ensuring clear communication about your health."
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {languages.map((language) => (
            <Card
              key={language.name}
              className="border-border bg-card hover:border-primary/50 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">{language.name}</h3>
                    <p className="text-sm text-muted-foreground">{language.native}</p>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-foreground font-medium italic">{language.example}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
