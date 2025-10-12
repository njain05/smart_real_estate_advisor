"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scale } from "lucide-react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "@/lib/firebase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const auth = getAuth(app);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
       <div className="flex items-center justify-center py-12">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isClient && (
              <form onSubmit={handleSignUp}>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" placeholder="Max" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" placeholder="Robinson" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <Button type="submit" className="w-full">
                    Create an account
                  </Button>
                  <Button variant="outline" className="w-full">
                    Sign up with Google
                  </Button>
                </div>
              </form>
            )}
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/" className="underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="hidden bg-muted lg:flex items-center justify-center flex-col text-center p-10">
        <div className="flex items-center text-primary mb-4">
          <Scale className="h-12 w-12 mr-4"/>
          <h1 className="text-4xl font-headline font-bold">Smart Real Estate Advisor</h1>
        </div>
        <p className="text-lg text-muted-foreground">Navigate the real estate market with confidence and clarity.</p>
        <div className="w-full max-w-md mt-8 rounded-lg bg-background/50 p-6 shadow-inner">
          <p className="text-lg font-semibold text-foreground">&quot;The document verification feature saved me weeks of manual work and gave me peace of mind.&quot;</p>
          <p className="text-sm text-muted-foreground mt-2">- Happy Seller</p>
        </div>
      </div>
    </div>
  )
}
