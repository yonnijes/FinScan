/**
 * Shared types for FinScan (Mobile & Backend)
 */

export type Category = 
  | "Vivienda" 
  | "Alimentos" 
  | "Transporte" 
  | "Servicios/Suscripciones" 
  | "Ocio/Varios" 
  | "Otros";

export type Currency = "CLP" | "USD";

export interface Transaction {
  id?: string;
  uid: string;
  monto: number;
  moneda: Currency;
  comercio: string;
  fecha: string; // ISO8601 string
  categoria: Category;
  monto_clp: number; // Normalizado a CLP
  createdAt: string; // ISO8601
  sourceEmailId?: string; // Referencia al ID de Gmail
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  preferences: {
    monthlyBudget?: number;
    currency: Currency;
  };
}
