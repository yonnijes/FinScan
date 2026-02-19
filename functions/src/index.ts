import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { cleanHtml } from './utils';
import { Transaction } from '../../shared/types';

admin.initializeApp();

// Configuration: API Key should be set in environment or Firebase secrets
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
Actúa como un experto en finanzas personales. Tu tarea es extraer datos estructurados de correos electrónicos de confirmación de gastos y transferencias bancarias chilenas.

REGLAS:
1. Responde únicamente en formato JSON.
2. Categorías permitidas: ["Vivienda", "Alimentos", "Transporte", "Servicios/Suscripciones", "Ocio/Varios", "Otros"].
3. Moneda base: CLP. Si es USD, multiplica por 950 para el campo monto_clp.
`;

export const processEmail = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated.');
  }

  const { emailBody, emailId } = data;
  const uid = context.auth.uid;

  try {
    const cleanBody = cleanHtml(emailBody);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `${SYSTEM_PROMPT}\n\nExtrae los datos de este correo y responde solo en JSON: {monto: number, moneda: "CLP"|"USD", comercio: string, fecha: ISO8601, categoria: string, monto_clp: number}\n\nContenido del correo:\n${cleanBody}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json|```/g, "").trim();

    const jsonData = JSON.parse(text) as Transaction;
    
    // Add metadata
    const transactionData: Transaction = {
      ...jsonData,
      uid,
      sourceEmailId: emailId,
      createdAt: new Date().toISOString()
    };

    // Store in Firestore
    await admin.firestore()
      .collection('users')
      .doc(uid)
      .collection('transactions')
      .add(transactionData);

    return { success: true, transaction: transactionData };
  } catch (error) {
    console.error("Error processing email:", error);
    throw new functions.https.HttpsError('internal', 'Error processing email with IA.');
  }
});
