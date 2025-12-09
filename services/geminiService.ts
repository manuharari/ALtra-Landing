import { GoogleGenAI } from "@google/genai";
import { INITIAL_CONTENT } from "../constants";

// Safely access the key to prevent "process is not defined" crashes if config is missing
const getApiKey = () => {
  try {
    // @ts-ignore
    return process?.env?.API_KEY || '';
  } catch (e) {
    console.warn("API Key not configured in environment variables.");
    return '';
  }
};

const apiKey = getApiKey();

// Initialize the client only if key exists, otherwise we handle it gracefully in the function
// Note: process.env.API_KEY is assumed to be available via Vite define config.
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

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
  if (!ai) {
    return "El sistema de chat no está configurado correctamente (Falta API Key). Por favor contáctanos por teléfono.";
  }

  try {
    // We use a stateless approach for simplicity in this demo, but pass context via system instruction
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