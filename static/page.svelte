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
    </div>
  
    <div class="content">
      <button type="button"  class="btn preset-secondary" on:click={goBakc}>
        <span>regresar</span>
        <span>&rarr;</span>
      </button>
      <h1>Dashboard</h1>
      <p>Bienvenido, {username}.</p>
  
      <h1>Users</h1>
  
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
           {#each users as user}
            <tr>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td><button type="button" class="btn btn-lg preset-filled" >editar</button></td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

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
</div>
  
  <style>
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
  
    
  </style>