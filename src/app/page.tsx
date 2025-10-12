"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scale } from "lucide-react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/lib/firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const auth = getAuth(app);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-8 sm:py-12 px-4">
        <div className="mx-auto grid w-full max-w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">Login</h1>
            <p className="text-sm sm:text-base text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          {isClient && (
            <form onSubmit={handleLogin}>
              <div className="grid gap-4">
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
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="#"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </form>
          )}
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      {/* Mobile Banner - Shows on small screens */}
      <div className="lg:hidden bg-muted p-6 text-center">
        <div className="flex items-center justify-center text-primary mb-4">
          <Scale className="h-8 w-8 mr-3"/>
          <h1 className="text-2xl font-headline font-bold">Smart Real Estate Advisor</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Your intelligent partner in property decisions.</p>
      </div>
      
      {/* Desktop Panel - Hidden on small screens */}
      <div className="hidden bg-muted lg:flex items-center justify-center flex-col text-center p-6 lg:p-10">
        <div className="flex items-center text-primary mb-4">
          <Scale className="h-8 w-8 lg:h-12 lg:w-12 mr-3 lg:mr-4"/>
          <h1 className="text-2xl lg:text-4xl font-headline font-bold">Smart Real Estate Advisor</h1>
        </div>
        <p className="text-base lg:text-lg text-muted-foreground">Your intelligent partner in property decisions.</p>
        <div className="w-full max-w-md mt-6 lg:mt-8 rounded-lg bg-background/50 p-4 lg:p-6 shadow-inner">
          <p className="text-base lg:text-lg font-semibold text-foreground">&quot;This app revolutionized how I approach property investment. The AI legal tips are a game-changer!&quot;</p>
          <p className="text-xs lg:text-sm text-muted-foreground mt-2">- Satisfied User</p>
        </div>
      </div>
    </div>
  );
}
