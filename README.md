# FinScan 🧙‍♂️✨

Elimina el registro manual de gastos. **Gasto Cero Esfuerzo.**

FinScan es una aplicación móvil que solicita acceso de lectura a Gmail, busca comprobantes de bancos y utiliza un LLM para extraer montos y categorías, presentándolos en un dashboard mensual.

## 🚀 Stack Tecnológico
- **Frontend:** React Native + Expo
- **Auth:** Google OAuth 2.0 (Scopes: `gmail.readonly`, `userinfo.email`)
- **Backend:** Firebase Functions (Node.js)
- **IA:** Gemini 1.5 Flash API
- **Base de Datos:** Cloud Firestore (NoSQL)

## 🛠 Arquitectura del Sistema
1. **Login:** Google OAuth 2.0.
2. **Fetch:** API de Gmail (filtros bancarios).
3. **Extract:** Gemini 1.5 Flash procesa el HTML/Texto a JSON.
4. **Store:** Persistencia en Firestore.

## 📈 Hoja de Ruta
- [ ] **SET 1: EL MOTOR** (Auth, Login, Gmail API Test)
- [ ] **SET 2: EL CEREBRO** (Backend, Gemini Integration, Firestore)
- [ ] **SET 3: LA INTERFAZ** (Dashboard, Alertas)
