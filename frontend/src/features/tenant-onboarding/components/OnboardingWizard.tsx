import { useState } from 'react';
import { OnboardingService } from '../services/OnboardingService';
import type { Demographics, LifestylePreferences, TenantOnboardingPayload } from '../types/Tenant';

interface WizardProps {
  onGoToLogin: () => void;
  onGoToWelcome: () => void;
}

const HOBBIES_LIST = [
  'Tecnología / PCs', 'Motociclismo / Autos', 'Deportes / Gym', 
  'Videojuegos / Esports', 'Música / Conciertos', 'Lectura / Arte', 
  'Salir de fiesta', 'Cocinar / Gastronomía', 'Viajar / Mochilear'
];

const MUSIC_LIST = [
  'Reggaeton / Urbano', 'Rock / Metal', 'Electrónica / EDM', 
  'Pop / Indie', 'Salsa / Bachata', 'Hip Hop / Rap', 'Clásica / Jazz'
];

export const OnboardingWizard = ({ onGoToLogin, onGoToWelcome }: WizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const [demographics, setDemographics] = useState<Demographics>({
    age: 20,
    originCity: '',
    occupation: 'STUDENT_ONLY',
    hobbies: [],
    musicalTastes: [],
    hasVehicle: 'NONE'
  });

  const [preferences, setPreferences] = useState<LifestylePreferences>({
    maxBudget: 150,
    cleanlinessLevel: 'MODERATE',
    petTolerance: 'NO_PETS',
    studySchedule: 'FLEXIBLE',
    socialHabits: 'OCCASIONAL_GUESTS',
    smokingHabits: 'NON_SMOKER',
    foodSharing: 'SHARE_BASICS',
    noiseTolerance: 'MODERATE_NOISE',
    homeTime: 'BALANCED'
  });

  const handleHobbyToggle = (hobby: string) => {
    setDemographics(prev => ({
      ...prev,
      hobbies: prev.hobbies.includes(hobby) ? prev.hobbies.filter(h => h !== hobby) : [...prev.hobbies, hobby]
    }));
  };

  const handleMusicToggle = (genre: string) => {
    setDemographics(prev => ({
      ...prev,
      musicalTastes: prev.musicalTastes.includes(genre) ? prev.musicalTastes.filter(g => g !== genre) : [...prev.musicalTastes, genre]
    }));
  };

  const finishOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: TenantOnboardingPayload = { email, passwordHash: password, phoneNumber, demographics, preferences };
    
    try {
      await OnboardingService.registerTenant(payload);
      alert('¡Perfil creado con éxito! IA inicializada. Inicia sesión para ver tus matches.');
      onGoToLogin();
    } catch (error) {
      alert('Hubo un problema registrando tu perfil.');
    }
  };

  const inputStyle = {
    padding: '0.8rem', borderRadius: '10px', border: '1px solid #333', backgroundColor: '#1e2329', color: 'white', fontSize: '0.95rem', outline: 'none', width: '100%', boxSizing: 'border-box' as const
  };

  const badgeStyle = (isSelected: boolean) => ({
    padding: '0.5rem 1rem', borderRadius: '20px', cursor: 'pointer', fontSize: '0.85rem', transition: 'all 0.2s',
    border: isSelected ? 'none' : '1px solid #4facfe',
    backgroundColor: isSelected ? '#4facfe' : 'transparent',
    color: isSelected ? '#000' : '#4facfe',
    fontWeight: isSelected ? ('bold' as const) : ('normal' as const)
  });

  return (
    <div style={{ backgroundColor: '#111418', color: 'white', minHeight: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: currentStep === 3 ? '600px' : '480px', width: '100%', textAlign: 'center', transition: 'max-width 0.3s' }}>
        
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', background: 'linear-gradient(45deg, #00f2fe, #4facfe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Crea tu Perfil
        </h2>
        <p style={{ color: '#a0a0a0', marginBottom: '2rem' }}>Paso {currentStep} de 3</p>

        {/* PASO 1: CREDENCIALES Y CONTACTO */}
        {currentStep === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); setCurrentStep(2); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <input type="email" placeholder="Correo universitario" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
            <input type="tel" placeholder="Número de WhatsApp (Ej: 099xxxxxxx)" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required style={inputStyle} />
            <input type="password" placeholder="Crea una contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} />
            
            <button type="submit" style={{ padding: '1rem', borderRadius: '30px', border: 'none', backgroundColor: 'white', color: 'black', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem' }}>
              Siguiente: Tu Personalidad ✨
            </button>
            <button type="button" onClick={onGoToWelcome} style={{ padding: '0.8rem', borderRadius: '30px', border: '1px solid #555', backgroundColor: 'transparent', color: '#aaa', cursor: 'pointer' }}>Volver al Inicio</button>
          </form>
        )}

        {/* PASO 2: DEMOGRAFÍA, VEHÍCULO Y MÚSICA */}
        {currentStep === 2 && (
          <form onSubmit={(e) => { e.preventDefault(); setCurrentStep(3); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', textAlign: 'left' }}>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#ddd', fontSize: '0.9rem' }}>Edad</label>
                <input type="number" min="16" max="99" value={demographics.age} onChange={(e) => setDemographics({...demographics, age: Number(e.target.value)})} required style={inputStyle} />
              </div>
              <div style={{ flex: 2 }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#ddd', fontSize: '0.9rem' }}>¿De qué ciudad eres?</label>
                <input type="text" placeholder="Ej: Quito, Ambato..." value={demographics.originCity} onChange={(e) => setDemographics({...demographics, originCity: e.target.value})} required style={inputStyle} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#ddd', fontSize: '0.9rem' }}>¿A qué te dedicas?</label>
                <select value={demographics.occupation} onChange={(e) => setDemographics({...demographics, occupation: e.target.value as any})} style={inputStyle}>
                  <option value="STUDENT_ONLY">Solo estudio</option>
                  <option value="WORKING_ONLY">Solo trabajo</option>
                  <option value="STUDENT_AND_WORKING">Estudio y trabajo</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#ddd', fontSize: '0.9rem' }}>¿Tienes vehículo? (Parqueo)</label>
                <select value={demographics.hasVehicle} onChange={(e) => setDemographics({...demographics, hasVehicle: e.target.value as any})} style={inputStyle}>
                  <option value="NONE">No tengo vehículo 🚶</option>
                  <option value="MOTORCYCLE">Tengo motocicleta 🏍️</option>
                  <option value="CAR">Tengo automóvil 🚗</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', color: '#ddd', fontSize: '0.9rem' }}>Tus Hobbies (Selecciona varios)</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {HOBBIES_LIST.map(h => (
                  <button key={h} type="button" onClick={() => handleHobbyToggle(h)} style={badgeStyle(demographics.hobbies.includes(h))}>{h}</button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', color: '#ddd', fontSize: '0.9rem' }}>¿Qué música escuchas? (Para los audífonos o la sala)</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {MUSIC_LIST.map(g => (
                  <button key={g} type="button" onClick={() => handleMusicToggle(g)} style={badgeStyle(demographics.musicalTastes.includes(g))}>{g}</button>
                ))}
              </div>
            </div>

            <button type="submit" style={{ padding: '1rem', borderRadius: '30px', border: 'none', backgroundColor: 'white', color: 'black', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem', textAlign: 'center' }}>
              Siguiente: Reglas de convivencia 🏠
            </button>
            <button type="button" onClick={() => setCurrentStep(1)} style={{ padding: '0.8rem', borderRadius: '30px', border: 'none', backgroundColor: 'transparent', color: '#aaa', cursor: 'pointer', textAlign: 'center' }}>Volver atrás</button>
          </form>
        )}

        {/* PASO 3: HÁBITOS DE CONVIVENCIA */}
        {currentStep === 3 && (
          <form onSubmit={finishOnboarding} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ddd', fontSize: '0.9rem' }}>Presupuesto Mensual ($)</label>
                <input type="number" value={preferences.maxBudget} onChange={(e) => setPreferences({...preferences, maxBudget: Number(e.target.value)})} required style={inputStyle} />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ddd', fontSize: '0.9rem' }}>Nivel de Orden</label>
                <select value={preferences.cleanlinessLevel} onChange={(e) => setPreferences({...preferences, cleanlinessLevel: e.target.value as any})} style={inputStyle}>
                  <option value="IMMACULATE">Impecable siempre 🧹</option>
                  <option value="MODERATE">Limpio mis cosas 👕</option>
                  <option value="RELAXED">Relajado, sin estrés 🌪️</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ddd', fontSize: '0.9rem' }}>Visitas y Vida Social</label>
                <select value={preferences.socialHabits} onChange={(e) => setPreferences({...preferences, socialHabits: e.target.value as any})} style={inputStyle}>
                  <option value="PARTY_HOUSE">Casa abierta / Fiestas 🎉</option>
                  <option value="OCCASIONAL_GUESTS">Visitas ocasionales ☕</option>
                  <option value="STRICTLY_PRIVATE">Mi templo, cero visitas 🤫</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ddd', fontSize: '0.9rem' }}>Tolerancia al Ruido</label>
                <select value={preferences.noiseTolerance} onChange={(e) => setPreferences({...preferences, noiseTolerance: e.target.value as any})} style={inputStyle}>
                  <option value="SILENCE_NEEDED">Silencio absoluto 🎧</option>
                  <option value="MODERATE_NOISE">Ruido normal de depa 📺</option>
                  <option value="LOUD_OK">Música alta sin lío 🎸</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ddd', fontSize: '0.9rem' }}>Rutina Diaria (¿Cuánto pasas en casa?)</label>
                <select value={preferences.homeTime} onChange={(e) => setPreferences({...preferences, homeTime: e.target.value as any})} style={inputStyle}>
                  <option value="BALANCED">Normal (salgo a estudiar/trabajar) 🎒</option>
                  <option value="STAYS_ALL_DAY">Paso todo el día adentro (Remoto) 💻</option>
                  <option value="ONLY_NIGHTS">Solo llego a dormir por las noches 🌙</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ddd', fontSize: '0.9rem' }}>¿Tabaco o Vapers?</label>
                <select value={preferences.smokingHabits} onChange={(e) => setPreferences({...preferences, smokingHabits: e.target.value as any})} style={inputStyle}>
                  <option value="NON_SMOKER">Prohibido fumar 🚭</option>
                  <option value="OUTSIDE_ONLY">Solo en balcón/patio 🌬️</option>
                  <option value="SMOKER">Fumador adentro 🚬</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ddd', fontSize: '0.9rem' }}>Comida y Compras</label>
                <select value={preferences.foodSharing} onChange={(e) => setPreferences({...preferences, foodSharing: e.target.value as any})} style={inputStyle}>
                  <option value="SHARE_EVERYTHING">Compramos y compartimos 🍲</option>
                  <option value="SHARE_BASICS">Solo básicos (sal, aceite) 🧂</option>
                  <option value="STRICTLY_SEPARATE">Cada quien su repisa 🚫</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ddd', fontSize: '0.9rem' }}>Mascotas</label>
                <select value={preferences.petTolerance} onChange={(e) => setPreferences({...preferences, petTolerance: e.target.value as any})} style={inputStyle}>
                  <option value="PET_FRIENDLY">Soy Pet Friendly 🐶</option>
                  <option value="NO_PETS">Sin mascotas 🚫</option>
                </select>
              </div>

            </div>

            <button type="submit" style={{ padding: '1rem', borderRadius: '30px', border: 'none', backgroundColor: 'white', color: 'black', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '1.2rem', textAlign: 'center' }}>
              Finalizar Registro
            </button>
            <button type="button" onClick={() => setCurrentStep(2)} style={{ padding: '0.8rem', borderRadius: '30px', border: 'none', backgroundColor: 'transparent', color: '#aaa', cursor: 'pointer', textAlign: 'center' }}>Volver atrás</button>
          </form>
        )}
      </div>
    </div>
  );
};