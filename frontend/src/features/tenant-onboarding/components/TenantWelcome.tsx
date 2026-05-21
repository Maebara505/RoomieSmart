interface TenantWelcomeProps {
  onSelectLogin: () => void;
  onSelectRegister: () => void;
}

export const TenantWelcome = ({ onSelectLogin, onSelectRegister }: TenantWelcomeProps) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      width: '100vw',
      backgroundColor: '#111418', // Fondo oscuro tipo app moderna
      color: 'white',
      padding: '2rem',
      boxSizing: 'border-box'
    }}>
      
      {/* Aquí podrías poner el logo de RoomieSmart más adelante */}
      <h1 style={{ 
        fontSize: '3.5rem', 
        margin: '0 0 0.5rem 0', 
        background: 'linear-gradient(45deg, #00f2fe, #4facfe)', 
        WebkitBackgroundClip: 'text', 
        WebkitTextFillColor: 'transparent',
        lineHeight: '1.2', // <-- Esto evita que se corte por arriba/abajo
        padding: '0.1em 0' // <-- Esto le da respiro al gradiente
        }}>
  RoomieSmart
</h1>
      <p style={{ fontSize: '1.2rem', color: '#a0a0a0', marginBottom: '4rem' }}>
        Conecta. Comparte. Crece.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '350px' }}>
        <button 
          onClick={onSelectRegister} 
          style={{ 
            padding: '1rem', 
            borderRadius: '30px', 
            border: 'none', 
            backgroundColor: 'white', 
            color: 'black', 
            fontSize: '1.1rem', 
            fontWeight: 'bold', 
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        >
          Crear cuenta
        </button>
        
        <button 
          onClick={onSelectLogin} 
          style={{ 
            padding: '1rem', 
            borderRadius: '30px', 
            border: '2px solid white', 
            backgroundColor: 'transparent', 
            color: 'white', 
            fontSize: '1.1rem', 
            fontWeight: 'bold', 
            cursor: 'pointer'
          }}
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
};