import { useState } from 'react';
import { TenantWelcome } from './features/tenant-onboarding/components/TenantWelcome';
import { TenantLogin } from './features/tenant-onboarding/components/TenantLogin';
import { OnboardingWizard } from './features/tenant-onboarding/components/OnboardingWizard';

function App() {
  const [activeView, setActiveView] = useState<'welcome' | 'login' | 'onboarding'>('welcome');

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {activeView === 'welcome' && (
        <TenantWelcome 
          onSelectLogin={() => setActiveView('login')} 
          onSelectRegister={() => setActiveView('onboarding')} 
        />
      )}

     {activeView === 'login' && (
        <TenantLogin 
          onGoToOnboarding={() => setActiveView('onboarding')} 
          onGoToWelcome={() => setActiveView('welcome')} 
        />
      )}
      {activeView === 'onboarding' && (
        <OnboardingWizard 
          onGoToLogin={() => setActiveView('login')} 
          onGoToWelcome={() => setActiveView('welcome')} // <-- Vinculamos la navegación aquí
        />
      )}

    </div>
  );
}

export default App;