<script lang="ts">
  import Slider from "../../../lib/components/Slider.svelte";
  import { onMount } from "svelte";
  import { authStore, authService } from "../../../lib/stores/auth";
  import AgGridSvelte from "ag-grid-svelte";
  import "ag-grid-community/styles/ag-grid.css";
  import "ag-grid-community/styles/ag-theme-alpine.css";

  let username = "";
  let email = "";
  let role = "";
  let isSidebarOpen = true;
  let isSidebarCollapsed = true;

  function click(){
    console.log("click");
  }

  // Configuración de AG Grid
  const columnDefs = [
    { headerName: "ID", field: "id", sortable: true, filter: true },
    { headerName: "Nombre", field: "username", sortable: true, filter: true },
    { headerName: "Email", field: "email", sortable: true, filter: true },
    { 
      headerName: "Acciones",
      cellRenderer: (params) => `
        <button on:click={click} class="btn-edit">Editar</button>
        <button on:click={click} class="btn-delete">Eliminar</button>
      `,
      suppressMenu: true
    }
  ];

  let gridOptions = {
    defaultColDef: {
      resizable: true,
      flex: 1
    },
    domLayout: 'autoHeight' as 'autoHeight'
  };

  let rowData = [];
  const url = "http://localhost:8000/users?skip=0&limit=10";

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

  onMount(async () => {
    authService.checkAuth();
    const token = localStorage.getItem("token");
    await loadUsers(token);
  });

  async function loadUsers(token) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

      const data = await response.json();
      rowData = data; // Asignamos directamente a rowData que está bindeado al grid
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
      alert("No se pudieron cargar los usuarios. Por favor, intenta nuevamente.");
    }
  }
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
      <button type="button" on:click={regresar} class="btn preset-secondary">
        <span>Regresar</span>
        <span>&larr;</span>
      </button>
      <h1>Usuarios</h1>
      <p>Bienvenido, {$authStore.user.username}.</p>
    </div>

    <div class="ag-theme-alpine" style="width: 100%; height: 70vh;">
      <AgGridSvelte 
        rowData={rowData}
        columnDefs={columnDefs}
        gridOptions={gridOptions}
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
    background-color: #7383c4;
  }

  .content {
    flex: 1;
    padding: 20px;
    background-color: white;
    margin: 0; /* Eliminamos el margen */
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100vh;
  }

  .bounce1,
  .bounce2,
  .bounce3 {
    width: 15px;
    height: 15px;
    background-color: #333;
    border-radius: 100%;
    display: inline-block;
    animation: bounce 1.4s infinite ease-in-out;
  }

  .bounce1 {
    animation-delay: -0.32s;
  }

  .bounce2 {
    animation-delay: -0.16s;
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
  .content {
    flex: 1;
    padding: 20px;
    background-color: white;
    border-radius: 15px;
    margin: 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: calc(100% - 40px);
  }

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

  /* Contenedor de la tabla */
  .table-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  /* Tabla */

  th,
  td {
    padding: 8px;
    text-align: left;
    color: #2c3e50;
    font-weight: bolder;
  }

  th {
    background-color: #34495e;
    color: white;
    font-weight: bold;
  }

  /* tr {
    border-bottom: 1px solid #ecf0f1;
  } */

  tr:hover {
    background-color: #f5f6fa;
  }

  /* Botones */
  .btn {
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
  }

  .btn:last-child {
    margin-right: 0;
  }

  .btn.preset-secondary {
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
