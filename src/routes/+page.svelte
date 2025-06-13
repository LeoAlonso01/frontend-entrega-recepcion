<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  // Verificar el token al cargar la página
    onMount(async () => {
    const token = localStorage.getItem('token');
    const isTokenExpired = (token) => {
      if (!token) return true;
      const [, payload] = token.split('.');
      const data = JSON.parse(atob(payload));
      return data.exp * 1000 < Date.now();
    };

    if (!token || isTokenExpired(token)) {
      // Limpiar el token si está expirado
      localStorage.removeItem('token');
      await goto('/login') // Redirigir al login
    } else {
      await goto('/dashboard'); // Redirigir al dashboard si hay token válido
    }

  });
  
</script>

<svelte:head>
  <title>Redirigiendo...</title>
</svelte:head>

<div class="flex flex-col items-center justify-center h-screen bg-gray-900">
  <div class="spinner"></div>
  <p class="mt-4 text-lg text-gray-700">Redirigiendo...</p>
</div>

<style>
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #4529ac;
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