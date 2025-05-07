<script lang="ts">
  import Slider from "../../../lib/components/Slider.svelte";
  //import { goto } from "$app/navigation";
  import ModalUsers from "../../../lib/components/ModalUsers.svelte";
  import { toast } from "svelte-sonner";
  import { onMount } from "svelte";
  import { authStore, authService } from "../../../lib/stores/auth";
  import Button from "../../../lib/components/Button.svelte";
  import AgGridSvelte from "ag-grid-svelte";
  import "ag-grid-community/styles/ag-grid.css";
  import "ag-grid-community/styles/ag-theme-alpine.css";


  let isSidebarOpen = true;
  let isSidebarCollapsed = true;
  let error: string | null = null;
  const MAX_RETRIES = 3;
  let isModalOpen = false;
  let shouldBlockRefresh = true; // Variable para controlar el bloqueo de la recarga

  ////////////////////////////////////////// funcion de los botones ////////////////////////////////////////////////////
  // SVG para la flecha
  const arrowIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
  `;

  // SVG para el ícono de "+"
  const plusIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  `;

  // funcion para regresar
  function handleBack(event: CustomEvent): void {
    history.back();
    console.log("Regresando...");
  }

  // funcion para crear usuario
  function handleCreateUser(newUser: any): void {
    // Aquí puedes manejar la creación del nuevo usuario
    rowData = [...rowData, newUser];
    //gridApi.applyTransaction({ add: [newUser] });
    console.log("Nuevo usuario creado:", newUser);
    isModalOpen = false; // Cerrar el modal después de crear el usuario
    loadUsers(); // Recargar la lista de usuarios después de crear uno nuevo


  }
  

  function handleCreateUserClick(event: CustomEvent): void {
    isModalOpen = true;
  }

  // Configuración de AG Grid
  const columnDefs = [
    { headerName: "Nombre", field: "username", sortable: true, filter: true },
    { headerName: "Email", field: "email", sortable: true, filter: true },
    {
      headerName: "Acciones",
      cellRenderer: (params: any) => {
        return `
        <button on:click={onEdit} class="bg-transparent hover:bg-amber-500 text-amber-700 font-semibold hover:text-white py-1 px-4 border border-amber-500 hover:border-transparent rounded">Editar</button>
        <button on:click={onClick} class="bg-transparent hover:bg-red-600 text-red-700 font-semibold hover:text-white py-1 px-4 border border-red-500 hover:border-transparent rounded">Eliminar</button>
      `;
      },
      suppressMenu: true,
    },
  ];

  let gridOptions = {
    defaultColDef: {
      resizable: true,
      flex: 1,
    },
    domLayout: "autoHeight" as "autoHeight",
  };

  let rowData = [];
  let gridApi: any; // Define gridApi

  function toggleSidebarCollapse() {
    isSidebarCollapsed = !isSidebarCollapsed;
  }

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  // Función mejorada para cargar usuarios
  async function loadUsers() {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      // Verificar si el token ha expirado
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = payload.exp * 1000;
      if (Date.now() > expirationTime) {
        alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }
    } catch (err) {
      console.error("Error al decodificar el token:", err);
      localStorage.removeItem("token");
      window.location.href = "/login";
      return;
    }

    // Cargar usuarios con reintentos
    for (let i = 0; i < MAX_RETRIES; i++) {
      try {
        const response = await fetch(
          "http://localhost:8000/users?skip=0&limit=100",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        rowData = data;
        error = null;
        return;
      } catch (err) {
        console.error(`Intento ${i + 1}: Error al obtener usuarios`, err);
        error = "Error al cargar los usuarios";

        if (i < MAX_RETRIES - 1) {
          await new Promise((resolve) => setTimeout(resolve, 2000)); // Reintentar
        } else {
          error = "No se pudo cargar la información después de varios intentos";
        }
      }
    }
  }

  onMount(async () => {
  
  authService.checkAuth();
  await loadUsers();

  });
  // Bloquear la recarga de la página
  window.addEventListener("beforeunload", (event) => {
    if (shouldBlockRefresh) {
      event.preventDefault();
      event.returnValue = "¿Estas seguro de querer recargar la página?, Los datos podrian perderse"; // Chrome requires this to show the confirmation dialog
    }
  });
  // Desbloquear la recarga de la página al cerrar el modal
  window.addEventListener("unload", () => {
    shouldBlockRefresh = false;
  });
</script>

<div class="container">
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

  <div class="content">
    <div class="header">
      <Button
        label="Regresar"
        variant="primary"
        icon={arrowIcon}
        on:click={handleBack}
      />
      <h1 class="h1">Usuarios</h1>
      <p class="h3">Bienvenido, {$authStore.user.username}.</p>
    </div>
    <!-- boton para crear usuario -->
    <div class="md:container md:mx-auto btn-crear">
      <!-- Button Crear Usuario -->
      <Button
        label="Crear Usuario"
        variant="primary"
        icon={plusIcon}
        on:click={handleCreateUserClick}
      />
    </div>
    <!-- AG Grid -->
    <div class="ag-theme-alpine" style="width: 100%; height: 100px;">
      <AgGridSvelte {rowData} {gridOptions} {columnDefs} />
    </div>
  </div>
</div>
<!-- Modal para crear usuarios -->
<ModalUsers
  isOpen={isModalOpen}
  title="Crear nuevo usuario"
  on:close={() => (isModalOpen = false)}
  on:submit={handleCreateUser}
/>

<style>
  /* Estilos generales */
  .container {
    display: flex;
    height: 100vh;
    width: 100vw;
    background-color: #fdfdfd;
  }

  .content {
    flex: 1;
    padding: 20px;
    background-color: rgb(255, 255, 255);
    margin: 0; /* Eliminamos el margen */
    /*display: flex;*/
    flex-direction: column;
    overflow: hidden;
    height: 200%;
    width: 300px;
  }

  .btn-crear {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  @keyframes bounce {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }

  /* Contenido principal */

  .header {
    margin-bottom: 20px;
  }

  h1 {
    color: #2c3e50;
    margin-bottom: 20px;
  }

  p {
    color: #7f8c8d;
  }

  :global(.btn-edit) {
    background: #2ecc71;
    color: white;
    border: none;
    padding: 5px 10px;
    margin-right: 5px;
    border-radius: 4px;
    cursor: pointer;
  }

  :global(.btn-delete) {
    background: #e74c3c;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
