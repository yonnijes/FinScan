# Arquitectura de Sistema (Stack) y Flujo de Datos

## 🏗 Stack Tecnológico
Para un desarrollo ágil y de bajo costo (estilo "Effective Reps"):

- **Frontend:** React Native + Expo (Facilidad de testeo en iOS/Android).
- **Auth:** Google OAuth 2.0 (Scopes: `gmail.readonly` y `userinfo.email`).
- **Backend:** Firebase Functions (Node.js) para procesar la lógica pesada fuera del móvil.
- **IA:** Gemini 1.5 Flash API (Alta velocidad y bajo costo para leer HTML).
- **Base de Datos:** Cloud Firestore (NoSQL para persistencia de transacciones).

## 🔄 Flujo de Datos (Data Pipeline)
1.  **Login:** El usuario se loguea con Google y otorga permiso de lectura de correos (`gmail.readonly`).
2.  **Fetch:** La app llama a la API de Gmail con un filtro: `from:(bci.cl OR bice.cl) "comprobante"`.
3.  **Clean:** Se envía el cuerpo del correo (HTML/Text) a una Firebase Function.
4.  **Extract:** La IA (Gemini) procesa el texto con el prompt de sistema optimizado.
5.  **Store:** El JSON resultante se guarda en Firestore bajo el `uid` del usuario.

## 🔒 Seguridad y Privacidad
- **Privacidad:** Solo se procesan correos que coincidan con los remitentes bancarios.
- **No Almacenamiento de Crudos:** No se almacena el contenido del correo completo, solo los datos financieros extraídos.
- **Aislamiento:** Las reglas de Firestore garantizan que solo el dueño de los datos pueda leer su colección.
