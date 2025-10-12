import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gavel } from "lucide-react";

const legalFaqs = [
    {
        question: "What is a rental agreement?",
        answer: "A rental agreement is a legal document that outlines the terms and conditions of a rental arrangement between a landlord and a tenant. It should include details like rent amount, tenure, security deposit, and rules for both parties."
    },
    {
        question: "How much security deposit can a landlord ask for in India?",
        answer: "The security deposit amount varies by state. For example, in Maharashtra, it's typically capped at 3 months' rent. In Karnataka, it can be up to 10 months' rent. It's important to check the local rental laws."
    },
    {
        question: "What is police verification for tenants?",
        answer: "Police verification is a process where the landlord submits the tenant's details to the local police station. This is a mandatory step in many cities to ensure the safety and security of the area."
    },
    {
        question: "Can a landlord evict a tenant without notice?",
        answer: "No, a landlord must provide a valid reason and a proper notice period as mentioned in the rental agreement before evicting a tenant. The notice period is usually between 30 to 60 days."
    }
]

export default function LegalResourcesPage() {
  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-headline font-bold tracking-tight">
          Legal Resources
        </h1>
        <p className="text-muted-foreground mt-2">
          Essential legal information for buying and renting property in India.
        </p>
      </header>
      <Card>
        <CardHeader>
            <div className="flex items-center gap-4">
                <Gavel className="h-8 w-8 text-primary" />
                <div>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                    <CardDescription>Common legal questions about Indian real estate.</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                {legalFaqs.map((faq, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent>
                        {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
