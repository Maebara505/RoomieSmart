import type { TenantLoginPayload, TenantOnboardingPayload } from '../types/Tenant';
const API_URL = 'http://localhost:3000/api/v1'; // Endpoint simulado

export const OnboardingService = {
  loginTenant: async (credentials: TenantLoginPayload) => {
    console.log('Validando Tenant:', credentials);
    // Simulación de éxito
    return { jwt: 'token_simulado_roomiesmart' }; 
  },

  registerTenant: async (payload: TenantOnboardingPayload) => {
    console.log('Enviando datos para Embeddings IA:', payload);
    // Simulación de creación exitosa
    return { success: true };
  }
};