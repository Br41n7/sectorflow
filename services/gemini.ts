
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Initialized GoogleGenAI strictly using process.env.API_KEY as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface StyleRecommendation {
  fabricSuggestion: string;
  patternSuggestion: string;
  reasoning: string;
  accessories: string[];
}

export const getStyleConsultation = async (prompt: string): Promise<StyleRecommendation> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are a world-class bespoke tailoring style consultant. Given a client's request or occasion, suggest fabric (weight, composition, origin), pattern, and styling tips. Return a structured JSON response.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fabricSuggestion: { type: Type.STRING },
            patternSuggestion: { type: Type.STRING },
            reasoning: { type: Type.STRING },
            accessories: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["fabricSuggestion", "patternSuggestion", "reasoning", "accessories"]
        }
      }
    });

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("AI Consultation Error:", error);
    throw error;
  }
};
