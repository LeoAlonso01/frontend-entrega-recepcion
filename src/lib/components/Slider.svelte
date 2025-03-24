<script lang="ts">
    import { Avatar } from "@skeletonlabs/skeleton";
  
    // Props del componente
    export let username: string = "";
    export let email: string = "";
    export let role: string = "";
    export let isOpen: boolean = true;
    export let isCollapsed: boolean = false;
    export let isSidebarOpen: boolean = true;
    export let isSidebarCollapsed: boolean = true;
   

    // Eventos que emite el componente
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function toggleSidebarCollapse() {
      dispatch('toggleSidebarCollapse', { isSidebarCollapsed });
      isSidebarCollapsed = !isSidebarCollapsed;
    }
  
    function handleLogout() {
      dispatch('logout');
    }
  </script>
  
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
    {#if role === "ADMIN"}
    <ul>
      <li>
        <a href="/settings" class="logo-item">
          <i class="fas fa-cog"></i>
          <!-- Ícono de configuración -->
          <span>Administración</span>
        </a>
      </li>
      <li>
        <a href="dashboard/users" class="logo-item">
          <i class="fas fa-users"></i>
          <!-- Ícono de usuarios -->
          <span>Usuarios</span>
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
    {/if}
    {#if role === "USER"}
    <ul>
      <li>
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
    {/if}


  </div>
  
  <style>
    /* Estilos generales */
    
  
    /* Sidebar */
    .sidebar ul li a {
      transition: all 0.3s ease;
    }
  
    .sidebar ul li a:hover {
      background: rgba(255, 255, 255, 0.1);
      padding-left: 15px;
    }
    /* .container {
      display: flex;
      height: 100vh;
    } */
  
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
  
  
    /* Contenido principal */
   /*  .content {
      flex: 1;
      padding: 20px;
      background-color: white;
      border-radius: 15px;
      margin: 20px;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    } */
  
   /*  h1 {
      color: #2c3e50;
      margin-bottom: 20px;
    }
  
    p {
      color: #7f8c8d;
    } */
  
    /* Tabla */
    /* table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      overflow: hidden;
    }
  
    th,
    td {
      padding: 12px 15px;
      text-align: left;
      color: #2c3e50;
    } */
  
   /*  th {
      background-color: #34495e;
      color: white;
      font-weight: bold;
    }
  
    tr {
      border-bottom: 1px solid #ecf0f1;
    }
  
    tr:hover {
      background-color: #f5f6fa;
    }
  
    /* Botones 
    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    } */
  
    /* .btn.preset-secondary {
      background: linear-gradient(135deg, #3498db, #2980b9);
      color: white;
    }
  
    .btn.preset-secondary:hover {
      background: linear-gradient(135deg, #2980b9, #3498db);
    }
  
    .btn-edit {
      background: linear-gradient(135deg, #2ecc71, #27ae60);
      color: white;
    }
  
    .btn-edit:hover {
      background: linear-gradient(135deg, #27ae60, #2ecc71);
    }
    .btn-delete {
      background: linear-gradient(135deg, #e74c3c, #c0392b);
      color: white;
    } */
  </style>