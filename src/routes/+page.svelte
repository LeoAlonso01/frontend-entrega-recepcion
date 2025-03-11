<script>
  import { onMount } from 'svelte';

  // Verificar el token al cargar la página
  onMount(() => {
  const token = localStorage.getItem('token');
  if (!token || isTokenExpired(token)) {
    // Limpiar el token si está expirado
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirigir al login
  } else {
    window.location.href = '/dashboard'; // Redirigir al dashboard si hay token válido
  }
});
  
</script>

<svelte:head>
  <title>Redirecting...</title>
</svelte:head>

<div>
  <p>Redirecting...</p>
</div>