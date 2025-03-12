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
  <title>redirigiendo...</title>
</svelte:head>

<div class="flex flex-col items-center justify-center h-screen bg-gray-500">
  <div class="spinner"></div>
  <p class="mt-4 text-lg text-gray-700">Redirigiendo...</p>
</div>

<style>
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #333;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>