<script lang="ts">
  import Slider from "../../../lib/components/Slider.svelte";
  //import { goto } from '$app/navigation';
  import { onMount } from "svelte";
  import { authStore, authService } from "../../../lib/stores/auth";
  import AgGridSvelte from "ag-grid-svelte";
  import "ag-grid-community/styles/ag-grid.css";
  import "ag-grid-community/styles/ag-theme-alpine.css";

  let role = "";
  let isSidebarOpen = true;
  let isSidebarCollapsed = true;
  let retryCount = 0;
  let error: string | null = null;
  let loading = true;
  const MAX_RETRIES = 3;

  const onClick = (event:any) => {
    console.log("click");
  }

  const onCellClicked = (event:any) => {
    console.log("cell clicked");
  }

  const onRowClicked = (event:any) => {
    console.log("row clicked");
  }

  const onEdit = (event:any) => {
    console.log("edit");
    goto('/users/:${id}/edit');
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
      `},
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

  function toggleSidebarCollapse() {
    isSidebarCollapsed = !isSidebarCollapsed;
  }

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  function regresar() {
    if (role === "admin") window.location.href = "/dashboard/admin";
    else if (role === "user") window.location.href = "/dashboard/user";
    else window.history.back();
  }

 // Función mejorada para cargar usuarios
 async function loadUsers() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      const response = await fetch("http://localhost:8000/users?skip=0&limit=100", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      rowData = data;
      error = null;
      retryCount = 0;
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
      error = "Error al cargar los usuarios";
      
      if (retryCount < MAX_RETRIES) {
        retryCount++;
        await new Promise(resolve => setTimeout(resolve, 2000)); // Espera 2 segundos
        return loadUsers(); // Reintentar
      } else {
        error = "No se pudo cargar la información después de varios intentos";
      }
    } finally {
      loading = false;
    }
  }

  onMount(async () => {
    authService.checkAuth();
    await loadUsers();
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
      <button type="button" on:click={regresar} class="bg-blue-400 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
        <span>Regresar</span>
        <span>&larr;</span>
      </button>
      <h1 class="h1">Usuarios</h1>
      <p class="h3">Bienvenido, {$authStore.user.username}.</p>
    </div>
    <!-- boton para crear usuario -->
    <div class="md:container md:mx-auto btn-crear">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        on:click={onClick}>Crear Usuario</button
      >
    </div>

    <!-- AG Grid -->
    <div class="ag-theme-alpine" style="width: 800px; height: 100px;">
      <AgGridSvelte 
      rowData={rowData} 
      gridOptions={gridOptions}
      columnDefs={columnDefs}
      on:cellClicked={onCellClicked}
      on:onClick={onClick}
      on:rowClicked={onRowClicked}
      on:edit={onEdit}
       />
    </div>
  </div>
</div>

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
