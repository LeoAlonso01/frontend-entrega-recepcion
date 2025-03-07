import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get('token'); // Obtener el token de las cookies
  const { pathname } = event.url;

  // Redirigir a login si no hay token y no está en la ruta de login
  if (!token && !pathname.startsWith('/login')) {
    throw redirect(302, '/login');
  }

  // Redirigir al dashboard si ya está autenticado y trata de acceder al login
  if (token && pathname.startsWith('/login')) {
    throw redirect(302, '/dashboard');
  }

  return resolve(event);
};
