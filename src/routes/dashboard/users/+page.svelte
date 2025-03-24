<script lang="ts">
  import Slider from "../../../lib/components/Slider.svelte";
  import { onMount } from "svelte";
  import { authStore, authService } from "../../../lib/stores/auth";

  let username = "";
  let email = "";
  let role = "";
  let isSidebarOpen = true;
  let isSidebarCollapsed = true;
  let users = [];

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

  onMount(() => {
    authService.checkAuth();
    const token = localStorage.getItem("token");

    getUsers(token);
  });

  function getUsers(token) {
    //  const url = "http://localhost:8000/users?skip=0&limit=10"
    const url = "http://148.216.111.144:8000/users?skip=0&limit=10"; // Añade los parámetros de paginación

    return fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`, // Agrega el token aquí
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Usuarios obtenidos:", data);
        users = data; // Asigna los datos a una variable reactiva
      })
      .catch((err) => {
        console.error("Error al obtener los usuarios:", err.message);
        alert(
          "No se pudieron cargar los usuarios. Por favor, intenta nuevamente.",
        );
      });
  }
</script>

<div class="container">
  <!-- Sidebar -->
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
  <div class="content">
    <button type="button" on:click={regresar} class="btn preset-secondary">
      <span>Regresar</span>
      <span>&larr;</span>
    </button>
    <h1>Dashboard</h1>
    <p>Bienvenido, {username}.</p>

    <h1>Usuarios</h1>

    <!-- Tabla de usuarios -->
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <!-- Si no se han cargado los usuarios poner un skeleton -->
        {#if users.length === 0}
          <tr>
            <td colspan="4"
              >
              <!-- <div class="spinner"></div> -->
              <div class="bounce1"></div>
              <div class="bounce2"></div>
              <div class="bounce3"></div>
            </td>
          </tr>
        {/if}
        {#each users as user}
          <tr>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>
              <button type="button" class="btn btn-edit"> Editar </button>
              <button type="button" class="btn btn-delete"> Eliminar </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  /* Estilos generales */
  .container {
    display: flex;
    height: 100vh;
    background-color: #f5f6fa;
  }

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
  }

  h1 {
    color: #2c3e50;
    margin-bottom: 20px;
  }

  p {
    color: #7f8c8d;
  }

  /* Tabla */
  table {
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
  }

  th {
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
</style>
