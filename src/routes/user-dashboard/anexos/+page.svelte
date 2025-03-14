<script>
  import { Avatar } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";
  let username = "";
  let email = "";
  let role = "";
  let isSidebarOpen = true;
  let isSidebarCollapsed = true;
  let anexos = [
    { id: 1, name: "Anexo 1", description: "Descripción del Anexo 1" },
    { id: 2, name: "Anexo 2", description: "Descripción del Anexo 2" },
    { id: 3, name: "Anexo 3", description: "Descripción del Anexo 3" },
  ];
  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
  }

  function toggleSidebarCollapse() {
    isSidebarCollapsed = !isSidebarCollapsed;
  }

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  onMount(() => {
    const token = localStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
      window.location.href = "/login";
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      username = payload.sub; // Nombre de usuario
      email = payload.email; // Correo electrónico
      role = payload.role; // Rol del usuario

      notifyTokenExpiry(token);
    } catch (err) {
      console.error("Error al decodificar el token:", err.message);
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  });

  function clickAnexo() {
    console.log("Anexo clicked");
  }
</script>



<div class="container">
    
  <div
    class="sidebar"
    class:active={isSidebarOpen}
    class:collapsed={isSidebarCollapsed}
  >
    <button
      class="collapse-toggle"
      on:click={toggleSidebarCollapse}
      aria-label="Toggle Sidebar Collapse"
    >
      {#if isSidebarCollapsed}
        <i class="fa-solid fa-bars"></i> <!-- Ícono de barras -->
      {:else}
        <i class="fa-solid fa-xmark"></i> <!-- Ícono de "X" -->
      {/if}
    </button>
    <div class="header logo-item">
      <Avatar initials={username[0]} background="bg-primary-900" />
      <span>{username}</span>
    </div>

    <ul>
      <li on:mouseenter={clickAnexo} >
        <a href="/user-dashboard/anexos" class="logo-item">
          <i class="fa-solid fa-pen"></i>
          <!-- Ícono de configuración -->
          <span>Anexos</span>
        </a>
      </li>

      <li>
        <a
          href="/"
          role="button"
          on:click={handleLogout}
          on:keydown={(e) => e.key === "Enter" && handleLogout()}
          class="logo-item"
        >
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
          <!-- Ícono de logout -->
          <span>Cerrar Sesión</span>
        </a>
      </li>
    </ul>
  </div>
  <div class="content">
     {#each anexos as anexo}
    <div class="anexo">
      <h2>{anexo.name}</h2>
      <p>{anexo.description}</p>
    </div>
  {/each}
  </div>
 
</div>

<style>
  .anexo {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px 0;
  }
  .sidebar ul li a {
    transition: all 0.3s ease;
  }

  .sidebar ul li a:hover {
    background: rgba(255, 255, 255, 0.1);
    padding-left: 15px;
  }
  .container {
    display: flex;
    height: 100vh;
  }

  .sidebar {
    width: 250px;
    background-color: #2c3e50;
    color: white;
    padding: 5px;
    transition:
      transform 0.3s ease,
      opacity 0.3s ease;
    box-shadow: 4px 0px 10px rgba(0, 0, 0, 0.2);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    background: linear-gradient(135deg, #2c3e50, #1a252f);
  }
  .sidebar:not(.active) {
    opacity: 0;
  }

  .sidebar.active {
    opacity: 1;
  }

  .sidebar.active {
    transform: translateX(0);
  }

  .sidebar:not(.active) {
    transform: translateX(-250px); /* Oculta el sidebar */
  }

  .header {
    background-color: #34495e;
    color: white;
    padding: 10px;
    text-align: right;
  }

  span {
    margin-left: 10px;
  }

  @media (max-width: 768px) {
    .sidebar:not(.active) {
      transform: translateX(-250px);
    }
  }

  /* Estilos para el sidebar colapsado */
  .sidebar.collapsed {
    width: 70px; /* Ancho reducido */
  }

  .sidebar.collapsed ul li span {
    display: none; /* Ocultar texto cuando está colapsado */
  }

  .sidebar.collapsed .header span {
    display: none; /* Ocultar nombre de usuario cuando está colapsado */
  }

  .sidebar.collapsed .logo-item {
    justify-content: center; /* Centrar iconos */
  }

  .collapse-toggle {
    font-size: 24px; /* Ajusta el tamaño del ícono */
    cursor: pointer;
    background: none;
    border: none;
    color: white;
    transition: transform 0.3s ease; /* Efecto de transición */
  }

  /* Hacer el ícono más grande al pasar el ratón */
  .collapse-toggle:hover {
    transform: scale(1.2); /* Escala el ícono al 120% */
  }

  .header.logo-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
</style>
