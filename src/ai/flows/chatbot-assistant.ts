// chatbot-assistant.ts
'use server';
/**
 * @fileOverview An AI-driven chatbot assistant that answers frequently asked questions about buying, renting, or legal processes.
 *
 * - chatbotAssistant - A function that handles the chatbot assistant process.
 * - ChatbotAssistantInput - The input type for the chatbotAssistant function.
 * - ChatbotAssistantOutput - The return type for the chatbotAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotAssistantInputSchema = z.object({
  query: z.string().describe('The user query or question.'),
});
export type ChatbotAssistantInput = z.infer<typeof ChatbotAssistantInputSchema>;

const ChatbotAssistantOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user query.'),
});
export type ChatbotAssistantOutput = z.infer<typeof ChatbotAssistantOutputSchema>;

export async function chatbotAssistant(input: ChatbotAssistantInput): Promise<ChatbotAssistantOutput> {
  return chatbotAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotAssistantPrompt',
  input: {schema: ChatbotAssistantInputSchema},
  output: {schema: ChatbotAssistantOutputSchema},
  prompt: `You are a helpful AI assistant designed to answer frequently asked questions about buying, renting, and legal processes related to real estate.

  User Query: {{{query}}}

  Please provide a concise and informative answer to the user's query. If the question is not related to real estate, respond politely that you cannot answer it.
  \n  Response:`,
});

const chatbotAssistantFlow = ai.defineFlow(
  {
    name: 'chatbotAssistantFlow',
    inputSchema: ChatbotAssistantInputSchema,
    outputSchema: ChatbotAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
