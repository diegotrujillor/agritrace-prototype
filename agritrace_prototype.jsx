import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, MapPin, Calendar, Camera, Download, Search, Leaf, Droplets, Scissors, Package, Menu, Bell, Plus, QrCode, Check, CloudOff, X, AlertCircle } from 'lucide-react';

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

// MVP screens (10) — in order
const MVP_SCREENS = [
  'welcome', 'register', 'login',
  'dashboardVacio', 'dashboardFincas',
  'registerFinca', 'vistaFinca', 'registrarLote',
  'vistaLote', 'registrarActividad',
];
const DEFERRED_SCREENS = ['generarQR', 'paginaPublica'];

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

  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => navigateTo('welcome'), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const screens = {
    splash: <SplashScreen />,
    // ── MVP Screens (10) ──────────────────────────────────────────────────────
    welcome: <WelcomeScreen onNavigate={navigateTo} />,
    register: <RegisterScreen onNavigate={navigateTo} />,
    login: <LoginScreen onNavigate={navigateTo} />,
    dashboardVacio: <DashboardVacioScreen onNavigate={navigateTo} />,
    dashboardFincas: <DashboardFincasScreen onNavigate={navigateTo} />,
    registerFinca: <RegisterFincaScreen onNavigate={navigateTo} />,
    vistaFinca: <VistaFincaScreen onNavigate={navigateTo} />,
    registrarLote: <RegistrarLoteScreen onNavigate={navigateTo} />,
    vistaLote: <VistaLoteScreen onNavigate={navigateTo} />,
    registrarActividad: <RegistrarActividadScreen onNavigate={navigateTo} />,
    // ── iteración futura Screens (deferred) ────────────────────────────────────────────
    generarQR: <GenerarQRScreen onNavigate={navigateTo} />,
    paginaPublica: <PaginaPublicaScreen onNavigate={navigateTo} />,
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      {/* Phone Frame */}
      <div className="relative">
        <div className="absolute -inset-3 bg-gray-800 rounded-[3rem] shadow-2xl" />
        <div
          className="relative w-[375px] h-[812px] bg-white rounded-[2.5rem] overflow-hidden shadow-inner"
          style={{
            transition: 'opacity 0.3s ease-in-out',
            opacity: isAnimating ? 0 : 1,
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
        <p className="text-xs font-semibold text-gray-700 mb-1">MVP (10 pantallas)</p>
        <div className="flex flex-wrap gap-1 mb-2">
          {MVP_SCREENS.map((screen) => (
            <button
              key={screen}
              onClick={() => navigateTo(screen)}
              className="px-2 py-1 text-xs rounded transition-colors"
              style={{
                backgroundColor: currentScreen === screen ? colors.verdePrimario : '#E8F5E9',
                color: currentScreen === screen ? 'white' : colors.verdeOscuro,
              }}
            >
              {screen}
            </button>
          ))}
        </div>
        <p className="text-xs font-semibold text-gray-500 mb-1">⏸ iteración futura</p>
        <div className="flex flex-wrap gap-1">
          {DEFERRED_SCREENS.map((screen) => (
            <button
              key={screen}
              onClick={() => navigateTo(screen)}
              className="px-2 py-1 text-xs rounded transition-colors"
              style={{
                backgroundColor: currentScreen === screen ? '#757575' : '#F5F5F5',
                color: currentScreen === screen ? 'white' : '#757575',
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

const Button = ({ children, variant = 'primary', onClick, icon: Icon, className = '', disabled = false }) => {
  const baseStyles = "w-full py-3 px-6 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary: `text-white shadow-md hover:shadow-lg active:scale-[0.98]`,
    secondary: `border-2 hover:bg-opacity-10 active:scale-[0.98]`,
    ghost: `hover:bg-opacity-10 active:scale-[0.98]`,
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={{
        backgroundColor: variant === 'primary' ? colors.verdePrimario : 'transparent',
        borderColor: variant === 'secondary' ? colors.verdePrimario : undefined,
        color: variant === 'secondary' ? colors.verdePrimario : variant === 'ghost' ? colors.verdePrimario : undefined,
        opacity: disabled ? 0.5 : 1,
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
        style={{ borderColor: colors.grisClaro, color: colors.negro }}
      />
      {suffix && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">{suffix}</div>
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

const OfflineBanner = () => (
  <div
    className="flex items-center gap-2 px-4 py-2 text-xs font-medium"
    style={{ backgroundColor: '#FFF3E0', color: colors.warning }}
  >
    <CloudOff size={14} />
    Sin conexión · Datos guardados localmente
  </div>
);

const AgriTraceLogo = ({ size = 80, showText = true }) => (
  <div className="flex flex-col items-center">
    <div
      className="rounded-full flex items-center justify-center relative"
      style={{ width: size, height: size, backgroundColor: colors.verdeClaro }}
    >
      <Leaf size={size * 0.45} style={{ color: colors.verdePrimario }} />
      <div
        className="absolute rounded-full flex items-center justify-center"
        style={{
          right: size * 0.1,
          bottom: size * 0.1,
          width: size * 0.35,
          height: size * 0.35,
          backgroundColor: colors.verdePrimario,
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
// PANTALLA 0: SPLASH
// ============================================================================

const SplashScreen = () => {
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.8);

  useEffect(() => {
    const t = setTimeout(() => {
      setOpacity(1);
      setScale(1);
    }, 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="h-full flex flex-col items-center justify-center"
      style={{ backgroundColor: colors.verdePrimario }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          transition: 'all 0.5s ease-out',
        }}
      >
        <div
          className="rounded-full flex items-center justify-center relative"
          style={{ width: 100, height: 100, backgroundColor: 'rgba(255,255,255,0.2)' }}
        >
          <Leaf size={50} color="white" />
          <div
            className="absolute rounded-full flex items-center justify-center"
            style={{ right: 10, bottom: 10, width: 34, height: 34, backgroundColor: 'white' }}
          >
            <Search size={18} style={{ color: colors.verdePrimario }} />
          </div>
        </div>
        <h1
          className="mt-4 text-3xl font-semibold text-white text-center"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          AgriTrace
        </h1>
        <p className="text-white/70 text-sm text-center mt-1">Trazabilidad que conecta</p>
      </div>
    </div>
  );
};

// ============================================================================
// PANTALLA 1: BIENVENIDA
// ============================================================================

const WelcomeScreen = ({ onNavigate }) => (
  <div className="h-full flex flex-col bg-white px-6 py-8">
    <div className="flex-1 flex flex-col items-center justify-center">
      <AgriTraceLogo size={100} />
      <p className="text-center mt-4 text-base font-medium" style={{ color: colors.negro }}>
        Certifica tus cultivos y accede<br />a mercados premium
      </p>
      <div className="mt-6 w-full space-y-3">
        {[
          '📱 Registra actividades sin conexión',
          '🌱 Historial completo de tus lotes',
          '🔔 Alertas y recordatorios',
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm" style={{ color: colors.grisMedio }}>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="space-y-3 pb-8">
      <Button onClick={() => onNavigate('login')}>Ingresar</Button>
      <Button variant="secondary" onClick={() => onNavigate('register')}>
        Crear cuenta
      </Button>
    </div>
  </div>
);

// ============================================================================
// PANTALLA 2: REGISTRO
// ============================================================================

const RegisterScreen = ({ onNavigate }) => (
  <div className="h-full flex flex-col bg-white">
    <div className="flex items-center px-4 py-3 border-b" style={{ borderColor: colors.grisClaro }}>
      <button onClick={() => onNavigate('welcome')} className="p-2 -ml-2">
        <ChevronLeft size={24} style={{ color: colors.negro }} />
      </button>
      <span className="ml-2 font-medium">Crear cuenta</span>
    </div>

    <div className="flex-1 px-6 py-4 overflow-y-auto">
      <div className="space-y-2">
        <span className="text-xs font-medium" style={{ color: colors.verdePrimario }}>
          Paso 1 de 2
        </span>
        <div className="h-1 rounded-full" style={{ backgroundColor: colors.grisClaro }}>
          <div className="h-full rounded-full w-1/2" style={{ backgroundColor: colors.verdePrimario }} />
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

        <div className="p-3 rounded-lg" style={{ backgroundColor: colors.verdeClaro }}>
          <div className="flex items-center gap-2">
            <Leaf size={20} style={{ color: colors.verdePrimario }} />
            <span className="text-sm font-medium" style={{ color: colors.verdePrimario }}>
              Productor agrícola
            </span>
          </div>
          <p className="text-xs mt-1" style={{ color: colors.grisOscuro }}>
            Registra tus fincas y cultivos
          </p>
        </div>
      </div>

      <div className="mt-8 pb-4">
        <Button onClick={() => onNavigate('dashboardVacio')}>Continuar</Button>
      </div>
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
      <div className="flex items-center px-4 py-3">
        <button onClick={() => onNavigate('welcome')} className="p-2 -ml-2">
          <ChevronLeft size={24} style={{ color: colors.negro }} />
        </button>
      </div>

      <div className="flex-1 px-6 overflow-y-auto">
        <div className="flex justify-center mt-4">
          <AgriTraceLogo size={60} showText={false} />
        </div>

        <h2 className="text-2xl font-semibold mt-8" style={{ color: colors.negro }}>
          Iniciar sesión
        </h2>

        <div className="mt-8 space-y-5">
          <TextField label="Celular o correo" placeholder="ejemplo@correo.com" />
          <TextField
            label="Contraseña"
            placeholder="••••••••"
            type={showPassword ? 'text' : 'password'}
            suffix={
              <button onClick={() => setShowPassword(!showPassword)} className="text-gray-400">
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
          <Button onClick={() => onNavigate('dashboardFincas')}>Iniciar sesión</Button>
        </div>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-4 text-sm" style={{ color: colors.grisMedio }}>o</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <Button variant="secondary">Google</Button>

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
// PANTALLA 4: DASHBOARD VACÍO
// ============================================================================

const DashboardVacioScreen = ({ onNavigate }) => (
  <div className="h-full flex flex-col bg-white">
    <div className="px-5 pt-4 pb-3 border-b" style={{ borderColor: colors.grisClaro }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs" style={{ color: colors.grisMedio }}>Bienvenido</p>
          <h2 className="text-lg font-semibold" style={{ color: colors.negro }}>Juan Gómez</h2>
        </div>
        <div className="flex items-center gap-3">
          <Bell size={22} style={{ color: colors.grisOscuro }} />
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ backgroundColor: colors.verdeClaro }}
          >
            <span className="text-sm font-semibold" style={{ color: colors.verdePrimario }}>JG</span>
          </div>
        </div>
      </div>
    </div>

    <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
        style={{ backgroundColor: colors.verdeClaro }}
      >
        <Leaf size={48} style={{ color: colors.verdePrimario }} />
      </div>
      <h3 className="text-lg font-semibold mb-2" style={{ color: colors.negro }}>
        Registra tu primera finca
      </h3>
      <p className="text-sm mb-8" style={{ color: colors.grisMedio }}>
        Agrega tus fincas y lotes para comenzar a registrar actividades de cultivo
      </p>
      <Button onClick={() => onNavigate('registerFinca')}>
        <Plus size={18} />
        Registrar finca
      </Button>
    </div>

    <div className="px-5 pb-6">
      <div className="p-4 rounded-xl flex gap-3" style={{ backgroundColor: colors.verdeClaro }}>
        <AlertCircle size={18} style={{ color: colors.verdePrimario }} className="flex-shrink-0 mt-0.5" />
        <p className="text-xs" style={{ color: colors.verdeOscuro }}>
          Funciona sin conexión. Tus registros se sincronizan automáticamente cuando vuelva la señal.
        </p>
      </div>
    </div>
  </div>
);

// ============================================================================
// PANTALLA 5: DASHBOARD CON FINCAS
// ============================================================================

const DashboardFincasScreen = ({ onNavigate }) => (
  <div className="h-full flex flex-col" style={{ backgroundColor: colors.grisMuyClaro }}>
    <div className="px-5 pt-4 pb-3 bg-white border-b" style={{ borderColor: colors.grisClaro }}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs" style={{ color: colors.grisMedio }}>Hola de nuevo</p>
          <h2 className="text-lg font-semibold" style={{ color: colors.negro }}>Juan Gómez</h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative">
            <Bell size={22} style={{ color: colors.grisOscuro }} />
            <span
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs text-white flex items-center justify-center"
              style={{ backgroundColor: colors.error }}
            >
              2
            </span>
          </button>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ backgroundColor: colors.verdeClaro }}
          >
            <span className="text-sm font-semibold" style={{ color: colors.verdePrimario }}>JG</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        {[{ label: 'Fincas', value: '2' }, { label: 'Lotes', value: '5' }, { label: 'Actividades', value: '18' }].map((s) => (
          <div key={s.label} className="flex-1 text-center">
            <p className="text-lg font-bold" style={{ color: colors.verdePrimario }}>{s.value}</p>
            <p className="text-xs" style={{ color: colors.grisMedio }}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="flex-1 p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold" style={{ color: colors.negro }}>Mis fincas</h3>
        <button
          onClick={() => onNavigate('registerFinca')}
          className="text-sm font-medium"
          style={{ color: colors.verdePrimario }}
        >
          + Nueva
        </button>
      </div>

      <div className="space-y-3">
        {[
          { name: 'La Esperanza', location: 'Buga, Valle del Cauca', crop: 'Café especial', lots: 3, badge: 'active' },
          { name: 'El Porvenir', location: 'Tuluá, Valle del Cauca', crop: 'Cacao', lots: 2, badge: 'pending' },
        ].map((finca) => (
          <Card key={finca.name} onClick={() => onNavigate('vistaFinca')}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold" style={{ color: colors.negro }}>{finca.name}</h4>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin size={12} style={{ color: colors.grisMedio }} />
                  <p className="text-xs" style={{ color: colors.grisMedio }}>{finca.location}</p>
                </div>
                <p className="text-sm mt-2" style={{ color: colors.grisOscuro }}>{finca.crop}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge type={finca.badge}>{finca.badge === 'active' ? 'Activa' : 'Pendiente'}</Badge>
                <span className="text-xs" style={{ color: colors.grisMedio }}>{finca.lots} lotes</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>

    {/* FAB */}
    <button
      onClick={() => onNavigate('registerFinca')}
      className="absolute bottom-16 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
      style={{ backgroundColor: colors.verdePrimario }}
    >
      <Plus size={28} color="white" />
    </button>
  </div>
);

// ============================================================================
// PANTALLA 6: REGISTRAR FINCA
// ============================================================================

const RegisterFincaScreen = ({ onNavigate }) => (
  <div className="h-full flex flex-col" style={{ backgroundColor: colors.grisMuyClaro }}>
    <div className="flex items-center px-4 py-3 bg-white border-b" style={{ borderColor: colors.grisClaro }}>
      <button onClick={() => onNavigate('dashboardFincas')} className="p-2 -ml-2">
        <ChevronLeft size={24} style={{ color: colors.negro }} />
      </button>
      <span className="ml-2 font-medium">Registrar finca</span>
    </div>

    <div className="flex-1 p-4 overflow-y-auto">
      <Card>
        <div className="space-y-5">
          <TextField label="Nombre de finca" placeholder="Ej: Finca La Esperanza" />
          <TextField label="Municipio / Vereda" placeholder="Ej: Buga, Valle del Cauca" />

          <div className="space-y-2">
            <label className="text-sm font-medium" style={{ color: colors.grisOscuro }}>
              Ubicación GPS
            </label>
            <button
              className="flex items-center gap-2 w-full px-4 py-3 rounded-lg border text-sm"
              style={{ borderColor: colors.grisClaro, color: colors.grisOscuro }}
            >
              <MapPin size={18} style={{ color: colors.verdePrimario }} />
              Obtener ubicación automática
            </button>
            <p className="text-xs" style={{ color: colors.grisMedio }}>
              O ingresa coordenadas manualmente si no hay señal GPS
            </p>
          </div>

          <TextField label="Cultivo principal" placeholder="Ej: Café" />
          <TextField label="Área total (hectáreas)" placeholder="Ej: 3.5" type="number" />
        </div>

        <div className="mt-8">
          <Button onClick={() => onNavigate('vistaFinca')}>Guardar finca</Button>
        </div>
      </Card>
    </div>
  </div>
);

// ============================================================================
// PANTALLA 7: VISTA FINCA
// ============================================================================

const VistaFincaScreen = ({ onNavigate }) => (
  <div className="h-full flex flex-col" style={{ backgroundColor: colors.grisMuyClaro }}>
    <div className="bg-white border-b" style={{ borderColor: colors.grisClaro }}>
      <div className="flex items-center px-4 py-3">
        <button onClick={() => onNavigate('dashboardFincas')} className="p-2 -ml-2">
          <ChevronLeft size={24} style={{ color: colors.negro }} />
        </button>
        <span className="ml-2 font-medium">La Esperanza</span>
      </div>
      <div className="px-5 pb-4">
        <div className="flex items-center gap-2 text-xs" style={{ color: colors.grisMedio }}>
          <MapPin size={12} />
          <span>Buga, Valle del Cauca</span>
          <span>·</span>
          <span>3.5 ha</span>
        </div>
        <div className="flex gap-3 mt-3">
          <Badge type="active">Activa</Badge>
          <span className="text-xs flex items-center gap-1" style={{ color: colors.grisOscuro }}>
            <Leaf size={12} style={{ color: colors.verdePrimario }} />
            Café especial
          </span>
        </div>
      </div>
    </div>

    <div className="flex-1 p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold" style={{ color: colors.negro }}>Lotes (3)</h3>
        <button
          onClick={() => onNavigate('registrarLote')}
          className="text-sm font-medium flex items-center gap-1"
          style={{ color: colors.verdePrimario }}
        >
          <Plus size={14} />
          Nuevo lote
        </button>
      </div>

      <div className="space-y-3">
        {[
          { name: 'Lote Norte', crop: 'Café Geisha', area: '1.2 ha', activities: 8 },
          { name: 'Lote Sur', crop: 'Café Caturra', area: '1.0 ha', activities: 5 },
          { name: 'Lote Centro', crop: 'Café Bourbon', area: '1.3 ha', activities: 5 },
        ].map((lote) => (
          <Card key={lote.name} onClick={() => onNavigate('vistaLote')}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold" style={{ color: colors.negro }}>{lote.name}</h4>
                <p className="text-sm mt-1" style={{ color: colors.grisOscuro }}>{lote.crop}</p>
                <p className="text-xs mt-1" style={{ color: colors.grisMedio }}>
                  {lote.area} · {lote.activities} actividades
                </p>
              </div>
              <ChevronRight size={20} style={{ color: colors.grisMedio }} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  </div>
);

// ============================================================================
// PANTALLA 8: REGISTRAR LOTE
// ============================================================================

const RegistrarLoteScreen = ({ onNavigate }) => (
  <div className="h-full flex flex-col" style={{ backgroundColor: colors.grisMuyClaro }}>
    <div className="flex items-center px-4 py-3 bg-white border-b" style={{ borderColor: colors.grisClaro }}>
      <button onClick={() => onNavigate('vistaFinca')} className="p-2 -ml-2">
        <ChevronLeft size={24} style={{ color: colors.negro }} />
      </button>
      <span className="ml-2 font-medium">Registrar lote</span>
    </div>

    <div className="flex-1 p-4 overflow-y-auto">
      <Card>
        <div className="space-y-5">
          <TextField label="Nombre del lote" placeholder="Ej: Lote Norte" />

          <div className="space-y-2">
            <label className="text-sm font-medium" style={{ color: colors.grisOscuro }}>
              Tipo de cultivo
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Café', selected: true },
                { label: 'Cacao', selected: false },
                { label: 'Maíz', selected: false },
              ].map(({ label, selected }) => (
                <button
                  key={label}
                  className="flex flex-col items-center p-3 rounded-lg border-2"
                  style={{
                    borderColor: selected ? colors.verdePrimario : colors.grisClaro,
                    backgroundColor: selected ? colors.verdeClaro : 'transparent',
                  }}
                >
                  <Leaf size={24} style={{ color: selected ? colors.verdePrimario : colors.grisMedio }} />
                  <span
                    className="text-xs mt-1"
                    style={{ color: selected ? colors.verdePrimario : colors.grisOscuro }}
                  >
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <TextField label="Área (hectáreas)" placeholder="Ej: 1.2" type="number" />

          <div className="space-y-2">
            <label className="text-sm font-medium" style={{ color: colors.grisOscuro }}>
              Foto del lote (opcional)
            </label>
            <button
              className="w-full h-24 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2"
              style={{ borderColor: colors.grisClaro }}
            >
              <Camera size={24} style={{ color: colors.grisMedio }} />
              <span className="text-xs" style={{ color: colors.grisMedio }}>Tomar foto</span>
            </button>
          </div>
        </div>

        <div className="mt-8">
          <Button onClick={() => onNavigate('vistaFinca')}>Guardar lote</Button>
        </div>
      </Card>
    </div>
  </div>
);

// ============================================================================
// PANTALLA 9: VISTA LOTE + TIMELINE ACTIVIDADES  ⭐ PANTALLA MÁS IMPORTANTE
// ============================================================================

const ACTIVIDADES = [
  { tipo: 'Siembra', fecha: '15 Ene 2026', icono: Leaf, notas: 'Variedad Geisha, 200 plantas', color: colors.verdePrimario },
  { tipo: 'Fertilización', fecha: '3 Feb 2026', icono: Droplets, notas: 'Abono orgánico 15 kg/ha', color: colors.azulCertificacion },
  { tipo: 'Poda', fecha: '28 Feb 2026', icono: Scissors, notas: 'Poda de formación', color: colors.cafeTierra },
  { tipo: 'Fertilización', fecha: '15 Mar 2026', icono: Droplets, notas: 'Urea 10 kg/ha — dosis normal', color: colors.azulCertificacion },
  { tipo: 'Cosecha', fecha: '10 Abr 2026', icono: Package, notas: '85 kg cerezo rojo', color: colors.amarilloCosecha },
];

const VistaLoteScreen = ({ onNavigate }) => (
  <div className="h-full flex flex-col" style={{ backgroundColor: colors.grisMuyClaro }}>
    <div className="bg-white border-b" style={{ borderColor: colors.grisClaro }}>
      <div className="flex items-center px-4 py-3">
        <button onClick={() => onNavigate('vistaFinca')} className="p-2 -ml-2">
          <ChevronLeft size={24} style={{ color: colors.negro }} />
        </button>
        <div className="ml-2 flex-1">
          <span className="font-medium">Lote Norte</span>
          <p className="text-xs" style={{ color: colors.grisMedio }}>Café Geisha · 1.2 ha</p>
        </div>
      </div>
      <OfflineBanner />
    </div>

    <div className="flex-1 overflow-y-auto p-4">
      <h3 className="font-semibold mb-4 text-sm" style={{ color: colors.grisOscuro }}>
        Historial de actividades ({ACTIVIDADES.length})
      </h3>

      <div className="relative">
        {/* Vertical timeline line */}
        <div
          className="absolute left-5 top-2 bottom-2 w-0.5"
          style={{ backgroundColor: colors.grisClaro }}
        />

        <div className="space-y-4">
          {ACTIVIDADES.map((act, i) => {
            const Icon = act.icono;
            return (
              <div key={i} className="flex gap-4">
                <div
                  className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: act.color + '20', border: `2px solid ${act.color}` }}
                >
                  <Icon size={18} style={{ color: act.color }} />
                </div>
                <div
                  className="flex-1 bg-white rounded-xl p-4 shadow-sm border"
                  style={{ borderColor: colors.grisClaro }}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-medium text-sm" style={{ color: colors.negro }}>{act.tipo}</span>
                    <span className="text-xs" style={{ color: colors.grisMedio }}>{act.fecha}</span>
                  </div>
                  <p className="text-xs mt-1" style={{ color: colors.grisOscuro }}>{act.notas}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Camera size={10} style={{ color: colors.verdePrimario }} />
                    <span className="text-xs" style={{ color: colors.grisMedio }}>1 foto adjunta</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>

    <div className="p-4 bg-white border-t" style={{ borderColor: colors.grisClaro }}>
      <Button onClick={() => onNavigate('registrarActividad')}>
        <Plus size={18} />
        Registrar actividad
      </Button>
    </div>
  </div>
);

// ============================================================================
// PANTALLA 10: REGISTRAR ACTIVIDAD
// ============================================================================

const TIPOS_ACTIVIDAD = [
  { label: 'Siembra', icono: Leaf, color: colors.verdePrimario },
  { label: 'Riego', icono: Droplets, color: colors.azulCertificacion },
  { label: 'Fertiliz.', icono: Package, color: colors.cafeTierra },
  { label: 'Poda', icono: Scissors, color: colors.warning },
  { label: 'Cosecha', icono: Package, color: colors.amarilloCosecha },
];

const RegistrarActividadScreen = ({ onNavigate }) => {
  const [selectedTipo, setSelectedTipo] = useState('Fertiliz.');

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: colors.grisMuyClaro }}>
      <div className="flex items-center px-4 py-3 bg-white border-b" style={{ borderColor: colors.grisClaro }}>
        <button onClick={() => onNavigate('vistaLote')} className="p-2 -ml-2">
          <ChevronLeft size={24} style={{ color: colors.negro }} />
        </button>
        <span className="ml-2 font-medium">Registrar actividad</span>
        <span
          className="ml-auto text-xs px-2 py-1 rounded"
          style={{ backgroundColor: '#FFF3E0', color: colors.warning }}
        >
          Sin conexión
        </span>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <Card>
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium" style={{ color: colors.grisOscuro }}>
                Tipo de actividad
              </label>
              <div className="grid grid-cols-5 gap-2">
                {TIPOS_ACTIVIDAD.map(({ label, icono: Icon, color }) => (
                  <button
                    key={label}
                    onClick={() => setSelectedTipo(label)}
                    className="flex flex-col items-center p-2 rounded-lg border-2 transition-all"
                    style={{
                      borderColor: selectedTipo === label ? color : colors.grisClaro,
                      backgroundColor: selectedTipo === label ? color + '15' : 'transparent',
                    }}
                  >
                    <Icon size={22} style={{ color: selectedTipo === label ? color : colors.grisMedio }} />
                    <span
                      className="mt-1"
                      style={{ color: selectedTipo === label ? color : colors.grisMedio, fontSize: '0.6rem' }}
                    >
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" style={{ color: colors.grisOscuro }}>
                Fecha
              </label>
              <div
                className="flex items-center justify-between px-4 py-3 rounded-lg border"
                style={{ borderColor: colors.grisClaro }}
              >
                <span className="text-sm" style={{ color: colors.negro }}>Hoy — 3 May 2026</span>
                <Calendar size={18} style={{ color: colors.grisMedio }} />
              </div>
            </div>

            <TextField label="Insumo / Dosis" placeholder="Ej: Urea 10 kg/ha" />

            <button
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-dashed text-sm font-medium"
              style={{ borderColor: colors.verdePrimario, color: colors.verdePrimario }}
            >
              <Camera size={18} />
              Tomar evidencia fotográfica
            </button>

            <div className="space-y-2">
              <label className="text-sm font-medium" style={{ color: colors.grisOscuro }}>
                Notas (opcional)
              </label>
              <textarea
                placeholder="Escribe observaciones adicionales..."
                className="w-full px-4 py-3 rounded-lg border text-sm h-24 resize-none"
                style={{ borderColor: colors.grisClaro }}
              />
            </div>
          </div>

          <div className="mt-6">
            <Button onClick={() => onNavigate('vistaLote')}>Guardar actividad</Button>
          </div>
          <p className="text-center mt-3 text-xs" style={{ color: colors.grisMedio }}>
            Guardado localmente · Sync automático al recuperar señal
          </p>
        </Card>
      </div>
    </div>
  );
};

// ============================================================================
// PANTALLA 11 — ⏸️ DEFERRED: GENERAR QR
// ============================================================================

const GenerarQRScreen = ({ onNavigate }) => (
  <div className="h-full flex flex-col" style={{ backgroundColor: colors.grisMuyClaro }}>
    <div className="flex items-center px-4 py-3 bg-white border-b" style={{ borderColor: colors.grisClaro }}>
      <button onClick={() => onNavigate('vistaLote')} className="p-2 -ml-2">
        <ChevronLeft size={24} style={{ color: colors.negro }} />
      </button>
      <span className="ml-2 font-medium">Generar QR</span>
      <span
        className="ml-auto text-xs px-2 py-1 rounded font-medium"
        style={{ backgroundColor: '#F5F5F5', color: colors.grisMedio }}
      >
        ⏸ iteración futura
      </span>
    </div>

    <div
      className="mx-4 mt-4 p-4 rounded-xl border flex gap-3"
      style={{ borderColor: colors.grisClaro, backgroundColor: '#FAFAFA' }}
    >
      <AlertCircle size={18} style={{ color: colors.grisMedio }} className="flex-shrink-0 mt-0.5" />
      <p className="text-xs" style={{ color: colors.grisMedio }}>
        Diferido a iteración futura. Se habilitará cuando haya demanda validada con compradores internacionales.
      </p>
    </div>

    <div className="flex-1 p-4 overflow-y-auto">
      <Card className="text-center opacity-60">
        <h3 className="text-lg font-semibold mb-6" style={{ color: colors.negro }}>
          Generar QR
        </h3>
        <div className="inline-block p-6 bg-white rounded-xl shadow-lg mb-6">
          <svg width="160" height="160" viewBox="0 0 160 160">
            <rect x="0" y="0" width="160" height="160" fill="white" />
            <rect x="10" y="10" width="40" height="40" fill={colors.negro} />
            <rect x="15" y="15" width="30" height="30" fill="white" />
            <rect x="20" y="20" width="20" height="20" fill={colors.negro} />
            <rect x="110" y="10" width="40" height="40" fill={colors.negro} />
            <rect x="115" y="15" width="30" height="30" fill="white" />
            <rect x="120" y="20" width="20" height="20" fill={colors.negro} />
            <rect x="10" y="110" width="40" height="40" fill={colors.negro} />
            <rect x="15" y="115" width="30" height="30" fill="white" />
            <rect x="20" y="120" width="20" height="20" fill={colors.negro} />
            {Array.from({ length: 15 }).map((_, i) =>
              Array.from({ length: 15 }).map((_, j) => {
                const show = (i + j) % 3 !== 0 && (i * j) % 2 === 0;
                if (!show) return null;
                return <rect key={`${i}-${j}`} x={60 + i * 4} y={60 + j * 4} width="4" height="4" fill={colors.negro} />;
              })
            )}
          </svg>
        </div>
        <h4 className="font-semibold" style={{ color: colors.negro }}>Lote Norte</h4>
        <p className="text-sm" style={{ color: colors.grisMedio }}>Café Geisha</p>
        <div className="mt-8">
          <Button disabled>Generar QR (iteración futura)</Button>
        </div>
      </Card>
    </div>
  </div>
);

// ============================================================================
// PANTALLA 12 — ⏸️ DEFERRED: TRAZABILIDAD PÚBLICA
// ============================================================================

const PaginaPublicaScreen = ({ onNavigate }) => (
  <div className="h-full flex flex-col" style={{ backgroundColor: colors.grisMuyClaro }}>
    <div className="flex items-center px-4 py-3 bg-white border-b" style={{ borderColor: colors.grisClaro }}>
      <button onClick={() => onNavigate('generarQR')} className="p-2 -ml-2">
        <ChevronLeft size={24} style={{ color: colors.negro }} />
      </button>
      <span className="ml-2 font-medium">Trazabilidad pública</span>
      <span
        className="ml-auto text-xs px-2 py-1 rounded font-medium"
        style={{ backgroundColor: '#F5F5F5', color: colors.grisMedio }}
      >
        ⏸ iteración futura
      </span>
    </div>

    <div className="flex-1 p-4 overflow-y-auto opacity-60">
      <Card>
        <h3 className="text-lg font-semibold mb-6" style={{ color: colors.negro }}>
          Página pública<br />de trazabilidad
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-xs" style={{ color: colors.grisMedio }}>Productor</p>
            <p className="font-semibold" style={{ color: colors.negro }}>Juan Gómez</p>
          </div>
          <p style={{ color: colors.grisOscuro }}>Finca La Esperanza</p>
          <h4 className="font-semibold pt-2" style={{ color: colors.negro }}>Lote Norte</h4>
          <div className="px-4 py-3 rounded-lg border" style={{ borderColor: colors.grisClaro }}>
            <span className="text-sm">Café Geisha</span>
          </div>
          <div>
            <p className="font-medium mb-2" style={{ color: colors.negro }}>Certificaciones</p>
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg" style={{ backgroundColor: '#E3F2FD' }}>
              <Check size={18} style={{ color: colors.azulCertificacion }} />
              <span className="text-sm" style={{ color: colors.azulCertificacion }}>
                Certificación válida
              </span>
            </div>
          </div>
          <div
            className="h-32 rounded-lg overflow-hidden relative"
            style={{ background: `linear-gradient(135deg, ${colors.verdeClaro} 0%, ${colors.verdePrimario}50 100%)` }}
          >
            <svg className="absolute bottom-0 w-full h-20" viewBox="0 0 200 50" preserveAspectRatio="none">
              <path d="M0 30 Q50 10 100 25 Q150 40 200 20 L200 50 L0 50 Z" fill={colors.verdePrimario} opacity="0.4" />
              <path d="M0 40 Q40 25 80 35 Q120 45 160 30 Q180 25 200 35 L200 50 L0 50 Z" fill={colors.verdePrimario} opacity="0.6" />
            </svg>
            <div className="absolute bottom-3 left-3 px-2 py-1 bg-white/90 rounded text-xs font-medium" style={{ color: colors.negro }}>
              Finca La Esperanza
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Button icon={Download} disabled>Descargar certificado (iteración futura)</Button>
        </div>
      </Card>
    </div>
  </div>
);
