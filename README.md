# AgriTrace — Prototipo Navegable MVP

## Descripción

Prototipo navegable para **AgriTrace** — sistema de trazabilidad agrícola con enfoque **Farmer-First, Mobile-Only, Offline-First**.

Estrategia MVP: app móvil simple que permite a agricultores registrar actividades sin conexión y recibir alertas. Marketplace con compradores internacionales es Phase 2.

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

## Pantallas Phase 2 (diferidas)

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

Requiere React + Tailwind CSS + Lucide React. Usar con CodeSandbox, StackBlitz o:

```bash
npx create-react-app agritrace-demo
cd agritrace-demo
npm install lucide-react
# Agregar Tailwind CSS (ver tailwindcss.com/docs/guides/create-react-app)
# Reemplazar src/App.js con agritrace_prototype.jsx
npm start
```

El panel de navegación rápida en la esquina inferior izquierda muestra las 10 pantallas MVP (verde) y las 2 pantallas Phase 2 (gris).

---

## Características implementadas

- [x] 10 pantallas MVP completas (flujo productor)
- [x] Timeline vertical cronológico de actividades (pantalla más importante)
- [x] Offline indicator en pantallas de campo
- [x] Pantallas Phase 2 visibles pero deshabilitadas (etiqueta ⏸ Phase 2)
- [x] Solo rol Productor en registro (Cooperativa es Phase 2)
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
