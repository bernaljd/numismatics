# Configuración de Supabase para Colección Numismática

## 1. Crear Proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Regístrate o inicia sesión
3. Click en "New Project"
4. Completa:
   - **Name**: Colección Numismática (o el nombre que prefieras)
   - **Database Password**: Crea una contraseña segura (¡GUÁRDALA!)
   - **Region**: Selecciona la más cercana a ti
   - **Pricing Plan**: Free (suficiente para desarrollo)
5. Click en "Create new project"
6. Espera 1-2 minutos mientras se configura

## 2. Obtener Credenciales

### A. Project URL y Anon Key (para autenticación)

1. En tu proyecto de Supabase, ve a **Settings** (⚙️) > **API**
2. Encontrarás:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### B. Database URL (para Prisma)

1. Ve a **Settings** (⚙️) > **Database**
2. Busca la sección **Connection string**
3. Selecciona el modo **Transaction**
4. Copia la URL que se ve así: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`
5. Reemplaza `[YOUR-PASSWORD]` con la contraseña que creaste en el paso 1

## 3. Configurar Variables de Entorno

1. Abre el archivo `.env` en la raíz del proyecto
2. Reemplaza los valores placeholder:

```env
DATABASE_URL="postgresql://postgres:TU_CONTRASEÑA@db.xxxxx.supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## 4. Configurar Autenticación en Supabase

1. En Supabase, ve a **Authentication** > **Providers**
2. Asegúrate de que **Email** esté habilitado
3. Configura opciones:
   - **Enable email confirmations**: Desactiva esto para desarrollo (puedes habilitarlo después)
   - **Minimum password length**: 6 (ya está configurado en el código)

## 5. Ejecutar Migraciones de Base de Datos

En tu terminal, ejecuta:

```bash
# Eliminar la base de datos SQLite antigua
Remove-Item -Path "prisma\dev.db*" -Force -ErrorAction SilentlyContinue

# Crear las tablas en Supabase
npx prisma migrate dev --name init_supabase

# Generar el cliente de Prisma
npx prisma generate
```

## 6. (Opcional) Ver la Base de Datos

En Supabase, ve a **Table Editor** para ver tus tablas:
- `Coin` - Monedas
- `Banknote` - Billetes

## 7. Probar la Aplicación

```bash
npm run dev
```

Visita http://localhost:3000 y:
1. Regístrate con un email
2. Inicia sesión
3. Agrega monedas y billetes

## Troubleshooting

### Error: "database 'postgres' does not exist"
- Verifica que copiaste correctamente la DATABASE_URL de Supabase
- Asegúrate de haber reemplazado [YOUR-PASSWORD] con tu contraseña real

### Error: "Invalid API key"
- Verifica que copiaste correctamente NEXT_PUBLIC_SUPABASE_ANON_KEY
- Asegúrate de copiar el "anon public" key, NO el "service_role" key

### No recibo email de confirmación
- En desarrollo, desactiva las confirmaciones por email en Supabase > Authentication > Providers > Email

### Las migraciones fallan
- Verifica tu conexión a internet
- Asegúrate de que la contraseña en DATABASE_URL sea correcta
- Intenta ejecutar: `npx prisma db push` en lugar de migrate

## Ventajas de Supabase

✅ **PostgreSQL en la nube** - No necesitas servidor local  
✅ **Autenticación integrada** - Sistema de usuarios robusto  
✅ **Escalable** - Crece con tu proyecto  
✅ **Storage** - Para futuras imágenes de monedas  
✅ **Real-time** - Actualiza datos en tiempo real (para futuros sprints)  
✅ **Dashboard visual** - Administra datos fácilmente  
✅ **Gratis** - 500MB DB, 1GB Storage, 50,000 usuarios activos

## Próximos Pasos

Una vez configurado, podrás:
- Desplegar en Vercel/Netlify fácilmente
- Agregar subida de imágenes con Supabase Storage
- Implementar real-time para notificaciones
- Escalar sin cambiar código
