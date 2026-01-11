
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getSmartAssistantResponse = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a Galaxy Tab Smart Assistant. You help users manage their workflow, summarize phone notifications, and provide quick productivity tips. Keep answers concise and helpful for a tablet user.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the AI brain right now. Please try again.";
  }
};
