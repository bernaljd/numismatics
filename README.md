# Colección Numismática - Sprint 1

Sistema web de gestión de colecciones de monedas y billetes de colección.

## Características del Sprint 1

### Historias de Usuario Implementadas:

**HU-01: Registro de usuarios**
- Formulario de registro con validación
- Hash seguro de contraseñas con bcrypt
- Validación de campos con Zod

**HU-02: Inicio de sesión**
- Autenticación con NextAuth.js v5
- Sesiones seguras con JWT
- Redirect automático al dashboard

**HU-03: Cierre de sesión**
- Logout seguro con NextAuth
- Limpieza de sesión

**HU-05: Registro de monedas**
- Formulario completo: país, año, denominación, estado
- Validación de datos
- Asociación a usuario autenticado

**HU-06: Registro de billetes**
- Formulario con información básica
- Campos opcionales para mayor flexibilidad

**HU-07: Visualización de colección**
- Dashboard interactivo
- Estadísticas de la colección
- Listado de monedas y billetes

**HU-11: Colección privada**
- Cada usuario solo ve su colección
- Middleware de protección de rutas
- Asociación segura usuario-colección

## Stack Tecnológico

- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4
- **Base de Datos**: Supabase PostgreSQL con Prisma ORM
- **Autenticación**: Supabase Auth
- **Validación**: Zod
- **Hosting**: Vercel (recomendado)

## Instalación y Configuración

### 1. Clonar el repositorio e instalar dependencias

```bash
npm install
```

### 2. Configurar Supabase

**¡IMPORTANTE!** Este proyecto usa Supabase para la base de datos y autenticación.

Sigue la guía completa en [SUPABASE_SETUP.md](SUPABASE_SETUP.md) para:
- Crear tu proyecto en Supabase
- Obtener las credenciales necesarias
- Configurar autenticación

**Resumen rápido:**

1. Crea una cuenta en [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Obtén tus credenciales en Settings > API
4. Copia `.env.example` a `.env` y completa:

```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@[PROJECT-REF].supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
```

### 3. Ejecutar migraciones de base de datos

```bash
# Crear las tablas en Supabase
npx prisma migrate dev --name init_supabase

# Generar el cliente de Prisma
npx prisma generate
```

## Ejecución

### Modo desarrollo:
```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

### Compilar para producción:
```bash
npm run build
npm start
```

## Despliegue

### Vercel (Recomendado)

1. Sube tu código a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Importa tu repositorio
4. Configura las variables de entorno:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy

Tu aplicación estará disponible en `https://tu-proyecto.vercel.app`

## Estructura del Proyecto

```
miniproyecto/
├── app/
│   ├── actions/          # Server Actions
│   │   ├── auth.ts       # Registro y login
│   │   └── collection.ts # CRUD de monedas/billetes
│   ├── components/       # Componentes React
│   ├── prisma.ts        # Cliente de Prisma
│   └── supabase/        # Clientes de Supabase
│       ├── client.ts    # Cliente browser
│       └── server.ts    # Cliente server
├── middleware.ts        # Protección de rutas con Supabase
├── SUPABASE_SETUP.md    # Guía detallada de configuración
│   │   └── agregar-billete/
│   ├── login/           # Página de login
│   ├── registro/        # Página de registro
│   ├── api/auth/        # API de NextAuth
Los datos de autenticación (usuarios, sesiones) son manejados automáticamente por Supabase Auth.

### Coin (Moneda)
- id, pais, anio, denominacion, estado
- descripcion, imagen (opcional)
- userId (relación con auth.users de Supabase)

### Banknote (Billete)
- id, pais, anio, denominacion  
- estado, descripcion, imagen (opcional)
- userId (relación con auth.users de Supabase)

## Seguridad

- Autenticación robusta con Supabase Auth
- Contraseñas hasheadas automáticamente
- Row Level Security (RLS) en Supabase
- Middleware de protección de rutas
- Validación de datos con Zod
- Colecciones privadas por usuario
- Variables de entorno para credenciales
- id, pais, anio, denominacion, estado
- descripcion, imagen (opcional)
- userId (relación con User)

### Banknote (Billete)
- id, pais, anio, denominacion
- estado,**Subida de imágenes con Supabase Storage**
- HU-11: Exportar colección (PDF/CSV)

### Sprint 3 (Sugerido):
- HU-12: Publicar piezas para intercambio (catálogo público)
- HU-13: Marketplace con filtros avanzados
- HU-14: Sistema de mensajería en tiempo real (Supabase Realtime)
- HU-15: Propuestas de intercambio

### Sprint 4 (Sugerido):
- HU-16: Sistema de reputación de usuarios
- HU-17: Historial de intercambios
- HU-18: Notificaciones push
- HU-19: Perfil público con estadísticas

## Ventajas de Supabase

- **PostgreSQL en la nube** - Escalable y robusto
- **Auth integrada** - No necesitas backend adicional
- **Storage para imágenes** - Listo para Sprint 2
- **Real-time subscriptions** - Para chat y notificaciones
- **Row Level Security** - Seguridad a nivel de base de datos
- **Dashboard visual** - Administra datos fácilmente
- **Gratis** - 500MB DB, 1GB Storage
- **Fácil depliegue** - Compatible con Vercel
- HU-08: Edición de monedas/billetes
- HU-09: Búsqueda y filtrado avanzado
- HU-10: Subida de imágenes
- HU-11: Exportar colección (PDF/CSV)

### Sprint 3 (Sugerido):
- HU-12: Publicar piezas para intercambio
- HU-13: Marketplace público
- HU-14: Sistema de mensajería
- HU-15: Propuestas de intercambio

### Sprint 4 (Sugerido):
- HU-16: Sistema de reputación
- HU-17: Historial de intercambios
- HU-18: Notificaciones
- HU-19: Perfil público de usuario

## Pruebas de Aceptación

Todas las historias de usuario incluyen sus pruebas de aceptación implementadas:

- Registro: Validación de campos, email único, contraseña segura
- Login: Credenciales válidas, redirect al dashboard
- Colección: Visualización, adición, eliminación con confirmación
- Privacidad: Cada usuario solo accede a su colección

## Desarrollo

Este proyecto usa:
- ESLint para linting
- TypeScript para type safety
- Prettier (recomendado configurar)

---

## Learn More about Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

