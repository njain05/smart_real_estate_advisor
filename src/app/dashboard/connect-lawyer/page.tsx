import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

const lawyers = [
  {
    name: "Adv. Priya Sharma",
    avatar: "https://i.pravatar.cc/150?u=priya",
    specialization: "Property Law",
    location: "Mumbai, MH",
    experience: "12+ years",
  },
  {
    name: "Adv. Rohan Gupta",
    avatar: "https://i.pravatar.cc/150?u=rohan",
    specialization: "Rental Agreements",
    location: "Bengaluru, KA",
    experience: "8+ years",
  },
  {
    name: "Adv. Anjali Singh",
    avatar: "https://i.pravatar.cc/150?u=anjali",
    specialization: "Real Estate Litigation",
    location: "Delhi, DL",
    experience: "15+ years",
  }
]

export default function ConnectLawyerPage() {
  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-headline font-bold tracking-tight">
          Connect with a Lawyer
        </h1>
        <p className="text-muted-foreground mt-2">
          Find experienced real estate lawyers in your city.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lawyers.map((lawyer) => (
          <Card key={lawyer.name}>
            <CardHeader className="items-center text-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={lawyer.avatar} alt={lawyer.name} />
                <AvatarFallback>{lawyer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle>{lawyer.name}</CardTitle>
              <CardDescription>{lawyer.specialization}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">{lawyer.location}</p>
              <p className="text-sm mt-1">
                <strong>Experience:</strong> {lawyer.experience}
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Users className="mr-2 h-4 w-4" /> Connect
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
