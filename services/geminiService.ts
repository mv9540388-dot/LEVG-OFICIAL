
import { GoogleGenAI } from "@google/genai";

// Fix: Initializing with apiKey from process.env.API_KEY directly as required.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiResponse = async (userPrompt: string) => {
  try {
    // Fix: Using ai.models.generateContent with appropriate model and text parts.
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `Eres el asistente oficial de LEVG Inversión Perú.
        Tu objetivo es ayudar a los usuarios con dudas sobre:
        1. Cómo invertir (desde 20 soles en edificios y casas).
        2. Procesos de recarga (Yape, BCP a nombre de Thalia Salazar).
        3. Procesos de retiro (24/7).
        4. Programas VIP y equipos.
        Responde siempre de forma profesional, amable and motivadora en español peruano si es posible.
        No des consejos financieros reales fuera de la plataforma LEVG.`,
        temperature: 0.7,
      },
    });
    // Fix: Accessing .text property directly instead of method or complex chaining.
    return response.text || "Lo siento, tuve un problema procesando tu solicitud.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error al conectar con el servidor de IA. Por favor intenta más tarde.";
  }
};
