<script lang="ts">
  import Slider from "../../lib/components/Slider.svelte"; // Importamos el componente Slider
  import { onMount } from "svelte"; // Importamos onMount para ejecutar código al montar el componente
  import { authStore, authService } from "../../lib/stores/auth"; // Importamos el store de autenticación
  let isSidebarOpen = true; // Variable para controlar si el sidebar está abierto o cerrado
  let isSidebarCollapsed = true; // Variable para controlar si el sidebar está colapsado o no

  // Función para cambiar el estado de la variable isSidebarOpen
  function toggleSidebarCollapse() {
    isSidebarCollapsed = !isSidebarCollapsed;
  }

  // Función para cerrar sesión
  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  // Ejecutamos el código al montar el componente
  onMount(() => {
    // Verificamos si el usuario está autenticado
    authService.checkAuth();
  });

</script>

<div class="container">
  <!-- Layout para usuarios no autenticados -->
  {#if $authStore.loading}
    <div>Cargando sesión...</div>
  {:else if !$authStore.isAuthenticated}
    <main class="content">
      <h1>Dashboard</h1>
      <p>Debes iniciar sesión para acceder a esta página</p>
    <slot />
    </main>
  {:else}
    <!-- Layout para usuarios autenticados -->
    <!-- Pasamos las propiedades necesarias al componente Slider -->
    <Slider
      username={$authStore.user.username}
      email={$authStore.user.email}
      role={$authStore.user.role}
      isOpen={isSidebarOpen}
      isCollapsed={isSidebarCollapsed}
      {isSidebarOpen}
      {isSidebarCollapsed}
      on:toggleSidebarCollapse={toggleSidebarCollapse}
      on:logout={handleLogout}
    />

    <!-- Contenido principal -->
    <main class="content">
      <div class="content">
        <h1>Dashboard</h1>
        <p>Hola {$authStore.user.username} </p>
      </div>

      <!-- Mostramos un mensaje de error si existe -->
      {#if $authStore.error}
        <div class="alert">{$authStore.error}</div>
      {/if}
      <slot />
    </main>
  {/if}
</div>


<style>
  .container {
    display: flex;
    height: 100vh;
  }
  .alert {
    padding: 1rem;
    background-color: #ffeb3b;
    color: #333;
    margin-bottom: 1rem;
    border-radius: 4px;
  }

</style>
