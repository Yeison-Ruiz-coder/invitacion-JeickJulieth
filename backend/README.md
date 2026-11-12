# Backend

La base de datos y la API de confirmaciones se alojaran en Supabase.

## Configuracion prevista

La tabla `rsvp_responses` guardara los datos de quien registra la respuesta y la lista de acompañantes:

- nombre
- cedula
- celular
- respuesta (`asistira` o `no_asistira`)
- acompanantes (arreglo JSON con la pareja y/o hijos; puede estar vacio)
- fecha de registro

La cédula del titular es única y la base de datos rechaza registros repetidos aunque se envíen desde otro dispositivo. Si la tabla ya contiene cédulas duplicadas, resuélvelas antes de ejecutar el índice único del `schema.sql`.

Ejecuta `schema.sql` en el SQL Editor de Supabase para crear o actualizar la tabla antes de publicar el formulario. Las credenciales públicas se configurarán en el frontend mediante variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.

No guardes la clave `service_role` en el frontend ni la subas al repositorio.
