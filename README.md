# Invitacion de boda Jeick y Fernanda

## Estructura

- `frontend/`: invitacion React/Vite que se publica en Vercel.
- `backend/`: esquema y documentacion para la base de datos de RSVP en Supabase.

## Desarrollo local

```bash
cd frontend
npm install
npm run dev
```

## Compilar

```bash
cd frontend
npm run build
```

## Vercel

Configura `frontend` como **Root Directory** del proyecto de Vercel. Vercel usara `npm run build` y la carpeta `dist`.

## Supabase

Ejecuta `backend/schema.sql` en el SQL Editor de Supabase. La tabla guardara nombre, cedula, celular, respuesta y fecha de registro.

En `frontend/.env` configura la URL del proyecto y la clave publica `anon` usando `frontend/.env.example` como referencia. No uses la clave `service_role` en el frontend.

## Panel privado de respuestas

La pareja puede consultar las respuestas en `/admin`. En Supabase ve a `Authentication > Users` y crea un usuario con el correo y contraseña que usarán para entrar. Luego abre la invitación en `https://tu-dominio.com/admin`.
