# Flujo de Autenticación y Autorización (OAuth 2.0)

FinScan utiliza el estándar OAuth 2.0 para garantizar que el usuario nunca tenga que compartir sus credenciales directamente y que el proceso de obtención de datos sea transparente y seguro.

## 🔐 ¿Cómo funciona?

1.  **Consentimiento del Usuario:** Al pulsar "Iniciar Sesión", la App redirige al usuario a la página oficial de Google. Allí, el usuario ve los permisos solicitados (`gmail.readonly`).
2.  **Generación de la Llave (Access Token):** Una vez que el usuario acepta, Google entrega a la aplicación una "llave digital" temporal. Esta llave solo sirve para lo que el usuario autorizó y tiene una duración limitada.
3.  **Comunicación con Gmail:** La aplicación (o el backend) utiliza esa llave para consultar la API de Gmail. Gmail verifica la validez de la llave y entrega el contenido del correo.
4.  **Seguridad:** En ningún momento FinScan guarda la contraseña del usuario. Si el usuario decide revocar el permiso, la llave deja de funcionar inmediatamente.

## 🛠 Configuración Técnica
Para habilitar este flujo, se requieren los `ClientIDs` configurados en Google Cloud Console para las plataformas iOS, Android y Web.
