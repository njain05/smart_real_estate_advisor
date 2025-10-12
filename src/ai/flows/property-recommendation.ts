'use server';

/**
 * @fileOverview AI-powered property recommendation flow.
 *
 * - recommendProperties - A function that recommends properties based on user preferences.
 * - PropertyRecommendationInput - The input type for the recommendProperties function.
 * - PropertyRecommendationOutput - The return type for the recommendProperties function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PropertyRecommendationInputSchema = z.object({
  userPreferences: z
    .string()
    .describe('The user preferences for property recommendations.'),
  searchHistory: z.string().describe('The user search history.'),
  savedFavorites: z.string().describe('The user saved favorite properties.'),
});

export type PropertyRecommendationInput = z.infer<
  typeof PropertyRecommendationInputSchema
>;

const PropertyRecommendationOutputSchema = z.object({
  recommendedProperties: z
    .string()
    .describe('A list of recommended properties based on user data.'),
});

export type PropertyRecommendationOutput = z.infer<
  typeof PropertyRecommendationOutputSchema
>;

export async function recommendProperties(
  input: PropertyRecommendationInput
): Promise<PropertyRecommendationOutput> {
  return recommendPropertiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'propertyRecommendationPrompt',
  input: {schema: PropertyRecommendationInputSchema},
  output: {schema: PropertyRecommendationOutputSchema},
  prompt: `You are a friendly real estate expert helping users find their perfect property. Based on the user's preferences, search history, and saved favorites, provide personalized property recommendations.

User Preferences: {{{userPreferences}}}
Search History: {{{searchHistory}}}
Saved Favorites: {{{savedFavorites}}}

Please provide 3-4 personalized property recommendations in natural, conversational language. For each property, mention:
- The type and location
- Why it matches their preferences
- Key features that would appeal to them
- Approximate price range if relevant

Write in a helpful, friendly tone as if you're talking to a friend. Don't use JSON format or technical language - just natural recommendations.`,
});

const recommendPropertiesFlow = ai.defineFlow(
  {
    name: 'recommendPropertiesFlow',
    inputSchema: PropertyRecommendationInputSchema,
    outputSchema: PropertyRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
