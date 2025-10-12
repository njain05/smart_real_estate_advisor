"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getLegalTips } from "@/ai/flows/legal-tips";
import { recommendProperties } from "@/ai/flows/property-recommendation";
import { 
  Gavel, 
  Home, 
  MapPin, 
  Lightbulb, 
  Sparkles, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Building2,
  Users,
  Shield
} from "lucide-react";

export default function AIAssistantPage() {
  const [location, setLocation] = useState("");
  const [userPreferences, setUserPreferences] = useState("");
  const [legalTips, setLegalTips] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getLegalAdvice = async () => {
    if (!location.trim()) return;
    
    setLoading(true);
    setError("");
    
    try {
      const result = await getLegalTips({ location: location.trim() });
      setLegalTips(result.legalTips);
    } catch (err) {
      setError(`Unable to get legal advice at the moment. Please try again.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getPropertySuggestions = async () => {
    if (!userPreferences.trim()) return;
    
    setLoading(true);
    setError("");
    
    try {
      const result = await recommendProperties({
        userPreferences: userPreferences.trim(),
        searchHistory: "Based on your preferences",
        savedFavorites: "AI-powered recommendations"
      });
      setRecommendations(result.recommendedProperties);
      // Clear the input after getting recommendations
      setUserPreferences("");
    } catch (err) {
      setError(`Unable to get property suggestions at the moment. Please try again.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-6xl">
             {/* Hero Section */}
       <div className="text-center mb-8 md:mb-12 px-4">
         <div className="flex flex-col sm:flex-row items-center justify-center mb-4 gap-3 sm:gap-4">
           <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
             <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
           </div>
           <h1 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
             AI Real Estate Assistant
           </h1>
         </div>
         <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
           Get instant legal advice and personalized property recommendations powered by AI
         </p>
       </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 px-4">
        {/* Legal Advice Section */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                     <CardHeader className="pb-4 px-4 sm:px-6">
             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
               <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                 <Gavel className="h-6 w-6 text-green-600" />
               </div>
               <div>
                 <CardTitle className="text-xl sm:text-2xl text-green-800">Legal Advice</CardTitle>
                 <p className="text-sm sm:text-base text-green-600">Get location-specific legal tips for property transactions</p>
               </div>
             </div>
           </CardHeader>
                     <CardContent className="space-y-4 px-4 sm:px-6">
             <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
               <div className="flex-1">
                 <Input
                   placeholder="Enter city or location (e.g., Mumbai, Delhi, Bangalore)"
                   value={location}
                   onChange={(e) => setLocation(e.target.value)}
                   className="border-green-200 focus:border-green-400"
                 />
               </div>
               <Button 
                 onClick={getLegalAdvice} 
                 disabled={loading || !location.trim()}
                 className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-2"
               >
                 {loading ? (
                   <>
                     <Clock className="h-4 w-4 mr-2 animate-spin" />
                     <span className="hidden sm:inline">Getting Advice...</span>
                     <span className="sm:hidden">Loading...</span>
                   </>
                 ) : (
                   <>
                     <span className="hidden sm:inline">Get Legal Tips</span>
                     <span className="sm:hidden">Get Tips</span>
                     <ArrowRight className="h-4 w-4 ml-2" />
                   </>
                 )}
               </Button>
             </div>
            
            {legalTips.length > 0 && (
              <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h4 className="font-semibold text-green-800">Legal Tips for {location}</h4>
                </div>
                <ol className="space-y-3 text-green-700">
                  {legalTips.map((tip, index) => (
                    <li key={index} className="flex gap-3">
                      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300 h-6 px-2 text-xs">
                        {index + 1}
                      </Badge>
                      <span className="text-sm leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Property Recommendations Section */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
                     <CardHeader className="pb-4 px-4 sm:px-6">
             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
               <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                 <Home className="h-6 w-6 text-blue-600" />
               </div>
               <div>
                 <CardTitle className="text-xl sm:text-2xl text-blue-800">Smart Recommendations</CardTitle>
                 <p className="text-sm sm:text-base text-blue-600">Get AI-powered property suggestions based on your preferences</p>
               </div>
             </div>
           </CardHeader>
                     <CardContent className="space-y-4 px-4 sm:px-6">
             <div className="space-y-3">
               <Input
                 placeholder="Describe your property preferences (e.g., 2BHK apartments in Mumbai under ₹80,000 with good connectivity)"
                 value={userPreferences}
                 onChange={(e) => setUserPreferences(e.target.value)}
                 className="border-blue-200 focus:border-blue-400"
               />
               
               <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                 <div className="flex items-start gap-2">
                   <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                   <div className="text-xs text-blue-700">
                     <p className="font-medium mb-1">💡 Example prompts:</p>
                     <ul className="space-y-1">
                       <li className="text-xs sm:text-xs">• &quot;2BHK apartments in Mumbai under ₹80,000 with good connectivity&quot;</li>
                       <li className="text-xs sm:text-xs">• &quot;Family homes in Bangalore near schools, budget 1.5 crores&quot;</li>
                       <li className="text-xs sm:text-xs">• &quot;Studio apartments in Delhi for working professionals&quot;</li>
                     </ul>
                   </div>
                 </div>
               </div>
             </div>
            
                         <Button 
               onClick={getPropertySuggestions} 
               disabled={loading || !userPreferences.trim()}
               className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3"
             >
               {loading ? (
                 <>
                   <Clock className="h-4 w-4 mr-2 animate-spin" />
                   <span className="hidden sm:inline">Finding Perfect Properties...</span>
                   <span className="sm:hidden">Finding Properties...</span>
                 </>
               ) : (
                 <>
                   <Sparkles className="h-4 w-4 mr-2" />
                   <span className="hidden sm:inline">Get Smart Recommendations</span>
                   <span className="sm:hidden">Get Recommendations</span>
                 </>
               )}
             </Button>
            
            {recommendations && (
              <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-blue-800">Recommended Properties</h4>
                    <p className="text-xs text-blue-600">Based on: &quot;{userPreferences}&quot;</p>
                  </div>
                </div>
                <div className="space-y-3 text-blue-700">
                  {recommendations.split('\n').map((line, index) => {
                    const trimmedLine = line.trim();
                    if (!trimmedLine) return null;
                    
                    const isNumbered = /^\d+\./.test(trimmedLine);
                    const isHeading = trimmedLine.includes(':') && trimmedLine.length < 50;
                    
                    return (
                      <div key={index} className="flex gap-3">
                        {isNumbered && (
                          <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300 h-6 px-2 text-xs">
                            {trimmedLine.match(/^\d+/)?.[0]}
                          </Badge>
                        )}
                        <p 
                          className={`text-sm leading-relaxed ${
                            isNumbered 
                              ? 'font-semibold text-blue-800' 
                              : isHeading 
                              ? 'font-medium text-blue-800 border-b border-blue-200 pb-1' 
                              : 'text-blue-700'
                          }`}
                        >
                          {isNumbered ? trimmedLine.replace(/^\d+\.\s*/, '') : trimmedLine}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

             {/* Features Section */}
       <div className="mt-12 md:mt-16 px-4">
         <h2 className="text-xl sm:text-2xl font-headline font-bold text-center mb-6 md:mb-8">Why Use AI Assistant?</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
            <div className="p-2 sm:p-3 bg-purple-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-purple-800 mb-2 text-sm sm:text-base">Legal Protection</h3>
            <p className="text-purple-600 text-xs sm:text-sm">Get location-specific legal advice to protect your property investments</p>
          </div>
          
          <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border border-orange-200">
            <div className="p-2 sm:p-3 bg-orange-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
            </div>
            <h3 className="font-semibold text-orange-800 mb-2 text-sm sm:text-base">Personalized Matches</h3>
            <p className="text-orange-600 text-xs sm:text-sm">AI analyzes your preferences to find properties that match your needs</p>
          </div>
          
          <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg border border-teal-200">
            <div className="p-2 sm:p-3 bg-teal-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-teal-600" />
            </div>
            <h3 className="font-semibold text-teal-800 mb-2 text-sm sm:text-base">Instant Results</h3>
            <p className="text-teal-600 text-xs sm:text-sm">Get professional advice and recommendations in seconds, not days</p>
          </div>
        </div>
      </div>

             {/* Error Display */}
       {error && (
         <div className="mt-8 mx-4 p-4 bg-red-50 border border-red-200 rounded-lg">
           <div className="flex items-center gap-2">
             <div className="p-2 bg-red-100 rounded-full flex-shrink-0">
               <Shield className="h-4 w-4 text-red-600" />
             </div>
             <p className="text-red-700 text-sm sm:text-base">{error}</p>
           </div>
         </div>
       )}
    </div>
  );
}

