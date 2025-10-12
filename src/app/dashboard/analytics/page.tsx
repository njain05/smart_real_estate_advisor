import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Eye, MessageSquare, TrendingUp, DollarSign } from "lucide-react";
import AnalyticsChart from "@/components/dashboard/analytics-chart";
import { analyticsData, inquiriesData } from "@/lib/mock-data";

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-headline font-bold tracking-tight">
          Analytics Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Track the performance of your property listings.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inquiries</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+235</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estimated Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.2M</div>
            <p className="text-xs text-muted-foreground">Based on recent inquiries</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Views Over Time</CardTitle>
            <CardDescription>A look at your property views in the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent>
             <AnalyticsChart data={analyticsData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Recent Inquiries</CardTitle>
            <CardDescription>Latest messages from potential buyers.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inquiriesData.map(inquiry => (
                <div key={inquiry.id} className="flex items-start gap-4">
                   <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground">
                    {inquiry.initials}
                   </div>
                   <div>
                    <p className="font-semibold">{inquiry.name}</p>
                    <p className="text-sm text-muted-foreground">{inquiry.message}</p>
                   </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
