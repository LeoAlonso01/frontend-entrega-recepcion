<script lang="ts">
    import { onMount } from "svelte";
  
    // Función para verificar si el token ha expirado
    function isTokenExpired(token: string): boolean {
      try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decodificar el payload del token
        const expirationTime = payload.exp * 1000; // Convertir a milisegundos
        return Date.now() > expirationTime; // Verificar si el token ha expirado
      } catch (err) {
        return true; // Si hay un error, considerar el token como expirado
      }
    }
  
    onMount(() => {
      const token = localStorage.getItem("token");
  
      if (!token || isTokenExpired(token)) {
        // Limpiar el token si está expirado
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirigir al login
        return;
      }
  
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const role = payload.role;
  
        // Simular un pequeño retraso para mostrar la pantalla de carga
        setTimeout(() => {
          if (role === "ADMIN") {
            window.location.href = "/dashboard";
          } else if (role === "USER") {
            window.location.href = "/user-dashboard";
          } else {
            console.error("Rol desconocido:", role);
            localStorage.removeItem("token");
            window.location.href = "/login";
          }
        }, 500); // Retraso de 500ms para mostrar la pantalla de carga
  
      } catch (err) {
        console.error("Error al decodificar el token:", err.message);
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    });
  </script>
  
  <svelte:head>
    <title>Cargando...</title>
  </svelte:head>
  
  <div class="flex flex-col items-center justify-center h-screen bg-gray-500">
    <div class="spinner"></div>
    <p class="mt-4 text-lg text-gray-700">Verificando sesión...</p>
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