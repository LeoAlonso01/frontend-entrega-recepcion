<script lang="ts">
  import Slider from "../../../lib/components/Slider.svelte";
  import Card from "../../../lib/components/Card.svelte";
  import { onMount } from "svelte";
  import { authService, authStore } from "../../../lib/stores/auth";
  import Button from "../../../lib/components/Button.svelte";

  let username = "";
  let email = "";
  let role = "";
  let isSidebarOpen = true;
  let isSidebarCollapsed = true;

  const arrowIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
  `;

  let anexos = [
    { id: 1, name: "Anexo 1", description: "Descripción del Anexo 1" },
    { id: 2, name: "Anexo 2", description: "Descripción del Anexo 2" },
    { id: 3, name: "Anexo 3", description: "Descripción del Anexo 3" },
    { id: 4, name: "Anexo 4", description: "Descripción del Anexo 4" },
    { id: 5, name: "Anexo 5", description: "Descripción del Anexo 5" },
    { id: 6, name: "Anexo 6", description: "Descripción del Anexo 6" },
  ];

  function toggleSidebarCollapse() {
    isSidebarCollapsed = !isSidebarCollapsed;
  }

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  onMount(() => {
    authService.checkAuth();
  });

  function handleBack(event: CustomEvent) {
    history.back();
  }
</script>

<div class="container">
  <!-- Pasamos las propiedades necesarias al componente Slider -->
  <Slider
    username={$authStore.user?.username || "Usuario no identificado"}
    email={$authStore.user?.email || "Sin correo"}
    role={$authStore.user?.role || "Sin rol"}
    isOpen={isSidebarOpen}
    isCollapsed={isSidebarCollapsed}
    {isSidebarOpen}
    {isSidebarCollapsed}
    on:toggleSidebarCollapse={toggleSidebarCollapse}
    on:logout={handleLogout}
  />

  <!-- Contenido principal -->


  <div class="content">
    <Button
      label="Regresar"
      variant="secondary"
      on:click={handleBack}
      icon={arrowIcon}
    />
    <h1 class="h1">Anexos</h1>
    <div class="grid-container">
      {#each anexos as anexo}
        <Card
          title={anexo.name}
          content={anexo.description}
          icon=""
          actionLabel="Ver más"
          onAction={() => {
            alert(`Ver más sobre ${anexo.id}`);
          }}
        />
      {/each}
    </div>
  </div>
</div>

<style>
  /* Estilo general del contenedor */
  .container {
    display: flex;
    height: 100vh;
    font-family: Arial, sans-serif;
  }

  /* Sidebar */
  Slider {
    width: 250px;
    background-color: #2c3e50;
    color: white;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  }

  /* Contenido principal */
  .content {
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto;
  }

  /* Título */
  .h1 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #fff;
  }

  /* Cuadrícula de tarjetas */
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 columnas */
    gap: 20px; /* Espaciado entre las tarjetas */
  }

  /* Ajuste para pantallas pequeñas */
  @media (max-width: 1200px) {
    .grid-container {
      grid-template-columns: repeat(
        2,
        1fr
      ); /* 2 columnas en pantallas medianas */
    }
  }

  @media (max-width: 768px) {
    .grid-container {
      grid-template-columns: 1fr; /* 1 columna en pantallas pequeñas */
    }
  }
</style>
