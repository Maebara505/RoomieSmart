import { useState } from 'react';
import { OnboardingService } from '../services/OnboardingService';
import type { LifestylePreferences, TenantOnboardingPayload } from '../types/Tenant';

interface WizardProps {
  onGoToLogin: () => void;
  onGoToWelcome: () => void;
}

export const OnboardingWizard = ({ onGoToLogin, onGoToWelcome }: WizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [preferences, setPreferences] = useState<LifestylePreferences>({
    maxBudget: 150,
    cleanlinessLevel: 'MODERATE',
    petTolerance: 'NO_PETS',
    studySchedule: 'FLEXIBLE',
  });

  const finishOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: TenantOnboardingPayload = { email, passwordHash: password, preferences };
    
    try {
      await OnboardingService.registerTenant(payload);
      alert('¡Perfil creado! Tu información está lista para el Matchmaking. Inicia sesión.');
      onGoToLogin();
    } catch (error) {
      alert('Hubo un problema registrando tu perfil.');
    }
  };

  // Estilos compartidos para inputs y selects
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
        
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', background: 'linear-gradient(45deg, #00f2fe, #4facfe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Tu Perfil de Convivencia
        </h2>
        <p style={{ color: '#a0a0a0', marginBottom: '2rem' }}>Paso {currentStep} de 2</p>

        {currentStep === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); setCurrentStep(2); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            
            <input 
              type="email" 
              placeholder="Correo institucional" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={inputStyle}
            />
            
            <input 
              type="password" 
              placeholder="Crea una contraseña" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={inputStyle}
            />
            
            <button type="submit" style={{ 
              padding: '1rem', borderRadius: '30px', border: 'none', backgroundColor: 'white', color: 'black', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem'
            }}>
              Continuar al Matchmaking
            </button>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button type="button" onClick={onGoToLogin} style={{ flex: 1, padding: '0.8rem', borderRadius: '30px', border: '1px solid #4facfe', backgroundColor: 'transparent', color: '#4facfe', cursor: 'pointer', fontWeight: 'bold' }}>
                Ya tengo cuenta
              </button>
              <button type="button" onClick={onGoToWelcome} style={{ flex: 1, padding: '0.8rem', borderRadius: '30px', border: '1px solid #555', backgroundColor: 'transparent', color: '#aaa', cursor: 'pointer' }}>
                Volver al Inicio
              </button>
            </div>
          </form>
        )}

        {currentStep === 2 && (
          <form onSubmit={finishOnboarding} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', textAlign: 'left' }}>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ddd' }}>Presupuesto Máximo ($)</label>
              <input type="number" value={preferences.maxBudget} onChange={(e) => setPreferences({...preferences, maxBudget: Number(e.target.value)})} required style={inputStyle} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ddd' }}>Nivel de Orden en Casa</label>
              <select value={preferences.cleanlinessLevel} onChange={(e) => setPreferences({...preferences, cleanlinessLevel: e.target.value as any})} style={inputStyle}>
                <option value="IMMACULATE">Impecable siempre</option>
                <option value="MODERATE">Limpio mis propias cosas</option>
                <option value="RELAXED">Relajado, sin estrés</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ddd' }}>Tolerancia a Mascotas</label>
              <select value={preferences.petTolerance} onChange={(e) => setPreferences({...preferences, petTolerance: e.target.value as any})} style={inputStyle}>
                <option value="PET_FRIENDLY">Soy Pet Friendly 🐶</option>
                <option value="NO_PETS">Prefiero sin mascotas 🚫</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ddd' }}>Horario Principal de Estudio</label>
              <select value={preferences.studySchedule} onChange={(e) => setPreferences({...preferences, studySchedule: e.target.value as any})} style={inputStyle}>
                <option value="EARLY_BIRD">Madrugo a estudiar 🌅</option>
                <option value="NIGHT_OWL">Estudio de madrugada 🦉</option>
                <option value="FLEXIBLE">Tengo horarios flexibles 📅</option>
              </select>
            </div>

            <button type="submit" style={{ padding: '1rem', borderRadius: '30px', border: 'none', backgroundColor: 'white', color: 'black', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem' }}>
              Finalizar Registro
            </button>
            <button type="button" onClick={() => setCurrentStep(1)} style={{ padding: '0.8rem', borderRadius: '30px', border: 'none', backgroundColor: 'transparent', color: '#aaa', cursor: 'pointer', textDecoration: 'underline' }}>
              Volver al paso anterior
            </button>
          </form>
        )}
      </div>
    </div>
  );
};