<script>
  import { onMount } from 'svelte';

  // Verificar el token al cargar la página
  onMount(() => {
    const token = localStorage.getItem('token'); // Obtener el token de localStorage
    if (!token) {
      window.location.href = '/login'; // Redirigir al login si no hay token
    } else {
      window.location.href = '/dashboard'; // Redirigir al dashboard si hay token
    }
  });
</script>

<svelte:head>
  <title>Redirecting...</title>
</svelte:head>

<div>
  <p>Redirecting...</p>
</div>