<script>
    import { Avatar } from '@skeletonlabs/skeleton';
    let user = "ldalonso";
    let isSidebarOpen = true;

    function toggleSidebar() {
        isSidebarOpen = !isSidebarOpen;
    }
</script>

<div class="container">
  <div class="sidebar" class:active={isSidebarOpen}>
    
    <!-- contenido del sidebar -->
    <button class="toggle h1" on:click={toggleSidebar} aria-label="Toggle Sidebar">{isSidebarOpen ? 'X':'☰'  }
    </button>
    <div class="header logo-item">
      <!-- icono de usuario -->
      <!-- <img
        src="https://www.w3schools.com/howto/img_avatar.png"
        alt="Avatar"
        style="width:50px"
      /> -->
      <Avatar initials="DA" background="bg-primary-900" />
      <span>{user}</span>
    </div>
    <ul>
      <li><a href="/settings" class="logo-item"> <span></span> Administración</a></li>
      <li><a href="/profile" class="logo-item"> <span></span> Usuarios</a></li>
      <li><a href="/" class="logo-item"> <span></span> Logout</a></li>
    </ul>
  </div>
  <div class="main-content">
    <h1>Bienvenido a la </h1>
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
  
    .header img {
      border-radius: 50%;
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
