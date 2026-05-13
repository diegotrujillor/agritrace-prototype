# AgriTrace — Prototipo Navegable MVP

> ⚠️ **Repo de referencia interna de diseño** — NO distribuir directamente a prospectos.
> Para mostrar el producto a productores, usar [`agritrace-demo`](https://github.com/diegotrujillor/agritrace-demo) (versión navegable y pulida).

## Descripción

Prototipo navegable para **AgriTrace** — sistema de trazabilidad agrícola con enfoque **Farmer-First, Mobile-Only, Offline-First**.

Estrategia MVP: app móvil simple que permite a agricultores registrar actividades sin conexión y recibir alertas. Marketplace con compradores internacionales es iteración futura.

**Validación comercial MVP** (Valle del Cauca): ver [`agritrace-docs/01-preparacion-mvp/10-comercial-gtm/`](https://github.com/diegotrujillor/agritrace-docs/tree/main/01-preparacion-mvp/10-comercial-gtm).

---

## Pantallas MVP (10 pantallas — Flujo Productor)

| # | Pantalla | Key `screen` | Semana dev |
|---|----------|--------------|------------|
| 1 | Bienvenida | `welcome` | 1 |
| 2 | Registro | `register` | 1 |
| 3 | Login | `login` | 1 |
| 4 | Dashboard vacío | `dashboardVacio` | 2 |
| 5 | Dashboard con fincas | `dashboardFincas` | 2 |
| 6 | Registrar finca | `registerFinca` | 2 |
| 7 | Vista finca | `vistaFinca` | 2–3 |
| 8 | Registrar lote | `registrarLote` | 2–3 |
| 9 | Vista lote + timeline actividades ⭐ | `vistaLote` | 3–4 |
| 10 | Registrar actividad | `registrarActividad` | 3–4 |

**Pantalla más importante:** `vistaLote` + `registrarActividad`. Debe ser tan simple como un cuaderno.

---

## Pantallas iteración futura (diferidas)

| Pantalla | Key `screen` | Razón diferida |
|----------|--------------|----------------|
| Generar QR | `generarQR` | Marketplace — 0 demanda validada en stakeholders |
| Trazabilidad pública | `paginaPublica` | Buyer-facing — requiere validar con 5+ compradores |

Estas pantallas están visibles en el prototipo (grises, botones deshabilitados) solo para referencia de diseño.

---

## Flujo de Navegación MVP

```
splash → welcome → login ──────────────────────→ dashboardFincas
                 → register → dashboardVacio → registerFinca → vistaFinca
                                                               → registrarLote → vistaFinca
                                                               → vistaLote → registrarActividad → vistaLote
```

---

## Sistema de Diseño

### Colores
- Verde Primario: `#2D7A3E`
- Verde Oscuro: `#1B5028`
- Verde Claro: `#E8F5E9`
- Café Tierra: `#6D4C3D`
- Amarillo Cosecha: `#F9A825`
- Azul Certificación: `#1976D2`

### Tipografía
- Principal: **Inter** (Google Fonts)
- Logo: **Poppins** (Semibold 600)

### Espaciado (base 8px)
- xs: 4px | sm: 8px | md: 16px | lg: 24px | xl: 32px

---

## Archivos

| Archivo | Descripción |
|---------|-------------|
| `agritrace_prototype.jsx` | Prototipo React navegable — **fuente principal** |
| `agritrace_flutter_main.dart` | Código Flutter de referencia |
| `agritrace_architecture.mermaid` | Diagrama de arquitectura |

---

## Cómo usar el prototipo React

### Opción A — Sin instalación (recomendado para compartir)

1. Abre **codesandbox.io** → New Sandbox → React
2. Reemplaza el contenido de `App.js` con el contenido de `agritrace_prototype.jsx`
3. En el panel de dependencias agrega `lucide-react`
4. En `public/index.html` agrega dentro de `<head>`:
   ```html
   <script src="https://cdn.tailwindcss.com"></script>
   ```
5. CodeSandbox genera una URL pública — compártela directamente

> **StackBlitz** funciona igual y carga más rápido en móvil.

---

### Opción B — Local con Create React App

```bash
# 1. Crear proyecto
npx create-react-app agritrace-demo
cd agritrace-demo

# 2. Instalar única dependencia del prototipo
npm install lucide-react

# 3. Tailwind CSS — usar CDN (suficiente para prototipo, no instalar PostCSS)
#    Editar public/index.html y agregar dentro de <head>:
#      <script src="https://cdn.tailwindcss.com"></script>
#    NO usar las guías de tailwindcss.com/docs/guides/* — son para producción
#    y requieren configurar PostCSS + tailwind.config.js innecesariamente.

# 4. Copiar el archivo del prototipo a src/
cp /ruta/a/agritrace_prototype.jsx src/agritrace_prototype.jsx

# 5. Editar src/App.js — reemplazar TODO su contenido con estas 2 líneas:
#      import AgriTracePrototype from './agritrace_prototype';
#      export default AgriTracePrototype;
#
#    IMPORTANTE: NO tocar index.js — es el punto de entrada de React
#    y ya importa App correctamente.

# 6. Arrancar — no se requiere rebuild manual, hot reload actualiza al guardar
npm start
```

**Los demás archivos generados por CRA** (`App.css`, `App.test.js`, `index.css`,
`logo.svg`, `reportWebVitals.js`, `setupTests.js`) pueden dejarse como están
o eliminarse — ninguno afecta al prototipo.

El panel de navegación rápida en la esquina inferior izquierda muestra las 10 pantallas MVP (verde) y las 2 pantallas iteración futura (gris).

---

## Características implementadas

- [x] 10 pantallas MVP completas (flujo productor)
- [x] Timeline vertical cronológico de actividades (pantalla más importante)
- [x] Offline indicator en pantallas de campo
- [x] Pantallas iteración futura visibles pero deshabilitadas (etiqueta ⏸ iteración futura)
- [x] Solo rol Productor en registro (Cooperativa es iteración futura)
- [x] Navegación correcta: login/register → dashboard
- [x] Copy: "Certifica tus cultivos y accede a mercados premium"
- [x] Sistema de diseño completo con tokens
- [x] Componentes reutilizables (Button, TextField, Card, Badge, OfflineBanner)
- [x] Animaciones y transiciones (300ms)
- [x] Dimensiones mobile-only: 375×812px

---

## Documentación relacionada

- Priorización MVP: `agritrace-docs/01-preparacion-mvp/04-diseno-ui-ux/01-priorizacion-features-mvp.md`
- Especificaciones pantallas: `agritrace-docs/01-preparacion-mvp/04-diseno-ui-ux/02-especificaciones-pantallas/`
- User Journeys: `agritrace-docs/01-preparacion-mvp/04-diseno-ui-ux/03-mapas-recorrido-usuario/`

---

*AgriTrace — Trazabilidad que conecta · © 2025 Diego Trujillo*
