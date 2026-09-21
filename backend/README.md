# Backend

La base de datos y la API de confirmaciones se alojaran en Supabase.

## Configuracion prevista

La tabla `rsvp_responses` guardara:

- nombre
- cedula
- celular
- respuesta (`asistira` o `no_asistira`)
- fecha de registro

Ejecuta `schema.sql` en el SQL Editor de Supabase. Las credenciales publicas se configuraran en el frontend mediante variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.

No guardes la clave `service_role` en el frontend ni la subas al repositorio.
