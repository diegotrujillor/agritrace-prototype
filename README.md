# AgriTrace - Prototipo Navegable MVP

## 📱 Descripción
Prototipo navegable completo para la plataforma **AgriTrace** - Sistema de trazabilidad y exportación sostenible para productores agrícolas.

## 📋 Documentos Analizados
El prototipo fue desarrollado basándose en:

1. **Documento UI/UX (PDF 0-3)**: Especificaciones de branding, paleta de colores, tipografía y sistema de diseño
2. **UI/UX Adicionales (PDF 3.1)**: Arquitectura de información y flujos de usuario
3. **Especificaciones de Pantallas (PDF 3.2)**: Wireframes y especificaciones detalladas de cada pantalla
4. **User Journey Maps (PDF 3.3)**: Journey maps de cada tipo de usuario
5. **JSON Figma**: Estructura del prototipo con transiciones

## 🎨 Sistema de Diseño Implementado

### Colores Primarios
- Verde Primario: `#2D7A3E`
- Verde Oscuro: `#1B5028`
- Verde Claro: `#E8F5E9`

### Colores Secundarios
- Café Tierra: `#6D4C3D`
- Amarillo Cosecha: `#F9A825`
- Azul Certificación: `#1976D2`

### Tipografía
- Principal: **Inter** (Google Fonts)
- Logo: **Poppins** (Semibold 600)

### Espaciado (8px base)
- xs: 4px | sm: 8px | md: 16px | lg: 24px | xl: 32px

## 📱 Pantallas Incluidas

1. **Splash Screen** - Pantalla de carga con logo animado
2. **Welcome** - Pantalla de bienvenida con opciones de ingreso
3. **Login** - Inicio de sesión
4. **Registro** - Creación de cuenta (Paso 1/2)
5. **Registrar Finca** - Formulario de registro de finca
6. **Vista de Lote** - Visualización de lote con mapa y actividades
7. **Registrar Actividad** - Formulario de registro de actividades
8. **Generar QR** - Generación de código QR de trazabilidad
9. **Página Pública** - Vista pública de trazabilidad

## 🚀 Archivos Generados

### Flutter/Dart
- `agritrace_flutter_main.dart` - Código principal de la aplicación Flutter
- `agritrace_pubspec.yaml` - Configuración del proyecto Flutter

### React/JSX (Prototipo Visual)
- `agritrace_prototype.jsx` - Componente React navegable

## 💻 Uso del Prototipo Flutter

### Requisitos
- Flutter SDK 3.0.0 o superior
- Dart SDK

### Instalación
```bash
# Crear nuevo proyecto Flutter
flutter create agritrace_app

# Reemplazar lib/main.dart con el archivo proporcionado
cp agritrace_flutter_main.dart agritrace_app/lib/main.dart

# Copiar pubspec.yaml
cp agritrace_pubspec.yaml agritrace_app/pubspec.yaml

# Instalar dependencias
cd agritrace_app
flutter pub get

# Ejecutar
flutter run
```

### Nota sobre fuentes
El prototipo utiliza las fuentes Inter y Poppins. Puedes:
1. Descargarlas de Google Fonts
2. O usar la versión del sistema (el código funcionará con fuentes fallback)

## 🔄 Flujo de Navegación

```
Splash → Welcome → Login → Register Finca → Vista Lote
                  ↓
              Registro → Register Finca
                              ↓
                    Vista Lote → Registrar Actividad
                              → Generar QR → Página Pública
```

## ✅ Características Implementadas

- [x] Sistema de diseño completo con tokens
- [x] Componentes reutilizables (botones, inputs, cards, badges)
- [x] Navegación entre pantallas
- [x] Animaciones y transiciones (300ms ease-in-out)
- [x] Estados de badges (activo, pendiente, vencido, certificado)
- [x] Modo offline visual indicator (componente incluido)
- [x] Logo AgriTrace estilizado
- [x] Código QR visual generado
- [x] Mapa placeholder con patrón de grid
- [x] Paisaje ilustrativo para página pública

## 📐 Dimensiones
- Mobile base: 375x812px (iPhone SE reference)
- Diseño Mobile-first
- Responsive ready

## 👤 Autor
Prototipo generado basado en especificaciones de Diego Trujillo (2025)

---

*AgriTrace - Trazabilidad que conecta*
