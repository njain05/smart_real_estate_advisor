// src/ai/flows/legal-tips.ts
'use server';
/**
 * @fileOverview Provides AI-driven legal tips specific to a property's location.
 *
 * - getLegalTips - A function that retrieves legal tips for a given location.
 * - LegalTipsInput - The input type for the getLegalTips function.
 * - LegalTipsOutput - The return type for the getLegalTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LegalTipsInputSchema = z.object({
  location: z.string().describe('The location of the property.'),
});
export type LegalTipsInput = z.infer<typeof LegalTipsInputSchema>;

const LegalTipsOutputSchema = z.object({
  legalTips: z.array(z.string()).describe('A list of legal tips for the property location.'),
});
export type LegalTipsOutput = z.infer<typeof LegalTipsOutputSchema>;

export async function getLegalTips(input: LegalTipsInput): Promise<LegalTipsOutput> {
  return legalTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'legalTipsPrompt',
  input: {schema: LegalTipsInputSchema},
  output: {schema: LegalTipsOutputSchema},
  prompt: `You are a helpful legal advisor specializing in real estate law. Provide practical legal tips for properties in the specified location.

Location: {{location}}

Please provide 5-6 practical legal tips that property buyers and sellers should know for this area. Each tip should be:
- Written in simple, easy-to-understand language
- Specific to the location mentioned
- Practical and actionable
- Focused on common real estate legal issues

Write each tip as a clear, helpful piece of advice. Avoid technical jargon and make it sound like friendly legal guidance from a trusted advisor.`,
});

const legalTipsFlow = ai.defineFlow(
  {
    name: 'legalTipsFlow',
    inputSchema: LegalTipsInputSchema,
    outputSchema: LegalTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
