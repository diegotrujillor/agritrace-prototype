// AgriTrace - Plataforma de Trazabilidad y Exportación Sostenible
// Prototipo Navegable Flutter/Dart
// Basado en especificaciones UI/UX del MVP

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.dark,
    ),
  );
  runApp(const AgriTraceApp());
}

// ============================================================================
// DESIGN TOKENS - Sistema de Diseño AgriTrace
// ============================================================================

class AgriColors {
  // Colores Primarios
  static const Color verdePrimario = Color(0xFF2D7A3E);
  static const Color verdeOscuro = Color(0xFF1B5028);
  static const Color verdeClaro = Color(0xFFE8F5E9);
  
  // Colores Secundarios
  static const Color cafeTierra = Color(0xFF6D4C3D);
  static const Color amarilloCosecha = Color(0xFFF9A825);
  static const Color azulCertificacion = Color(0xFF1976D2);
  
  // Colores del Sistema
  static const Color error = Color(0xFFD32F2F);
  static const Color warning = Color(0xFFF57C00);
  static const Color success = Color(0xFF388E3C);
  static const Color info = Color(0xFF0288D1);
  
  // Escala de Grises
  static const Color negro = Color(0xFF212121);
  static const Color grisOscuro = Color(0xFF424242);
  static const Color grisMedio = Color(0xFF757575);
  static const Color grisClaro = Color(0xFFE0E0E0);
  static const Color grisMuyClaro = Color(0xFFF5F5F5);
  static const Color blanco = Color(0xFFFFFFFF);
  
  // Badges de Estado
  static const Color activoBg = Color(0xFFE8F5E9);
  static const Color activoText = Color(0xFF2D7A3E);
  static const Color pendienteBg = Color(0xFFFFF8E1);
  static const Color pendienteText = Color(0xFFF9A825);
  static const Color vencidoBg = Color(0xFFFFEBEE);
  static const Color vencidoText = Color(0xFFD32F2F);
  static const Color certificadoBg = Color(0xFFE3F2FD);
  static const Color certificadoText = Color(0xFF1976D2);
}

class AgriTypography {
  static const String fontFamily = 'Inter';
  static const String fontFamilyLogo = 'Poppins';
  
  static const TextStyle h1 = TextStyle(
    fontFamily: fontFamily,
    fontWeight: FontWeight.bold,
    fontSize: 32,
    height: 1.25,
    color: AgriColors.negro,
  );
  
  static const TextStyle h2 = TextStyle(
    fontFamily: fontFamily,
    fontWeight: FontWeight.w600,
    fontSize: 24,
    height: 1.33,
    color: AgriColors.negro,
  );
  
  static const TextStyle h3 = TextStyle(
    fontFamily: fontFamily,
    fontWeight: FontWeight.w600,
    fontSize: 20,
    height: 1.4,
    color: AgriColors.negro,
  );
  
  static const TextStyle h4 = TextStyle(
    fontFamily: fontFamily,
    fontWeight: FontWeight.w500,
    fontSize: 18,
    height: 1.44,
    color: AgriColors.negro,
  );
  
  static const TextStyle bodyLarge = TextStyle(
    fontFamily: fontFamily,
    fontWeight: FontWeight.normal,
    fontSize: 16,
    height: 1.5,
    color: AgriColors.negro,
  );
  
  static const TextStyle body = TextStyle(
    fontFamily: fontFamily,
    fontWeight: FontWeight.normal,
    fontSize: 14,
    height: 1.57,
    color: AgriColors.negro,
  );
  
  static const TextStyle small = TextStyle(
    fontFamily: fontFamily,
    fontWeight: FontWeight.normal,
    fontSize: 12,
    height: 1.5,
    color: AgriColors.grisMedio,
  );
  
  static const TextStyle button = TextStyle(
    fontFamily: fontFamily,
    fontWeight: FontWeight.w500,
    fontSize: 14,
    height: 1.43,
  );
}

class AgriSpacing {
  static const double xs = 4;
  static const double sm = 8;
  static const double md = 16;
  static const double lg = 24;
  static const double xl = 32;
  static const double xxl = 48;
  static const double xxxl = 64;
}

// ============================================================================
// APP PRINCIPAL
// ============================================================================

class AgriTraceApp extends StatelessWidget {
  const AgriTraceApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AgriTrace',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primaryColor: AgriColors.verdePrimario,
        scaffoldBackgroundColor: AgriColors.blanco,
        fontFamily: AgriTypography.fontFamily,
        colorScheme: ColorScheme.fromSeed(
          seedColor: AgriColors.verdePrimario,
          primary: AgriColors.verdePrimario,
        ),
        appBarTheme: const AppBarTheme(
          backgroundColor: AgriColors.blanco,
          foregroundColor: AgriColors.negro,
          elevation: 0,
        ),
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => const SplashScreen(),
        '/welcome': (context) => const WelcomeScreen(),
        '/login': (context) => const LoginScreen(),
        '/register': (context) => const RegisterScreen(),
        '/register-finca': (context) => const RegisterFincaScreen(),
        '/vista-lote': (context) => const VistaLoteScreen(),
        '/registrar-actividad': (context) => const RegistrarActividadScreen(),
        '/generar-qr': (context) => const GenerarQRScreen(),
        '/pagina-publica': (context) => const PaginaPublicaScreen(),
      },
    );
  }
}

// ============================================================================
// COMPONENTES REUTILIZABLES
// ============================================================================

// Botón Primario
class AgriButtonPrimary extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final bool isLoading;
  final IconData? icon;

  const AgriButtonPrimary({
    super.key,
    required this.text,
    this.onPressed,
    this.isLoading = false,
    this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: 48,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 4,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: ElevatedButton(
        onPressed: isLoading ? null : onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: AgriColors.verdePrimario,
          foregroundColor: AgriColors.blanco,
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        ),
        child: isLoading
            ? const SizedBox(
                height: 20,
                width: 20,
                child: CircularProgressIndicator(
                  strokeWidth: 2,
                  valueColor: AlwaysStoppedAnimation<Color>(AgriColors.blanco),
                ),
              )
            : Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  if (icon != null) ...[
                    Icon(icon, size: 20),
                    const SizedBox(width: 8),
                  ],
                  Text(
                    text,
                    style: AgriTypography.button.copyWith(
                      color: AgriColors.blanco,
                    ),
                  ),
                ],
              ),
      ),
    );
  }
}

// Botón Secundario
class AgriButtonSecondary extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final IconData? icon;

  const AgriButtonSecondary({
    super.key,
    required this.text,
    this.onPressed,
    this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: 48,
      child: OutlinedButton(
        onPressed: onPressed,
        style: OutlinedButton.styleFrom(
          foregroundColor: AgriColors.verdePrimario,
          side: const BorderSide(color: AgriColors.verdePrimario, width: 1),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (icon != null) ...[
              Icon(icon, size: 20),
              const SizedBox(width: 8),
            ],
            Text(
              text,
              style: AgriTypography.button.copyWith(
                color: AgriColors.verdePrimario,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// Campo de texto
class AgriTextField extends StatelessWidget {
  final String label;
  final String? hint;
  final TextEditingController? controller;
  final bool obscureText;
  final TextInputType? keyboardType;
  final Widget? suffixIcon;
  final String? Function(String?)? validator;

  const AgriTextField({
    super.key,
    required this.label,
    this.hint,
    this.controller,
    this.obscureText = false,
    this.keyboardType,
    this.suffixIcon,
    this.validator,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: AgriTypography.body.copyWith(
            color: AgriColors.grisOscuro,
            fontWeight: FontWeight.w500,
          ),
        ),
        const SizedBox(height: 8),
        TextFormField(
          controller: controller,
          obscureText: obscureText,
          keyboardType: keyboardType,
          validator: validator,
          style: AgriTypography.body,
          decoration: InputDecoration(
            hintText: hint,
            hintStyle: AgriTypography.body.copyWith(
              color: AgriColors.grisMedio,
            ),
            filled: true,
            fillColor: AgriColors.blanco,
            contentPadding: const EdgeInsets.symmetric(
              horizontal: 16,
              vertical: 12,
            ),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(8),
              borderSide: const BorderSide(color: AgriColors.grisClaro),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(8),
              borderSide: const BorderSide(color: AgriColors.grisClaro),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(8),
              borderSide: const BorderSide(color: AgriColors.azulCertificacion, width: 2),
            ),
            errorBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(8),
              borderSide: const BorderSide(color: AgriColors.error),
            ),
            suffixIcon: suffixIcon,
          ),
        ),
      ],
    );
  }
}

// Tarjeta estándar
class AgriCard extends StatelessWidget {
  final Widget child;
  final EdgeInsets? padding;
  final VoidCallback? onTap;

  const AgriCard({
    super.key,
    required this.child,
    this.padding,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: padding ?? const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: AgriColors.blanco,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: AgriColors.grisClaro),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.08),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: child,
      ),
    );
  }
}

// Badge de estado
class AgriBadge extends StatelessWidget {
  final String text;
  final BadgeType type;

  const AgriBadge({
    super.key,
    required this.text,
    required this.type,
  });

  @override
  Widget build(BuildContext context) {
    Color bgColor;
    Color textColor;

    switch (type) {
      case BadgeType.activo:
        bgColor = AgriColors.activoBg;
        textColor = AgriColors.activoText;
        break;
      case BadgeType.pendiente:
        bgColor = AgriColors.pendienteBg;
        textColor = AgriColors.pendienteText;
        break;
      case BadgeType.vencido:
        bgColor = AgriColors.vencidoBg;
        textColor = AgriColors.vencidoText;
        break;
      case BadgeType.certificado:
        bgColor = AgriColors.certificadoBg;
        textColor = AgriColors.certificadoText;
        break;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Text(
        text,
        style: AgriTypography.small.copyWith(
          color: textColor,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }
}

enum BadgeType { activo, pendiente, vencido, certificado }

// Logo de AgriTrace
class AgriTraceLogo extends StatelessWidget {
  final double size;
  final bool showText;

  const AgriTraceLogo({
    super.key,
    this.size = 80,
    this.showText = true,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        // Icono del logo (hoja estilizada con lupa)
        Container(
          width: size,
          height: size,
          decoration: BoxDecoration(
            color: AgriColors.verdeClaro,
            shape: BoxShape.circle,
          ),
          child: Stack(
            alignment: Alignment.center,
            children: [
              // Hoja
              Icon(
                Icons.eco,
                size: size * 0.5,
                color: AgriColors.verdePrimario,
              ),
              // Lupa (posicionada)
              Positioned(
                right: size * 0.15,
                bottom: size * 0.15,
                child: Container(
                  padding: const EdgeInsets.all(4),
                  decoration: BoxDecoration(
                    color: AgriColors.verdePrimario,
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    Icons.search,
                    size: size * 0.2,
                    color: AgriColors.blanco,
                  ),
                ),
              ),
            ],
          ),
        ),
        if (showText) ...[
          const SizedBox(height: 16),
          Text(
            'AgriTrace',
            style: TextStyle(
              fontFamily: 'Poppins',
              fontSize: 28,
              fontWeight: FontWeight.w600,
              color: AgriColors.verdePrimario,
            ),
          ),
        ],
      ],
    );
  }
}

// ============================================================================
// PANTALLA 1: SPLASH SCREEN
// ============================================================================

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fadeAnimation;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );

    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeIn),
    );

    _scaleAnimation = Tween<double>(begin: 0.8, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOutBack),
    );

    _controller.forward();

    // Navegar después de 2 segundos
    Future.delayed(const Duration(seconds: 2), () {
      Navigator.pushReplacementNamed(context, '/welcome');
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AgriColors.blanco,
      body: Center(
        child: AnimatedBuilder(
          animation: _controller,
          builder: (context, child) {
            return FadeTransition(
              opacity: _fadeAnimation,
              child: ScaleTransition(
                scale: _scaleAnimation,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const AgriTraceLogo(size: 120),
                    const SizedBox(height: 16),
                    Text(
                      'Trazabilidad que conecta',
                      style: AgriTypography.body.copyWith(
                        color: AgriColors.grisMedio,
                      ),
                    ),
                    const SizedBox(height: 48),
                    // Loading dots
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: List.generate(3, (index) {
                        return TweenAnimationBuilder<double>(
                          tween: Tween(begin: 0.0, end: 1.0),
                          duration: Duration(milliseconds: 600 + (index * 200)),
                          builder: (context, value, child) {
                            return Container(
                              margin: const EdgeInsets.symmetric(horizontal: 4),
                              width: 8,
                              height: 8,
                              decoration: BoxDecoration(
                                color: AgriColors.verdePrimario.withOpacity(value),
                                shape: BoxShape.circle,
                              ),
                            );
                          },
                        );
                      }),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}

// ============================================================================
// PANTALLA 2: WELCOME / BIENVENIDA
// ============================================================================

class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AgriColors.blanco,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(AgriSpacing.md),
          child: Column(
            children: [
              const Spacer(flex: 2),
              // Logo y título
              const AgriTraceLogo(size: 100),
              const SizedBox(height: 12),
              Text(
                'Plataforma de trazabilidad\ny exportación sostenible',
                textAlign: TextAlign.center,
                style: AgriTypography.body.copyWith(
                  color: AgriColors.grisMedio,
                ),
              ),
              const Spacer(flex: 3),
              // Botones de acción
              AgriButtonPrimary(
                text: 'Ingresar',
                onPressed: () => Navigator.pushNamed(context, '/login'),
              ),
              const SizedBox(height: 12),
              AgriButtonSecondary(
                text: 'Crear cuenta',
                onPressed: () => Navigator.pushNamed(context, '/register'),
              ),
              const Spacer(),
            ],
          ),
        ),
      ),
    );
  }
}

// ============================================================================
// PANTALLA 3: LOGIN
// ============================================================================

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _obscurePassword = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AgriColors.blanco,
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(AgriSpacing.md),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(height: 20),
                // Logo pequeño centrado
                Center(
                  child: AgriTraceLogo(size: 60, showText: false),
                ),
                const SizedBox(height: 32),
                Text(
                  'Iniciar sesión',
                  style: AgriTypography.h2,
                ),
                const SizedBox(height: 32),
                // Email
                AgriTextField(
                  label: 'Celular o correo',
                  hint: 'ejemplo@correo.com',
                  controller: _emailController,
                  keyboardType: TextInputType.emailAddress,
                ),
                const SizedBox(height: 20),
                // Contraseña
                AgriTextField(
                  label: 'Contraseña',
                  hint: '••••••••',
                  controller: _passwordController,
                  obscureText: _obscurePassword,
                  suffixIcon: IconButton(
                    icon: Icon(
                      _obscurePassword ? Icons.visibility_off : Icons.visibility,
                      color: AgriColors.grisMedio,
                    ),
                    onPressed: () {
                      setState(() {
                        _obscurePassword = !_obscurePassword;
                      });
                    },
                  ),
                ),
                const SizedBox(height: 12),
                // Olvidé contraseña
                Align(
                  alignment: Alignment.centerRight,
                  child: TextButton(
                    onPressed: () {},
                    child: Text(
                      '¿Olvidaste contraseña?',
                      style: AgriTypography.body.copyWith(
                        color: AgriColors.azulCertificacion,
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 24),
                // Botón login
                AgriButtonPrimary(
                  text: 'Iniciar sesión',
                  onPressed: () {
                    // Simular login exitoso
                    Navigator.pushReplacementNamed(context, '/register-finca');
                  },
                ),
                const SizedBox(height: 24),
                // Separador
                Row(
                  children: [
                    const Expanded(child: Divider()),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      child: Text(
                        'o',
                        style: AgriTypography.body.copyWith(
                          color: AgriColors.grisMedio,
                        ),
                      ),
                    ),
                    const Expanded(child: Divider()),
                  ],
                ),
                const SizedBox(height: 24),
                // Login con Google
                AgriButtonSecondary(
                  text: 'Google',
                  icon: Icons.g_mobiledata,
                  onPressed: () {},
                ),
                const SizedBox(height: 32),
                // Link a registro
                Center(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        '¿No tienes cuenta? ',
                        style: AgriTypography.body.copyWith(
                          color: AgriColors.grisMedio,
                        ),
                      ),
                      TextButton(
                        onPressed: () => Navigator.pushNamed(context, '/register'),
                        style: TextButton.styleFrom(
                          padding: EdgeInsets.zero,
                          minimumSize: Size.zero,
                        ),
                        child: Text(
                          'Regístrate',
                          style: AgriTypography.body.copyWith(
                            color: AgriColors.verdePrimario,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// ============================================================================
// PANTALLA 4: REGISTRO
// ============================================================================

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  String? _selectedRole;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AgriColors.blanco,
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text('Crear cuenta'),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(AgriSpacing.md),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Indicador de progreso
                Row(
                  children: [
                    Text(
                      'Paso 1 de 2',
                      style: AgriTypography.small.copyWith(
                        color: AgriColors.verdePrimario,
                      ),
                    ),
                    const Spacer(),
                  ],
                ),
                const SizedBox(height: 8),
                LinearProgressIndicator(
                  value: 0.5,
                  backgroundColor: AgriColors.grisClaro,
                  valueColor: const AlwaysStoppedAnimation<Color>(
                    AgriColors.verdePrimario,
                  ),
                ),
                const SizedBox(height: 32),
                Text(
                  'Información básica',
                  style: AgriTypography.h3,
                ),
                const SizedBox(height: 24),
                // Nombre completo
                const AgriTextField(
                  label: 'Nombre completo',
                  hint: 'Ej: Juan Gómez',
                ),
                const SizedBox(height: 20),
                // Número de celular
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Número de celular',
                      style: AgriTypography.body.copyWith(
                        color: AgriColors.grisOscuro,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 12,
                            vertical: 12,
                          ),
                          decoration: BoxDecoration(
                            border: Border.all(color: AgriColors.grisClaro),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Row(
                            children: [
                              Text('🇨🇴', style: TextStyle(fontSize: 20)),
                              const SizedBox(width: 4),
                              Text(
                                '+57',
                                style: AgriTypography.body,
                              ),
                              const Icon(Icons.arrow_drop_down, size: 20),
                            ],
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: TextFormField(
                            keyboardType: TextInputType.phone,
                            style: AgriTypography.body,
                            decoration: InputDecoration(
                              hintText: '300 123 4567',
                              hintStyle: AgriTypography.body.copyWith(
                                color: AgriColors.grisMedio,
                              ),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(8),
                                borderSide: const BorderSide(
                                  color: AgriColors.grisClaro,
                                ),
                              ),
                              enabledBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(8),
                                borderSide: const BorderSide(
                                  color: AgriColors.grisClaro,
                                ),
                              ),
                              contentPadding: const EdgeInsets.symmetric(
                                horizontal: 16,
                                vertical: 12,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 20),
                // Correo electrónico
                const AgriTextField(
                  label: 'Correo electrónico',
                  hint: '(Opcional)',
                  keyboardType: TextInputType.emailAddress,
                ),
                const SizedBox(height: 20),
                // Selector de rol
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Tipo de cuenta',
                      style: AgriTypography.body.copyWith(
                        color: AgriColors.grisOscuro,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        _buildRoleOption('Productor', Icons.agriculture),
                        const SizedBox(width: 12),
                        _buildRoleOption('Cooperativa', Icons.groups),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 32),
                // Botón continuar
                AgriButtonPrimary(
                  text: 'Continuar',
                  onPressed: () {
                    Navigator.pushReplacementNamed(context, '/register-finca');
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildRoleOption(String label, IconData icon) {
    final isSelected = _selectedRole == label;
    return Expanded(
      child: GestureDetector(
        onTap: () {
          setState(() {
            _selectedRole = label;
          });
        },
        child: Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: isSelected ? AgriColors.verdeClaro : AgriColors.blanco,
            borderRadius: BorderRadius.circular(8),
            border: Border.all(
              color: isSelected ? AgriColors.verdePrimario : AgriColors.grisClaro,
              width: isSelected ? 2 : 1,
            ),
          ),
          child: Column(
            children: [
              Icon(
                icon,
                size: 32,
                color: isSelected ? AgriColors.verdePrimario : AgriColors.grisMedio,
              ),
              const SizedBox(height: 8),
              Text(
                label,
                style: AgriTypography.body.copyWith(
                  color: isSelected ? AgriColors.verdePrimario : AgriColors.grisOscuro,
                  fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// ============================================================================
// PANTALLA 5: REGISTRAR FINCA
// ============================================================================

class RegisterFincaScreen extends StatelessWidget {
  const RegisterFincaScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AgriColors.grisMuyClaro,
      appBar: AppBar(
        backgroundColor: AgriColors.grisMuyClaro,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text('Registrar finca'),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(AgriSpacing.md),
          child: AgriCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Registrar finca',
                  style: AgriTypography.h3,
                ),
                const SizedBox(height: 24),
                // Nombre de la finca
                const AgriTextField(
                  label: 'Nombre de finca',
                  hint: 'Ej: Finca La Esperanza',
                ),
                const SizedBox(height: 20),
                // Municipio
                const AgriTextField(
                  label: 'Municipio',
                  hint: 'Ej: Buga, Valle del Cauca',
                ),
                const SizedBox(height: 20),
                // Coordenadas
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Coordenadas',
                      style: AgriTypography.body.copyWith(
                        color: AgriColors.grisOscuro,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(height: 8),
                    OutlinedButton.icon(
                      onPressed: () {},
                      icon: const Icon(Icons.my_location, size: 20),
                      label: const Text('Obtener ubicación'),
                      style: OutlinedButton.styleFrom(
                        foregroundColor: AgriColors.grisOscuro,
                        side: const BorderSide(color: AgriColors.grisClaro),
                        padding: const EdgeInsets.symmetric(
                          horizontal: 16,
                          vertical: 12,
                        ),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 20),
                // Cultivo principal
                const AgriTextField(
                  label: 'Cultivo principal',
                  hint: 'Ej: Café',
                ),
                const SizedBox(height: 32),
                // Botón guardar
                AgriButtonPrimary(
                  text: 'Guardar',
                  onPressed: () {
                    Navigator.pushReplacementNamed(context, '/vista-lote');
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// ============================================================================
// PANTALLA 6: VISTA DE LOTE
// ============================================================================

class VistaLoteScreen extends StatelessWidget {
  const VistaLoteScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AgriColors.grisMuyClaro,
      appBar: AppBar(
        backgroundColor: AgriColors.grisMuyClaro,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text('Vista de lote'),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(AgriSpacing.md),
          child: AgriCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Breadcrumb
                Row(
                  children: [
                    Text(
                      'Finca',
                      style: AgriTypography.small.copyWith(
                        color: AgriColors.grisMedio,
                      ),
                    ),
                    const Icon(
                      Icons.chevron_right,
                      size: 16,
                      color: AgriColors.grisMedio,
                    ),
                    Text(
                      'Lote',
                      style: AgriTypography.small.copyWith(
                        color: AgriColors.grisMedio,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                Text(
                  'Vista de lote',
                  style: AgriTypography.h3,
                ),
                const SizedBox(height: 16),
                // Selector de lote
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 12,
                  ),
                  decoration: BoxDecoration(
                    border: Border.all(color: AgriColors.grisClaro),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Lote 2',
                        style: AgriTypography.body,
                      ),
                      const Icon(Icons.arrow_drop_down),
                    ],
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  'Cafe',
                  style: AgriTypography.body.copyWith(
                    color: AgriColors.grisMedio,
                  ),
                ),
                const SizedBox(height: 16),
                // Mapa placeholder
                Container(
                  height: 120,
                  decoration: BoxDecoration(
                    color: AgriColors.verdeClaro.withOpacity(0.5),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Stack(
                    children: [
                      // Patrón de mapa
                      Positioned.fill(
                        child: CustomPaint(
                          painter: MapPatternPainter(),
                        ),
                      ),
                      // Pin de ubicación
                      Center(
                        child: Icon(
                          Icons.location_on,
                          size: 40,
                          color: AgriColors.verdePrimario,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),
                // Actividades
                Text(
                  'Actividades',
                  style: AgriTypography.body.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 12),
                // Lista de actividades
                _buildActivityItem(
                  icon: Icons.grass,
                  title: 'Siembra',
                  onTap: () {},
                ),
                const Divider(height: 1),
                _buildActivityItem(
                  icon: Icons.local_florist,
                  title: 'Fertilización',
                  onTap: () => Navigator.pushNamed(context, '/registrar-actividad'),
                ),
                const SizedBox(height: 24),
                // Botón Generar QR
                AgriButtonPrimary(
                  text: 'Generar QR',
                  onPressed: () => Navigator.pushNamed(context, '/generar-qr'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildActivityItem({
    required IconData icon,
    required String title,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 12),
        child: Row(
          children: [
            Icon(
              icon,
              color: AgriColors.cafeTierra,
              size: 24,
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                title,
                style: AgriTypography.body,
              ),
            ),
            const Icon(
              Icons.chevron_right,
              color: AgriColors.grisMedio,
            ),
          ],
        ),
      ),
    );
  }
}

// Painter para patrón de mapa
class MapPatternPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = AgriColors.verdePrimario.withOpacity(0.1)
      ..strokeWidth = 1
      ..style = PaintingStyle.stroke;

    // Dibujar líneas de cuadrícula
    for (var i = 0; i < size.width; i += 20) {
      canvas.drawLine(
        Offset(i.toDouble(), 0),
        Offset(i.toDouble(), size.height),
        paint,
      );
    }
    for (var i = 0; i < size.height; i += 20) {
      canvas.drawLine(
        Offset(0, i.toDouble()),
        Offset(size.width, i.toDouble()),
        paint,
      );
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

// ============================================================================
// PANTALLA 7: REGISTRAR ACTIVIDAD
// ============================================================================

class RegistrarActividadScreen extends StatefulWidget {
  const RegistrarActividadScreen({super.key});

  @override
  State<RegistrarActividadScreen> createState() => _RegistrarActividadScreenState();
}

class _RegistrarActividadScreenState extends State<RegistrarActividadScreen> {
  String _selectedType = 'Fertilización';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AgriColors.grisMuyClaro,
      appBar: AppBar(
        backgroundColor: AgriColors.grisMuyClaro,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text('Registrar actividad'),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(AgriSpacing.md),
          child: AgriCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Registrar\nactividad',
                  style: AgriTypography.h3,
                ),
                const SizedBox(height: 24),
                // Tipo de actividad
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Tipo',
                      style: AgriTypography.body.copyWith(
                        color: AgriColors.grisOscuro,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 12,
                      ),
                      decoration: BoxDecoration(
                        border: Border.all(color: AgriColors.grisClaro),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            _selectedType,
                            style: AgriTypography.body,
                          ),
                          const Icon(Icons.arrow_drop_down),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 20),
                // Fecha
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Fecha',
                      style: AgriTypography.body.copyWith(
                        color: AgriColors.grisOscuro,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 12,
                      ),
                      decoration: BoxDecoration(
                        border: Border.all(color: AgriColors.grisClaro),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Apr 15, 2024',
                            style: AgriTypography.body,
                          ),
                          const Icon(
                            Icons.calendar_today,
                            size: 20,
                            color: AgriColors.grisMedio,
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 20),
                // Botón agregar foto
                Container(
                  width: double.infinity,
                  child: ElevatedButton.icon(
                    onPressed: () {},
                    icon: const Icon(Icons.add),
                    label: const Text('Agregar foto'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AgriColors.verdePrimario,
                      foregroundColor: AgriColors.blanco,
                      padding: const EdgeInsets.symmetric(vertical: 12),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 20),
                // Notas
                const AgriTextField(
                  label: 'Notas',
                  hint: 'Escribe notas adicionales...',
                ),
                const SizedBox(height: 32),
                // Botón guardar
                AgriButtonPrimary(
                  text: 'Guardar',
                  onPressed: () {
                    Navigator.pop(context);
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: const Text('Actividad registrada exitosamente'),
                        backgroundColor: AgriColors.success,
                        behavior: SnackBarBehavior.floating,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                    );
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// ============================================================================
// PANTALLA 8: GENERAR QR
// ============================================================================

class GenerarQRScreen extends StatelessWidget {
  const GenerarQRScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AgriColors.grisMuyClaro,
      appBar: AppBar(
        backgroundColor: AgriColors.grisMuyClaro,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text('Generar QR'),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(AgriSpacing.md),
          child: AgriCard(
            child: Column(
              children: [
                Text(
                  'Generar QR',
                  style: AgriTypography.h3,
                ),
                const SizedBox(height: 24),
                // QR Code placeholder
                Container(
                  padding: const EdgeInsets.all(24),
                  decoration: BoxDecoration(
                    color: AgriColors.blanco,
                    borderRadius: BorderRadius.circular(12),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.15),
                        blurRadius: 12,
                        offset: const Offset(0, 4),
                      ),
                    ],
                  ),
                  child: Column(
                    children: [
                      // QR Code visual
                      Container(
                        width: 180,
                        height: 180,
                        child: CustomPaint(
                          painter: QRCodePainter(),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),
                // Info del lote
                Text(
                  'Lote 2',
                  style: AgriTypography.h4,
                ),
                const SizedBox(height: 4),
                Text(
                  'Cafe',
                  style: AgriTypography.body.copyWith(
                    color: AgriColors.grisMedio,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  'Certificación valida 12/12/2024',
                  style: AgriTypography.small.copyWith(
                    color: AgriColors.grisMedio,
                  ),
                ),
                const SizedBox(height: 32),
                // Botón generar QR
                AgriButtonPrimary(
                  text: 'Generar QR',
                  onPressed: () {
                    Navigator.pushNamed(context, '/pagina-publica');
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// Painter para QR Code
class QRCodePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = AgriColors.negro
      ..style = PaintingStyle.fill;

    final cellSize = size.width / 25;
    
    // Patrón QR simplificado
    final pattern = [
      [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,1,0,0,1,0,1,0,1,0,1,0,0,1,0,0,0,0,0,1],
      [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
      [1,0,1,1,1,0,1,0,0,1,0,1,0,1,0,1,0,0,1,0,1,1,1,0,1],
      [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,1,0,0,1,0,1,0,1,0,1,0,0,1,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
      [0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
      [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
      [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
      [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
      [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
      [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
      [0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0],
      [1,1,1,1,1,1,1,0,0,1,0,1,0,1,0,1,0,0,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1],
      [1,0,1,1,1,0,1,0,0,1,0,1,0,1,0,1,0,0,1,0,1,1,1,0,1],
      [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
      [1,0,1,1,1,0,1,0,0,1,0,1,0,1,0,1,0,0,1,0,1,1,1,0,1],
      [1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,0,0,1,0,1,0,1,0,1,0,0,1,1,1,1,1,1,1],
    ];

    for (var y = 0; y < pattern.length; y++) {
      for (var x = 0; x < pattern[y].length; x++) {
        if (pattern[y][x] == 1) {
          canvas.drawRect(
            Rect.fromLTWH(
              x * cellSize,
              y * cellSize,
              cellSize,
              cellSize,
            ),
            paint,
          );
        }
      }
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

// ============================================================================
// PANTALLA 9: PÁGINA PÚBLICA DE TRAZABILIDAD
// ============================================================================

class PaginaPublicaScreen extends StatelessWidget {
  const PaginaPublicaScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AgriColors.grisMuyClaro,
      appBar: AppBar(
        backgroundColor: AgriColors.grisMuyClaro,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text('Trazabilidad'),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(AgriSpacing.md),
          child: AgriCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Página pública\nde trazabilidad',
                  style: AgriTypography.h3,
                ),
                const SizedBox(height: 24),
                // Info del productor
                Text(
                  'Productor',
                  style: AgriTypography.small.copyWith(
                    color: AgriColors.grisMedio,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  'Juan Pérez',
                  style: AgriTypography.h4,
                ),
                const SizedBox(height: 16),
                // Finca
                Text(
                  'Finca La Fortuna',
                  style: AgriTypography.body.copyWith(
                    color: AgriColors.grisOscuro,
                  ),
                ),
                const SizedBox(height: 16),
                // Lote
                Text(
                  'Lote 1',
                  style: AgriTypography.h4,
                ),
                const SizedBox(height: 8),
                // Tipo de cultivo
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 12,
                  ),
                  decoration: BoxDecoration(
                    border: Border.all(color: AgriColors.grisClaro),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    'Café',
                    style: AgriTypography.body,
                  ),
                ),
                const SizedBox(height: 24),
                // Certificaciones
                Text(
                  'Certificaciones',
                  style: AgriTypography.body.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 12),
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 12,
                  ),
                  decoration: BoxDecoration(
                    color: AgriColors.certificadoBg,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Row(
                    children: [
                      Icon(
                        Icons.verified,
                        color: AgriColors.certificadoText,
                        size: 20,
                      ),
                      const SizedBox(width: 8),
                      Text(
                        'Certificación válida 12/12/20',
                        style: AgriTypography.body.copyWith(
                          color: AgriColors.certificadoText,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),
                // Imagen placeholder de la finca
                Container(
                  height: 150,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(8),
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [
                        AgriColors.verdePrimario.withOpacity(0.3),
                        AgriColors.verdePrimario.withOpacity(0.6),
                      ],
                    ),
                  ),
                  child: Stack(
                    children: [
                      // Patrón de montañas/colinas
                      Positioned.fill(
                        child: CustomPaint(
                          painter: LandscapePainter(),
                        ),
                      ),
                      // Overlay con texto
                      Positioned(
                        bottom: 12,
                        left: 12,
                        child: Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 4,
                          ),
                          decoration: BoxDecoration(
                            color: AgriColors.blanco.withOpacity(0.9),
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: Text(
                            'Finca La Fortuna',
                            style: AgriTypography.small.copyWith(
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),
                // Botón descargar certificado
                AgriButtonPrimary(
                  text: 'Descargar certificado',
                  icon: Icons.download,
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: const Text('Certificado descargado'),
                        backgroundColor: AgriColors.success,
                        behavior: SnackBarBehavior.floating,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                    );
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// Painter para paisaje
class LandscapePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    // Cielo
    final skyPaint = Paint()
      ..shader = LinearGradient(
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
        colors: [
          const Color(0xFF87CEEB).withOpacity(0.5),
          const Color(0xFFB0E0E6).withOpacity(0.3),
        ],
      ).createShader(Rect.fromLTWH(0, 0, size.width, size.height * 0.6));
    
    canvas.drawRect(
      Rect.fromLTWH(0, 0, size.width, size.height * 0.6),
      skyPaint,
    );

    // Montañas
    final mountainPaint = Paint()
      ..color = AgriColors.verdePrimario.withOpacity(0.4);
    
    final mountainPath = Path();
    mountainPath.moveTo(0, size.height * 0.5);
    mountainPath.lineTo(size.width * 0.3, size.height * 0.3);
    mountainPath.lineTo(size.width * 0.5, size.height * 0.45);
    mountainPath.lineTo(size.width * 0.7, size.height * 0.25);
    mountainPath.lineTo(size.width, size.height * 0.4);
    mountainPath.lineTo(size.width, size.height);
    mountainPath.lineTo(0, size.height);
    mountainPath.close();
    
    canvas.drawPath(mountainPath, mountainPaint);

    // Colinas verdes
    final hillPaint = Paint()
      ..color = AgriColors.verdePrimario.withOpacity(0.6);
    
    final hillPath = Path();
    hillPath.moveTo(0, size.height * 0.7);
    hillPath.quadraticBezierTo(
      size.width * 0.25,
      size.height * 0.55,
      size.width * 0.5,
      size.height * 0.65,
    );
    hillPath.quadraticBezierTo(
      size.width * 0.75,
      size.height * 0.75,
      size.width,
      size.height * 0.6,
    );
    hillPath.lineTo(size.width, size.height);
    hillPath.lineTo(0, size.height);
    hillPath.close();
    
    canvas.drawPath(hillPath, hillPaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
