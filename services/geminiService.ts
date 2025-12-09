import { GoogleGenAI } from "@google/genai";
import { INITIAL_CONTENT } from "../constants";

// Initialize the client. 
// Note: process.env.API_KEY is assumed to be available in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Eres "Altra AI", el asistente virtual experto de Altra Pisos, una empresa mexicana líder en soluciones de pisos premium.
Tu tono es profesional, sofisticado, pero amable y servicial (en español).

Información Clave de Productos (Usa esto para responder):
${INITIAL_CONTENT.products.map(p => `- ${p.name}: ${p.description}. Usos: ${p.applications.join(', ')}. Características: ${p.features.join(', ')}.`).join('\n')}

Reglas:
1. Responde preguntas sobre qué piso usar en situaciones específicas (ej: "¿Qué piso recomiendas para un quirófano?" -> Piso Conductivo).
2. Si preguntan precios, di que dependen del metraje y la instalación, e invítalos a usar la sección de Contacto para una cotización formal.
3. Sé conciso.
4. Responde siempre en Español.
5. La empresa tiene más de 15 años de experiencia.
`;

export const sendMessageToGemini = async (userMessage: string, history: {role: string, parts: string[]}[] = []): Promise<string> => {
  try {
    // We use a stateless approach for simplicity in this demo, but pass context via system instruction
    // In a full implementation, we would maintain a proper chat session object.
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "Disculpa, no pude procesar tu solicitud en este momento.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "Lo siento, hubo un error de conexión. Por favor intenta más tarde o contáctanos directamente.";
  }
};