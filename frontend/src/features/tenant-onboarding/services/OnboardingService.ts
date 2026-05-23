import type { TenantOnboardingPayload, TenantLoginPayload } from '../types/Tenant';

// Cuando Ricardo monte el servidor en AWS, aquí cambiarás el localhost por la IP pública
const API_BASE_URL = 'http://localhost:3000/api/v1'; 

export const OnboardingService = {
  // Función para registrar al usuario e iniciar su perfil de IA
  registerTenant: async (payload: TenantOnboardingPayload): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // ¡Aquí está el truco! Si el backend responde con un error (como correo duplicado)
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      // Lanzamos un error con el mensaje que nos mande Esteban desde el backend
      throw new Error(errorData.message || 'Error en el registro');
    }
  },

  // Función para el Login
  loginTenant: async (payload: TenantLoginPayload): Promise<{ jwt: string }> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Credenciales incorrectas');
    }

    return response.json(); // Retorna el token JWT si todo sale bien
  }
};

//Al lucho le gusta la J y la guayas  adasdasda