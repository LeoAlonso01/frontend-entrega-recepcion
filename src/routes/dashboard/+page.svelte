<script lang="ts">
  import { onMount } from "svelte";
  import { Avatar } from "@skeletonlabs/skeleton";

  let username = ""; // Inicializamos la variable sin valor
  let isSidebarOpen = true; // Inicializamos la variable en true

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

  function notifyTokenExpiry(token: string) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = payload.exp * 1000; // Convertir a milisegundos
      const timeLeft = expirationTime - Date.now();

      if (timeLeft > 0 && timeLeft < 5 * 60 * 1000) {
        // 5 minutos restantes
        alert(
          "Tu sesión está a punto de expirar. Por favor, inicia sesión nuevamente.",
        );
      }
    } catch (err) {
      console.error("Error al decodificar el token:", err);
    }
  }

  onMount(() => {
    //fetchData(); // Llamar a la función para obtener datos
    const token = localStorage.getItem("token");
    // obtener datos del usuario

    if (token && !isTokenExpired(token)) {
      notifyTokenExpiry(token);
    }
    const access_token = localStorage.getItem("token");
    if (!access_token || isTokenExpired(access_token)) {
      // Limpiar el token si está expirado
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirigir al login
    } else {
      // Decodificar el token para obtener información del usuario
      try {
        const payload = JSON.parse(atob(access_token.split(".")[1]));
        console.log("payload del token", payload);
        username = payload.username; // Obtener el nombre de usuario
      } catch (err) {
        console.error("Error al decodificar el token:", err);
        localStorage.removeItem("token"); // Limpiar el token si hay un error
        window.location.href = "/login"; // Redirigir al login
      }
    }
  });

  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
  }

  function handleLogout(){
    //elimiar el token del localsotrage
    localStorage.removeItem("token");
    //redirigir al login
    window.location.href = "/login";
  }
</script>

<div class="container">
  <div class="sidebar" class:active={isSidebarOpen}>
    <!-- contenido del sidebar -->
    <button
      class="toggle h1"
      on:click={toggleSidebar}
      aria-label="Toggle Sidebar"
      >{isSidebarOpen ? "X" : "☰"}
    </button>
    <div class="header logo-item">
      <Avatar initials={username[0]} background="bg-primary-900" />
      <!-- Mostrar iniciales del usuario -->
      <span>{username}</span>
      <!-- Mostrar el nombre de usuario -->
    </div>
    <ul>
      <li>
        <a href="/settings" class="logo-item"> <span></span> Administración</a>
      </li>
      <li><a href="/profile" class="logo-item"> <span></span> Usuarios</a></li>
      <li>
        <button type="button" class="btn-icon preset-filled">&rarr; <span>logout</span> </button>
      </li>
    </ul>
  </div>
  <div class="main-content">
    <h1>Bienvenido a la</h1>
    <p>
      This is a simple dashboard layout with a sidebar and user info at the top.
    </p>
  </div>
</div>

<style>
  .container {
    display: flex;
    height: 100vh;
  }

  .sidebar {
    width: 250px;
    background-color: #2c3e50;
    color: white;
    padding: 20px;
    transition: transform 0.3s ease;
  }

  .sidebar.active {
    transform: translateX(0);
  }

  .sidebar:not(.active) {
    transform: translateX(-250px); /* Oculta el sidebar */
  }

  .main-content {
    flex-grow: 1;
    padding: 20px;
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

  .toggle {
    cursor: pointer;
    font-size: 24px;
    margin-bottom: 20px;
    display: block;
  }

  .toggle:hover {
    color: #ddd;
  }
  @media (max-width: 768px) {
    .sidebar:not(.active) {
      transform: translateX(-250px);
    }
  }
</style>
