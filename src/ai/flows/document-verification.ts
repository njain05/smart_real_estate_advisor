'use server';

/**
 * @fileOverview Document verification flow for property ownership and legal documents.
 *
 * - verifyDocument - A function that handles the document verification process.
 * - VerifyDocumentInput - The input type for the verifyDocument function.
 * - VerifyDocumentOutput - The return type for the verifyDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VerifyDocumentInputSchema = z.object({
  documentDataUri: z
    .string()
    .describe(
      "A legal document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  documentType: z.string().describe('The type of document being uploaded (e.g., ownership deed, title report).'),
  propertyLocation: z.string().describe('The location of the property the document pertains to.'),
});
export type VerifyDocumentInput = z.infer<typeof VerifyDocumentInputSchema>;

const VerifyDocumentOutputSchema = z.object({
  verificationResult: z.string().describe('A summary of the document verification results, highlighting any potential issues or discrepancies.'),
  potentialIssues: z.array(z.string()).describe('A list of potential legal issues identified in the document.'),
  summary: z.string().describe('A brief summary of the document.'),
});
export type VerifyDocumentOutput = z.infer<typeof VerifyDocumentOutputSchema>;

export async function verifyDocument(input: VerifyDocumentInput): Promise<VerifyDocumentOutput> {
  return verifyDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'verifyDocumentPrompt',
  input: {schema: VerifyDocumentInputSchema},
  output: {schema: VerifyDocumentOutputSchema},
  prompt: `You are an AI assistant specialized in verifying legal documents related to property ownership.

You will analyze the provided document to identify any potential issues, discrepancies, or missing information.

Document Type: {{{documentType}}}
Property Location: {{{propertyLocation}}}
Document: {{media url=documentDataUri}}

Based on your analysis, provide a detailed verification result, a list of potential legal issues, and a brief summary of the document.
`,
});

const verifyDocumentFlow = ai.defineFlow(
  {
    name: 'verifyDocumentFlow',
    inputSchema: VerifyDocumentInputSchema,
    outputSchema: VerifyDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
