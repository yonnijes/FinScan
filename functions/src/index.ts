import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { GoogleGenerativeAI } from "@google/generative-ai";

admin.initializeApp();

// Configuración de Gemini (La API Key se debe configurar en Firebase)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const processEmail = functions.https.onCall(async (data, context) => {
  // 1. Verificar autenticación
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'El usuario debe estar autenticado.');
  }

  const { emailBody } = data;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Aquí iría el prompt configurado en ai_engine_spec.md
    const prompt = `Extrae datos financieros de este correo: ${emailBody}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 2. Parsear JSON y Guardar en Firestore
    // const jsonData = JSON.parse(text);
    // await admin.firestore().collection('users').doc(context.auth.uid).collection('transactions').add(jsonData);

    return { success: true, data: text };
  } catch (error) {
    console.error("Error procesando email:", error);
    throw new functions.https.HttpsError('internal', 'Error al procesar el correo con IA.');
  }
});
