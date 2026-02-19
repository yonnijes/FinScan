import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { StatusBar } from 'expo-status-bar';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);

  // Reemplazar con los IDs de Google Cloud Console cuando los tengas
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "ANDROID_CLIENT_ID_PLACEHOLDER",
    iosClientId: "IOS_CLIENT_ID_PLACEHOLDER",
    webClientId: "WEB_CLIENT_ID_PLACEHOLDER",
    scopes: ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/userinfo.email']
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      setToken(authentication?.accessToken ?? null);
      console.log('Access Token:', authentication?.accessToken);
      // Aquí llamaríamos a la función para obtener info del usuario o enviarlo al backend
    }
  }, [response]);

  return (
    <View style={styles.center}>
      <Text style={styles.title}>FinScan 🧙‍♂️</Text>
      <Text style={styles.subtitle}>Gasto Cero Esfuerzo</Text>
      
      {!token ? (
        <Button
          disabled={!request}
          title="Iniciar sesión con Google"
          onPress={() => promptAsync()}
        />
      ) : (
        <View>
          <Text style={styles.success}>¡Sesión Iniciada!</Text>
          <Text style={styles.info}>Token listo para procesar Gmail.</Text>
        </View>
      )}
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40
  },
  success: {
    fontSize: 20,
    color: 'green',
    fontWeight: 'bold'
  },
  info: {
    marginTop: 10,
    color: '#333'
  }
});
