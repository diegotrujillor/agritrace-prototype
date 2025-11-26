import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, MapPin, Calendar, Camera, Download, Search, Leaf, Droplets, Scissors, Package, Menu, Bell, Plus, QrCode, Check, CloudOff, X } from 'lucide-react';

// ============================================================================
// DESIGN TOKENS - Sistema de Diseño AgriTrace
// ============================================================================

const colors = {
  verdePrimario: '#2D7A3E',
  verdeOscuro: '#1B5028',
  verdeClaro: '#E8F5E9',
  cafeTierra: '#6D4C3D',
  amarilloCosecha: '#F9A825',
  azulCertificacion: '#1976D2',
  error: '#D32F2F',
  warning: '#F57C00',
  success: '#388E3C',
  info: '#0288D1',
  negro: '#212121',
  grisOscuro: '#424242',
  grisMedio: '#757575',
  grisClaro: '#E0E0E0',
  grisMuyClaro: '#F5F5F5',
  blanco: '#FFFFFF',
};

// ============================================================================
// APP PRINCIPAL - AgriTrace Prototype
// ============================================================================

export default function AgriTracePrototype() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [isAnimating, setIsAnimating] = useState(false);

  const navigateTo = (screen) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentScreen(screen);
      setIsAnimating(false);
    }, 300);
  };

  // Auto-navigate from splash
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => navigateTo('welcome'), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const screens = {
    splash: <SplashScreen />,
    welcome: <WelcomeScreen onNavigate={navigateTo} />,
    login: <LoginScreen onNavigate={navigateTo} />,
    register: <RegisterScreen onNavigate={navigateTo} />,
    registerFinca: <RegisterFincaScreen onNavigate={navigateTo} />,
    vistaLote: <VistaLoteScreen onNavigate={navigateTo} />,
    registrarActividad: <RegistrarActividadScreen onNavigate={navigateTo} />,
    generarQR: <GenerarQRScreen onNavigate={navigateTo} />,
    paginaPublica: <PaginaPublicaScreen onNavigate={navigateTo} />,
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      {/* Phone Frame */}
      <div className="relative">
        {/* Phone bezel */}
        <div className="absolute -inset-3 bg-gray-800 rounded-[3rem] shadow-2xl" />
        
        {/* Screen container */}
        <div 
          className="relative w-[375px] h-[812px] bg-white rounded-[2.5rem] overflow-hidden shadow-inner"
          style={{ 
            transition: 'opacity 0.3s ease-in-out',
            opacity: isAnimating ? 0 : 1 
          }}
        >
          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 h-11 bg-transparent z-50 flex items-center justify-between px-8">
            <span className="text-xs font-medium" style={{ color: colors.negro }}>9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 border border-current rounded-sm">
                <div className="w-3/4 h-full bg-current rounded-sm" />
              </div>
            </div>
          </div>

          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-gray-800 rounded-b-3xl z-50" />

          {/* Screen content */}
          <div className="h-full pt-11 overflow-hidden">
            {screens[currentScreen]}
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-300 rounded-full" />
        </div>
      </div>

      {/* Navigation helper */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg p-3 shadow-lg max-w-xs">
        <p className="text-xs font-medium text-gray-600 mb-2">Navegación rápida:</p>
        <div className="flex flex-wrap gap-1">
          {Object.keys(screens).map((screen) => (
            <button
              key={screen}
              onClick={() => navigateTo(screen)}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                currentScreen === screen 
                  ? 'text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={{ 
                backgroundColor: currentScreen === screen ? colors.verdePrimario : undefined 
              }}
            >
              {screen}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENTES REUTILIZABLES
// ============================================================================

const Button = ({ children, variant = 'primary', onClick, icon: Icon, className = '' }) => {
  const baseStyles = "w-full py-3 px-6 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary: `text-white shadow-md hover:shadow-lg active:scale-[0.98]`,
    secondary: `border-2 hover:bg-opacity-10 active:scale-[0.98]`,
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={{
        backgroundColor: variant === 'primary' ? colors.verdePrimario : 'transparent',
        borderColor: variant === 'secondary' ? colors.verdePrimario : undefined,
        color: variant === 'secondary' ? colors.verdePrimario : undefined,
      }}
    >
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
};

const TextField = ({ label, placeholder, type = 'text', suffix }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium" style={{ color: colors.grisOscuro }}>
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2"
        style={{ 
          borderColor: colors.grisClaro,
          color: colors.negro,
        }}
      />
      {suffix && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {suffix}
        </div>
      )}
    </div>
  </div>
);

const Card = ({ children, className = '', onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white rounded-xl border shadow-sm p-5 ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''} ${className}`}
    style={{ borderColor: colors.grisClaro }}
  >
    {children}
  </div>
);

const Badge = ({ children, type = 'active' }) => {
  const styles = {
    active: { bg: colors.verdeClaro, text: colors.verdePrimario },
    pending: { bg: '#FFF8E1', text: colors.amarilloCosecha },
    expired: { bg: '#FFEBEE', text: colors.error },
    certified: { bg: '#E3F2FD', text: colors.azulCertificacion },
  };
  const style = styles[type];
  
  return (
    <span 
      className="px-3 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {children}
    </span>
  );
};

const AgriTraceLogo = ({ size = 80, showText = true }) => (
  <div className="flex flex-col items-center">
    <div 
      className="rounded-full flex items-center justify-center relative"
      style={{ 
        width: size, 
        height: size, 
        backgroundColor: colors.verdeClaro 
      }}
    >
      <Leaf size={size * 0.45} style={{ color: colors.verdePrimario }} />
      <div 
        className="absolute rounded-full flex items-center justify-center"
        style={{ 
          right: size * 0.1, 
          bottom: size * 0.1, 
          width: size * 0.35, 
          height: size * 0.35,
          backgroundColor: colors.verdePrimario 
        }}
      >
        <Search size={size * 0.18} color="white" />
      </div>
    </div>
    {showText && (
      <h1 
        className="mt-4 text-2xl font-semibold"
        style={{ color: colors.verdePrimario, fontFamily: 'Poppins, sans-serif' }}
      >
        AgriTrace
      </h1>
    )}
  </div>
);

// ============================================================================
// PANTALLA 1: SPLASH
// ============================================================================

const SplashScreen = () => {
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.8);

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
      setScale(1);
    }, 100);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-white px-6">
      <div 
        className="transition-all duration-700 ease-out"
        style={{ opacity, transform: `scale(${scale})` }}
      >
        <AgriTraceLogo size={120} />
        <p className="text-center mt-4 text-sm" style={{ color: colors.grisMedio }}>
          Trazabilidad que conecta
        </p>
      </div>
      
      {/* Loading dots */}
      <div className="flex gap-2 mt-12">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ 
              backgroundColor: colors.verdePrimario,
              animationDelay: `${i * 200}ms`
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// PANTALLA 2: WELCOME
// ============================================================================

const WelcomeScreen = ({ onNavigate }) => (
  <div className="h-full flex flex-col bg-white px-6 py-8">
    <div className="flex-1 flex flex-col items-center justify-center">
      <AgriTraceLogo size={100} />
      <p className="text-center mt-3 text-sm" style={{ color: colors.grisMedio }}>
        Plataforma de trazabilidad<br />y exportación sostenible
      </p>
    </div>
    
    <div className="space-y-3 pb-8">
      <Button onClick={() => onNavigate('login')}>
        Ingresar
      </Button>
      <Button variant="secondary" onClick={() => onNavigate('register')}>
        Crear cuenta
      </Button>
    </div>
  </div>
);

// ============================================================================
// PANTALLA 3: LOGIN
// ============================================================================

const LoginScreen = ({ onNavigate }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center px-4 py-3">
        <button onClick={() => onNavigate('welcome')} className="p-2 -ml-2">
          <ChevronLeft size={24} style={{ color: colors.negro }} />
        </button>
      </div>

      <div className="flex-1 px-6 overflow-y-auto">
        {/* Logo */}
        <div className="flex justify-center mt-4">
          <AgriTraceLogo size={60} showText={false} />
        </div>

        <h2 className="text-2xl font-semibold mt-8" style={{ color: colors.negro }}>
          Iniciar sesión
        </h2>

        <div className="mt-8 space-y-5">
          <TextField 
            label="Celular o correo" 
            placeholder="ejemplo@correo.com" 
          />
          <TextField 
            label="Contraseña" 
            placeholder="••••••••" 
            type={showPassword ? 'text' : 'password'}
            suffix={
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400"
              >
                {showPassword ? '👁' : '👁‍🗨'}
              </button>
            }
          />
        </div>

        <div className="flex justify-end mt-2">
          <button className="text-sm" style={{ color: colors.azulCertificacion }}>
            ¿Olvidaste contraseña?
          </button>
        </div>

        <div className="mt-6">
          <Button onClick={() => onNavigate('registerFinca')}>
            Iniciar sesión
          </Button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-4 text-sm" style={{ color: colors.grisMedio }}>o</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <Button variant="secondary">
          Google
        </Button>

        <p className="text-center mt-8 text-sm" style={{ color: colors.grisMedio }}>
          ¿No tienes cuenta?{' '}
          <button 
            onClick={() => onNavigate('register')}
            className="font-semibold"
            style={{ color: colors.verdePrimario }}
          >
            Regístrate
          </button>
        </p>
      </div>
    </div>
  );
};

// ============================================================================
// PANTALLA 4: REGISTRO
// ============================================================================

const RegisterScreen = ({ onNavigate }) => {
  const [selectedRole, setSelectedRole] = useState('Productor');

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b" style={{ borderColor: colors.grisClaro }}>
        <button onClick={() => onNavigate('welcome')} className="p-2 -ml-2">
          <ChevronLeft size={24} style={{ color: colors.negro }} />
        </button>
        <span className="ml-2 font-medium">Crear cuenta</span>
      </div>

      <div className="flex-1 px-6 py-4 overflow-y-auto">
        {/* Progress */}
        <div className="space-y-2">
          <span className="text-xs font-medium" style={{ color: colors.verdePrimario }}>
            Paso 1 de 2
          </span>
          <div className="h-1 rounded-full" style={{ backgroundColor: colors.grisClaro }}>
            <div 
              className="h-full rounded-full w-1/2"
              style={{ backgroundColor: colors.verdePrimario }}
            />
          </div>
        </div>

        <h3 className="text-lg font-semibold mt-6" style={{ color: colors.negro }}>
          Información básica
        </h3>

        <div className="mt-6 space-y-5">
          <TextField label="Nombre completo" placeholder="Ej: Juan Gómez" />
          
          <div className="space-y-2">
            <label className="text-sm font-medium" style={{ color: colors.grisOscuro }}>
              Número de celular
            </label>
            <div className="flex gap-3">
              <div 
                className="flex items-center gap-1 px-3 py-3 rounded-lg border"
                style={{ borderColor: colors.grisClaro }}
              >
                <span>🇨🇴</span>
                <span className="text-sm">+57</span>
                <ChevronRight size={16} className="rotate-90" style={{ color: colors.grisMedio }} />
              </div>
              <input
                type="tel"
                placeholder="300 123 4567"
                className="flex-1 px-4 py-3 rounded-lg border text-sm"
                style={{ borderColor: colors.grisClaro }}
              />
            </div>
          </div>

          <TextField label="Correo electrónico" placeholder="(Opcional)" />

          <div className="space-y-3">
            <label className="text-sm font-medium" style={{ color: colors.grisOscuro }}>
              Tipo de cuenta
            </label>
            <div className="flex gap-3">
              {['Productor', 'Cooperativa'].map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`flex-1 flex flex-col items-center p-4 rounded-lg border-2 transition-all`}
                  style={{
                    borderColor: selectedRole === role ? colors.verdePrimario : colors.grisClaro,
                    backgroundColor: selectedRole === role ? colors.verdeClaro : 'transparent',
                  }}
                >
                  {role === 'Productor' ? (
                    <Leaf size={28} style={{ color: selectedRole === role ? colors.verdePrimario : colors.grisMedio }} />
                  ) : (
                    <div className="w-7 h-7 flex items-center justify-center">
                      <span style={{ color: selectedRole === role ? colors.verdePrimario : colors.grisMedio }}>👥</span>
                    </div>
                  )}
                  <span 
                    className="mt-2 text-sm font-medium"
                    style={{ color: selectedRole === role ? colors.verdePrimario : colors.grisOscuro }}
                  >
                    {role}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pb-4">
          <Button onClick={() => onNavigate('registerFinca')}>
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// PANTALLA 5: REGISTRAR FINCA
// ============================================================================

const RegisterFincaScreen = ({ onNavigate }) => (
  <div className="h-full flex flex-col" style={{ backgroundColor: colors.grisMuyClaro }}>
    {/* Header */}
    <div className="flex items-center px-4 py-3 bg-white border-b" style={{ borderColor: colors.grisClaro }}>
      <button onClick={() => onNavigate('welcome')} className="p-2 -ml-2">
        <ChevronLeft size={24} style={{ color: colors.negro }} />
      </button>
      <span className="ml-2 font-medium">Registrar finca</span>
    </div>

    <div className="flex-1 p-4 overflow-y-auto">
      <Card>
        <h3 className="text-lg font-semibold mb-6" style={{ color: colors.negro }}>
          Registrar finca
        </h3>

        <div className="space-y-5">
          <TextField label="Nombre de finca" placeholder="Ej: Finca La Esperanza" />
          <TextField label="Municipio" placeholder="Ej: Buga, Valle del Cauca" />
          
          <div className="space-y-2">
            <label className="text-sm font-medium" style={{ color: colors.grisOscuro }}>
              Coordenadas
            </label>
            <button 
              className="flex items-center gap-2 px-4 py-3 rounded-lg border text-sm"
              style={{ borderColor: colors.grisClaro, color: colors.grisOscuro }}
            >
              <MapPin size={18} />
              Obtener ubicación
            </button>
          </div>

          <TextField label="Cultivo principal" placeholder="Ej: Café" />
        </div>

        <div className="mt-8">
          <Button onClick={() => onNavigate('vistaLote')}>
            Guardar
          </Button>
        </div>
      </Card>
    </div>
  </div>
);

// ============================================================================
// PANTALLA 6: VISTA DE LOTE
// ============================================================================

const VistaLoteScreen = ({ onNavigate }) => (
  <div className="h-full flex flex-col" style={{ backgroundColor: colors.grisMuyClaro }}>
    {/* Header */}
    <div className="flex items-center px-4 py-3 bg-white border-b" style={{ borderColor: colors.grisClaro }}>
      <button onClick={() => onNavigate('registerFinca')} className="p-2 -ml-2">
        <ChevronLeft size={24} style={{ color: colors.negro }} />
      </button>
      <span className="ml-2 font-medium">Vista de lote</span>
    </div>

    <div className="flex-1 p-4 overflow-y-auto">
      <Card>
        {/* Breadcrumb */}
        <div className="flex items-center text-xs mb-4" style={{ color: colors.grisMedio }}>
          <span>Finca</span>
          <ChevronRight size={14} />
          <span>Lote</span>
        </div>

        <h3 className="text-lg font-semibold mb-4" style={{ color: colors.negro }}>
          Vista de lote
        </h3>

        {/* Selector de lote */}
        <div 
          className="flex items-center justify-between px-4 py-3 rounded-lg border mb-2"
          style={{ borderColor: colors.grisClaro }}
        >
          <span className="text-sm">Lote 2</span>
          <ChevronRight size={18} className="rotate-90" style={{ color: colors.grisMedio }} />
        </div>
        <p className="text-sm mb-4" style={{ color: colors.grisMedio }}>Cafe</p>

        {/* Mapa placeholder */}
        <div 
          className="h-28 rounded-lg mb-6 relative overflow-hidden"
          style={{ backgroundColor: colors.verdeClaro }}
        >
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 10 }).map((_, i) => (
              <div 
                key={i} 
                className="absolute w-full h-px"
                style={{ 
                  top: `${i * 10}%`, 
                  backgroundColor: colors.verdePrimario 
                }}
              />
            ))}
            {Array.from({ length: 15 }).map((_, i) => (
              <div 
                key={i} 
                className="absolute h-full w-px"
                style={{ 
                  left: `${i * 7}%`, 
                  backgroundColor: colors.verdePrimario 
                }}
              />
            ))}
          </div>
          {/* Pin */}
          <div className="absolute inset-0 flex items-center justify-center">
            <MapPin size={36} style={{ color: colors.verdePrimario }} fill={colors.verdeClaro} />
          </div>
        </div>

        {/* Actividades */}
        <h4 className="font-medium mb-3" style={{ color: colors.negro }}>Actividades</h4>
        
        <div className="divide-y" style={{ borderColor: colors.grisClaro }}>
          <button 
            className="w-full flex items-center py-3 text-left"
            onClick={() => onNavigate('registrarActividad')}
          >
            <Leaf size={22} style={{ color: colors.cafeTierra }} />
            <span className="ml-3 flex-1 text-sm">Siembra</span>
            <ChevronRight size={18} style={{ color: colors.grisMedio }} />
          </button>
          <button 
            className="w-full flex items-center py-3 text-left"
            onClick={() => onNavigate('registrarActividad')}
          >
            <Droplets size={22} style={{ color: colors.cafeTierra }} />
            <span className="ml-3 flex-1 text-sm">Fertilización</span>
            <ChevronRight size={18} style={{ color: colors.grisMedio }} />
          </button>
        </div>

        <div className="mt-6">
          <Button onClick={() => onNavigate('generarQR')}>
            Generar QR
          </Button>
        </div>
      </Card>
    </div>
  </div>
);

// ============================================================================
// PANTALLA 7: REGISTRAR ACTIVIDAD
// ============================================================================

const RegistrarActividadScreen = ({ onNavigate }) => (
  <div className="h-full flex flex-col" style={{ backgroundColor: colors.grisMuyClaro }}>
    {/* Header */}
    <div className="flex items-center px-4 py-3 bg-white border-b" style={{ borderColor: colors.grisClaro }}>
      <button onClick={() => onNavigate('vistaLote')} className="p-2 -ml-2">
        <ChevronLeft size={24} style={{ color: colors.negro }} />
      </button>
      <span className="ml-2 font-medium">Registrar actividad</span>
    </div>

    <div className="flex-1 p-4 overflow-y-auto">
      <Card>
        <h3 className="text-lg font-semibold mb-6" style={{ color: colors.negro }}>
          Registrar<br />actividad
        </h3>

        <div className="space-y-5">
          {/* Tipo */}
          <div className="space-y-2">
            <label className="text-sm font-medium" style={{ color: colors.grisOscuro }}>
              Tipo
            </label>
            <div 
              className="flex items-center justify-between px-4 py-3 rounded-lg border"
              style={{ borderColor: colors.grisClaro }}
            >
              <span className="text-sm">Fertilización</span>
              <ChevronRight size={18} className="rotate-90" style={{ color: colors.grisMedio }} />
            </div>
          </div>

          {/* Fecha */}
          <div className="space-y-2">
            <label className="text-sm font-medium" style={{ color: colors.grisOscuro }}>
              Fecha
            </label>
            <div 
              className="flex items-center justify-between px-4 py-3 rounded-lg border"
              style={{ borderColor: colors.grisClaro }}
            >
              <span className="text-sm">Apr 15, 2024</span>
              <Calendar size={18} style={{ color: colors.grisMedio }} />
            </div>
          </div>

          {/* Agregar foto */}
          <button 
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white text-sm font-medium"
            style={{ backgroundColor: colors.verdePrimario }}
          >
            <Plus size={18} />
            Agregar foto
          </button>

          {/* Notas */}
          <div className="space-y-2">
            <label className="text-sm font-medium" style={{ color: colors.grisOscuro }}>
              Notas
            </label>
            <textarea
              placeholder="Escribe notas adicionales..."
              className="w-full px-4 py-3 rounded-lg border text-sm h-24 resize-none"
              style={{ borderColor: colors.grisClaro }}
            />
          </div>
        </div>

        <div className="mt-6">
          <Button onClick={() => onNavigate('vistaLote')}>
            Guardar
          </Button>
        </div>
      </Card>
    </div>
  </div>
);

// ============================================================================
// PANTALLA 8: GENERAR QR
// ============================================================================

const GenerarQRScreen = ({ onNavigate }) => (
  <div className="h-full flex flex-col" style={{ backgroundColor: colors.grisMuyClaro }}>
    {/* Header */}
    <div className="flex items-center px-4 py-3 bg-white border-b" style={{ borderColor: colors.grisClaro }}>
      <button onClick={() => onNavigate('vistaLote')} className="p-2 -ml-2">
        <ChevronLeft size={24} style={{ color: colors.negro }} />
      </button>
      <span className="ml-2 font-medium">Generar QR</span>
    </div>

    <div className="flex-1 p-4 overflow-y-auto">
      <Card className="text-center">
        <h3 className="text-lg font-semibold mb-6" style={{ color: colors.negro }}>
          Generar QR
        </h3>

        {/* QR Code */}
        <div className="inline-block p-6 bg-white rounded-xl shadow-lg mb-6">
          <svg width="160" height="160" viewBox="0 0 160 160">
            {/* QR pattern simplified */}
            <rect x="0" y="0" width="160" height="160" fill="white"/>
            {/* Position patterns */}
            <rect x="10" y="10" width="40" height="40" fill={colors.negro}/>
            <rect x="15" y="15" width="30" height="30" fill="white"/>
            <rect x="20" y="20" width="20" height="20" fill={colors.negro}/>
            
            <rect x="110" y="10" width="40" height="40" fill={colors.negro}/>
            <rect x="115" y="15" width="30" height="30" fill="white"/>
            <rect x="120" y="20" width="20" height="20" fill={colors.negro}/>
            
            <rect x="10" y="110" width="40" height="40" fill={colors.negro}/>
            <rect x="15" y="115" width="30" height="30" fill="white"/>
            <rect x="20" y="120" width="20" height="20" fill={colors.negro}/>
            
            {/* Data pattern */}
            {Array.from({ length: 15 }).map((_, i) => 
              Array.from({ length: 15 }).map((_, j) => {
                const show = (i + j) % 3 !== 0 && Math.random() > 0.4;
                if (!show) return null;
                return (
                  <rect 
                    key={`${i}-${j}`}
                    x={60 + i * 4} 
                    y={60 + j * 4} 
                    width="4" 
                    height="4" 
                    fill={colors.negro}
                  />
                );
              })
            )}
          </svg>
        </div>

        <h4 className="font-semibold" style={{ color: colors.negro }}>Lote 2</h4>
        <p className="text-sm" style={{ color: colors.grisMedio }}>Cafe</p>
        <p className="text-xs mt-2" style={{ color: colors.grisMedio }}>
          Certificación valida 12/12/2024
        </p>

        <div className="mt-8">
          <Button onClick={() => onNavigate('paginaPublica')}>
            Generar QR
          </Button>
        </div>
      </Card>
    </div>
  </div>
);

// ============================================================================
// PANTALLA 9: PÁGINA PÚBLICA
// ============================================================================

const PaginaPublicaScreen = ({ onNavigate }) => (
  <div className="h-full flex flex-col" style={{ backgroundColor: colors.grisMuyClaro }}>
    {/* Header */}
    <div className="flex items-center px-4 py-3 bg-white border-b" style={{ borderColor: colors.grisClaro }}>
      <button onClick={() => onNavigate('generarQR')} className="p-2 -ml-2">
        <ChevronLeft size={24} style={{ color: colors.negro }} />
      </button>
      <span className="ml-2 font-medium">Trazabilidad</span>
    </div>

    <div className="flex-1 p-4 overflow-y-auto">
      <Card>
        <h3 className="text-lg font-semibold mb-6" style={{ color: colors.negro }}>
          Página pública<br />de trazabilidad
        </h3>

        <div className="space-y-4">
          <div>
            <p className="text-xs" style={{ color: colors.grisMedio }}>Productor</p>
            <p className="font-semibold" style={{ color: colors.negro }}>Juan Pérez</p>
          </div>

          <p style={{ color: colors.grisOscuro }}>Finca La Fortuna</p>

          <h4 className="font-semibold pt-2" style={{ color: colors.negro }}>Lote 1</h4>
          
          <div 
            className="px-4 py-3 rounded-lg border"
            style={{ borderColor: colors.grisClaro }}
          >
            <span className="text-sm">Café</span>
          </div>

          <div>
            <p className="font-medium mb-2" style={{ color: colors.negro }}>Certificaciones</p>
            <div 
              className="flex items-center gap-2 px-4 py-3 rounded-lg"
              style={{ backgroundColor: '#E3F2FD' }}
            >
              <Check size={18} style={{ color: colors.azulCertificacion }} />
              <span className="text-sm" style={{ color: colors.azulCertificacion }}>
                Certificación válida 12/12/20
              </span>
            </div>
          </div>

          {/* Imagen de finca */}
          <div 
            className="h-32 rounded-lg overflow-hidden relative"
            style={{ 
              background: `linear-gradient(135deg, ${colors.verdeClaro} 0%, ${colors.verdePrimario}50 100%)` 
            }}
          >
            {/* Landscape illustration */}
            <svg className="absolute bottom-0 w-full h-20" viewBox="0 0 200 50" preserveAspectRatio="none">
              <path 
                d="M0 30 Q50 10 100 25 Q150 40 200 20 L200 50 L0 50 Z" 
                fill={colors.verdePrimario} 
                opacity="0.4"
              />
              <path 
                d="M0 40 Q40 25 80 35 Q120 45 160 30 Q180 25 200 35 L200 50 L0 50 Z" 
                fill={colors.verdePrimario} 
                opacity="0.6"
              />
            </svg>
            <div 
              className="absolute bottom-3 left-3 px-2 py-1 bg-white/90 rounded text-xs font-medium"
              style={{ color: colors.negro }}
            >
              Finca La Fortuna
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Button icon={Download}>
            Descargar certificado
          </Button>
        </div>
      </Card>
    </div>
  </div>
);
