import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { StatusBar } from 'expo-status-bar';
import { Wallet, Bell, History, ArrowUpRight } from 'lucide-react-native';
import { Transaction } from '../shared/types';

WebBrowser.maybeCompleteAuthSession();

// Mock data para previsualizar la estética Fintech
const MOCK_TRANSACTIONS: Partial<Transaction>[] = [
  { id: '1', comercio: 'UNIMARC', monto_clp: 14297, fecha: '2026-02-15', categoria: 'Alimentos' },
  { id: '2', comercio: 'Netflix', monto_clp: 8990, fecha: '2026-02-14', categoria: 'Servicios/Suscripciones' },
  { id: '3', comercio: 'Uber', monto_clp: 5500, fecha: '2026-02-13', categoria: 'Transporte' },
];

export default function App() {
  const [token, setToken] = useState<string | null>(null);

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
    }
  }, [response]);

  const renderTransaction = ({ item }: { item: Partial<Transaction> }) => (
    <View style={styles.transactionCard}>
      <View style={styles.iconCircle}>
        <History size={20} color="#666" />
      </View>
      <View style={styles.transactionInfo}>
        <Text style={styles.merchantText}>{item.comercio}</Text>
        <Text style={styles.categoryText}>{item.categoria}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amountText}>-${item.monto_clp?.toLocaleString('es-CL')}</Text>
        <Text style={styles.dateText}>{item.fecha}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {!token ? (
        <View style={styles.loginContent}>
          <Wallet size={64} color="#10b981" />
          <Text style={styles.heroTitle}>FinScan</Text>
          <Text style={styles.heroSubtitle}>Gasto Cero Esfuerzo</Text>
          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={() => promptAsync()}
            disabled={!request}
          >
            <Text style={styles.loginButtonText}>Iniciar sesión con Google</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.dashboard}>
          <View style={styles.header}>
            <View>
              <Text style={styles.welcomeText}>Hola, Yonni 👋</Text>
              <Text style={styles.balanceTitle}>Gasto total del mes</Text>
              <Text style={styles.balanceAmount}>$28.787</Text>
            </View>
            <TouchableOpacity style={styles.notificationBtn}>
              <Bell size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Actividad Reciente</Text>
            <ArrowUpRight size={20} color="#10b981" />
          </View>

          <FlatList
            data={MOCK_TRANSACTIONS}
            renderItem={renderTransaction}
            keyExtractor={item => item.id!}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loginContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heroTitle: {
    fontSize: 40,
    fontWeight: '800',
    color: '#111827',
    marginTop: 20,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: '#111827',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  dashboard: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 30,
    marginTop: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  balanceTitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '800',
    color: '#111827',
  },
  notificationBtn: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  listContent: {
    paddingBottom: 20,
  },
  transactionCard: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  merchantText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  categoryText: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 2,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#EF4444', // Rojo para gastos
  },
  dateText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
});
