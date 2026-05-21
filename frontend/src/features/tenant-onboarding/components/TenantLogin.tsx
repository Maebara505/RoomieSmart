import { useState } from 'react';
import { OnboardingService } from '../services/OnboardingService';

interface TenantLoginProps {
  onGoToOnboarding: () => void;
  onGoToWelcome: () => void; // Agregamos la opción de volver
}

export const TenantLogin = ({ onGoToOnboarding, onGoToWelcome }: TenantLoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await OnboardingService.loginTenant({ email, passwordHash: password });
      localStorage.setItem('roomieSmart_jwt', response.jwt);
      alert('¡Bienvenido a RoomieSmart! Redirigiendo a tu dashboard...');
    } catch (error) {
      alert('Credenciales incorrectas');
    }
  };

  const inputStyle = {
    padding: '1rem',
    borderRadius: '10px',
    border: '1px solid #333',
    backgroundColor: '#1e2329',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box' as const
  };

  return (
    <div style={{ 
      backgroundColor: '#111418', 
      color: 'white', 
      minHeight: '100vh', 
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', background: 'linear-gradient(45deg, #00f2fe, #4facfe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Bienvenido de vuelta
        </h2>
        <p style={{ color: '#a0a0a0', marginBottom: '2rem' }}>Ingresa tus credenciales para continuar</p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <input 
            type="email" 
            placeholder="Correo universitario" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            style={inputStyle}
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            style={inputStyle}
          />
          
          <button type="submit" style={{ 
            padding: '1rem', borderRadius: '30px', border: 'none', backgroundColor: 'white', color: 'black', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem'
          }}>
            Iniciar Sesión
          </button>
        </form>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button onClick={onGoToOnboarding} style={{ flex: 1, padding: '0.8rem', borderRadius: '30px', border: '1px solid #4facfe', backgroundColor: 'transparent', color: '#4facfe', cursor: 'pointer', fontWeight: 'bold' }}>
            Registrarme
          </button>
          <button onClick={onGoToWelcome} style={{ flex: 1, padding: '0.8rem', borderRadius: '30px', border: '1px solid #555', backgroundColor: 'transparent', color: '#aaa', cursor: 'pointer' }}>
            Volver al Inicio
          </button>
        </div>
        
      </div>
    </div>
  );
};