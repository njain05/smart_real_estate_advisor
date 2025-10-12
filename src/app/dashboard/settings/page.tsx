"use client"
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from 'lucide-react'

export default function SettingsPage() {
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/150?u=a042581f4e29026704d");

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if(event.target?.result) {
          setAvatar(event.target.result as string);
        }
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-headline font-bold tracking-tight">
          Account Settings
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your account details and preferences.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="items-center text-center">
              <div className="relative">
                <Avatar className="w-32 h-32 mb-4">
                  <AvatarImage src={avatar} alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <label htmlFor="avatar-upload" className="absolute bottom-2 right-2 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90">
                    <Upload className="h-4 w-4"/>
                    <input type="file" id="avatar-upload" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                </label>
              </div>
              <CardTitle>Alex Doe</CardTitle>
              <CardDescription>alex.doe@example.com</CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" defaultValue="Alex" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" defaultValue="Doe" />
                  </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="alex.doe@example.com" disabled />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input id="password" type="password" />
                </div>
                 <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
