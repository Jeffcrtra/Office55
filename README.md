# Office 55 — V1

App móvil y de escritorio con inicio sobrio, registro de nombre y teléfono de 8 dígitos (sin +506), calendario separado, corrección de visitas y metas configurables. Funciona sin dependencias de JavaScript externas.

## Probar

Abre index.html para probar el modo local. Para probar la instalación como PWA utiliza un servidor HTTP local o publica en GitHub Pages (HTTPS).

Los datos se guardan inicialmente en este navegador. No hay datos de ejemplo precargados. Descarga respaldos desde Ajustes.

## Activar Supabase

1. Ejecuta supabase.sql una sola vez en SQL Editor.
2. Activa Anonymous Sign-Ins en Authentication. Cada instalación obtiene una sesión privada; las políticas RLS impiden leer o editar los datos de otras sesiones.
3. Completa config.js con la URL de tu proyecto y la clave pública publishable/anon. Nunca uses service_role.
4. Publica los archivos y crea el perfil. Si ya usaste el modo local, el siguiente cambio se guardará en la nube al activar la configuración, siempre que esa sesión aún no tenga un registro.

Nombre y teléfono NO son credenciales. En V1 no hay recuperación ni sincronización entre dispositivos. Perder la sesión del navegador impide recuperar la cuenta anónima. Para acceso entre dispositivos debe añadirse autenticación verificada. No se envían SMS. Guarda respaldos periódicos. Con Supabase configurado se requiere conexión para guardar cambios; un error se muestra y el cambio no se da por guardado.

## Publicar en GitHub Pages

1. Crea un repositorio y sube el contenido de esta carpeta a su raíz.
2. Settings > Pages: selecciona Deploy from a branch, main y / (root).
3. Abre la URL indicada por GitHub. Desde el menú del navegador puedes instalar/agregar la app a la pantalla de inicio. El soporte y los iconos de instalación varían según el navegador.

## Reglas

- Denominador: lunes a viernes del mes completo, menos días excluidos manualmente.
- Numerador: fechas únicas con visita, incluyendo sábados, domingos y días excluidos.
- Meta estricta: floor(días laborables × porcentaje / 100) + 1.
- 22 días: mínimo >50% = 12 visitas; meta >55% = 13 visitas.
- No se registran visitas futuras. Sí se pueden excluir feriados futuros.
- Sin días laborables, el porcentaje queda sin definir.
- Los feriados no se cargan automáticamente. La ubicación y el badge corporativo no están conectados; las visitas son autorreportadas.

## Validación

Verificados sintaxis de JavaScript y cálculo de umbrales, fines de semana, exclusiones y deduplicación. La conexión real requiere configurar y comprobar tu proyecto Supabase. La prueba automática visual no pudo ejecutarse porque este entorno no dispone de Chromium.
