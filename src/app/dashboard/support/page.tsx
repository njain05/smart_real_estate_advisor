import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { LifeBuoy, MessageSquare, Send } from "lucide-react"

export default function SupportPage() {
  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-headline font-bold tracking-tight">
          Support Center
        </h1>
        <p className="text-muted-foreground mt-2">
          We&apos;re here to help. Contact us for any issues or questions.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Send className="h-6 w-6 text-primary"/>
                Send us a Message
            </CardTitle>
            <CardDescription>Our team will get back to you within 24 hours.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="e.g., Issue with a listing" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea id="message" placeholder="Describe your issue in detail..." rows={5}/>
            </div>
            <Button className="w-full">Submit Ticket</Button>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <LifeBuoy className="h-6 w-6 text-primary"/>
                    Help & FAQs
                </CardTitle>
                <CardDescription>Find answers to common questions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                    <MessageSquare className="h-6 w-6 text-primary mt-1" />
                    <div>
                        <h4 className="font-semibold">How do I verify my document?</h4>
                        <p className="text-sm text-muted-foreground">Navigate to the &quot;Verify Docs&quot; page from the sidebar and upload your document file.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                    <MessageSquare className="h-6 w-6 text-primary mt-1" />
                    <div>
                        <h4 className="font-semibold">How can I contact a property owner?</h4>
                        <p className="text-sm text-muted-foreground">On the property details page, click the &quot;Contact Owner&quot; button to initiate communication.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                    <MessageSquare className="h-6 w-6 text-primary mt-1" />
                    <div>
                        <h4 className="font-semibold">Is my data secure?</h4>
                        <p className="text-sm text-muted-foreground">Yes, we prioritize your data security. All sensitive information is encrypted and handled with care.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
