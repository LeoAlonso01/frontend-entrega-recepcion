<script lang="ts">
  import Slider from "../../../lib/components/Slider.svelte";
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
 

  function toggleSidebarCollapse() {
    isSidebarCollapsed = !isSidebarCollapsed;
  }

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  function isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = payload.exp * 1000;
      return Date.now() > expirationTime;
    } catch (err) {
      return true;
    }
  }

  function notifyTokenExpiry(token: string) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = payload.exp * 1000;
      const timeLeft = expirationTime - Date.now();

      if (timeLeft > 0 && timeLeft < 5 * 60 * 1000) {
        alert(
          "Tu sesión está a punto de expirar. Por favor, inicia sesión nuevamente.",
        );
      }
    } catch (err) {
      console.error("Error al decodificar el token:", err);
    }
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


  function regresar() {
    window.location.href = "/user-dashboard";
  }
</script>

<div class="container">
  <Slider
    {username}
    {email}
    {role}
    isOpen={isSidebarOpen}
    isCollapsed={isSidebarCollapsed}
    {isSidebarOpen}
    {isSidebarCollapsed}
    on:toggleSidebarCollapse={toggleSidebarCollapse}
    on:logout={handleLogout}
  />

  <div class="content">
    <button type="button" on:click={regresar} class="btn preset-secondary">
      <span>Regresar</span>
      <span>&larr;</span>
    </button>
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

  .container {
    display: flex;
    height: 100vh;
  }



  span {
    margin-left: 10px;
  }

  @media (max-width: 768px) {
    .sidebar:not(.active) {
      transform: translateX(-250px);
    }
  }

  /* Botones  */
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
