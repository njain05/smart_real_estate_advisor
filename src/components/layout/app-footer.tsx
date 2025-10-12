import Link from "next/link";
import { Scale } from "lucide-react";

export default function AppFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto py-6 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
                <Scale className="h-6 w-6 text-primary" />
                <span className="font-semibold font-headline">SRE Advisor</span>
            </div>
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} SRE Advisor. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link>
            </div>
        </div>
      </div>
    </footer>
  )
}
