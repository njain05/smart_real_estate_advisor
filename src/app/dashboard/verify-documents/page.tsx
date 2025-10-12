"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { verifyDocument } from "@/ai/flows/document-verification";
import type { VerifyDocumentOutput } from "@/ai/flows/document-verification";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, CheckCircle, FileUp, ListChecks, FileText } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// A mock function to simulate reading a file as a data URI
const toDataURL = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export default function DocumentVerificationPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerifyDocumentOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setResult(null);
      setError(null);
    }
  };

  const handleVerify = async () => {
    if (!file) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const dataUri = await toDataURL(file);
      const verificationResult = await verifyDocument({
        documentDataUri: dataUri,
        documentType: "Ownership Deed", // Example type
        propertyLocation: "New York, NY", // Example location
      });
      setResult(verificationResult);
    } catch (e) {
      setError("Failed to verify document. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-headline font-bold tracking-tight">
          Document Verification
        </h1>
        <p className="text-muted-foreground mt-2">
          Upload ownership or legal documents for an AI-powered pre-check.
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Upload Document</CardTitle>
              <CardDescription>Select a document to verify.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center w-full">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FileUp className="w-8 h-8 mb-4 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-muted-foreground">PDF, DOCX, or PNG (MAX. 10MB)</p>
                      </div>
                      <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                  </label>
              </div>

              {file && <p className="text-sm text-center text-muted-foreground">Selected: {file.name}</p>}
              <Button onClick={handleVerify} disabled={!file || loading} className="w-full">
                {loading ? "Verifying..." : "Verify Document"}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="min-h-[400px]">
            <CardHeader>
              <CardTitle>Verification Results</CardTitle>
              <CardDescription>AI-powered analysis of your document.</CardDescription>
            </CardHeader>
            <CardContent>
              {loading && (
                <div className="space-y-4">
                  <Skeleton className="h-8 w-1/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              )}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {result && (
                 <div className="space-y-6">
                 <Alert variant={result.potentialIssues.length > 0 ? "destructive" : "default"}>
                   <CheckCircle className="h-4 w-4" />
                   <AlertTitle className="font-bold">Overall Result</AlertTitle>
                   <AlertDescription>
                    {result.verificationResult}
                   </AlertDescription>
                 </Alert>

                 <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> Document Summary</h3>
                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">{result.summary}</p>
                 </div>

                 {result.potentialIssues.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="font-semibold flex items-center gap-2"><AlertCircle className="h-5 w-5 text-destructive" /> Potential Issues Found</h3>
                      <ul className="list-disc pl-5 space-y-2 text-sm text-destructive bg-destructive/10 p-4 rounded-md">
                        {result.potentialIssues.map((issue, index) => (
                          <li key={index}>{issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}
               </div>
              )}
              {!loading && !result && !error && (
                <div className="text-center text-muted-foreground py-16">
                  <ListChecks className="h-12 w-12 mx-auto mb-4" />
                  <p>Upload a document to see the verification results here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
