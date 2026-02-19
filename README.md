# FinScan 🧙‍♂️✨

Elimina el registro manual de gastos. **Gasto Cero Esfuerzo.**

FinScan es una aplicación móvil (React Native + Expo) que solicita acceso de lectura a Gmail, busca comprobantes de bancos y utiliza un LLM (Gemini 1.5 Flash) para extraer montos y categorías, presentándolos en un dashboard mensual automatizado.

## 📂 Documentación del Proyecto
Hemos organizado toda la visión y técnica del producto en la carpeta `/docs`:

- [🏗 **Arquitectura y Flujo de Datos**](docs/ARCHITECTURE.md): Stack tecnológico y pipeline de información.
- [🧠 **Sistema de IA**](docs/AI_SYSTEM.md): Especificación del Prompt y extracción de datos.
- [🔐 **Flujo de Auth**](docs/AUTH_FLOW.md): Explicación del sistema OAuth 2.0 y seguridad.
- [📈 **Hoja de Ruta**](docs/ROADMAP.md): Seguimiento de avance por Sets.

## 🚀 Inicio Rápido (Desarrollo)
1. Clona el repo.
2. `cd mobile && npm install` para el frontend.
3. `cd functions && npm install` para el backend.

---
*Diseñado por Yonni & Eurekka 🧙‍♂️*
