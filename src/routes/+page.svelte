<script lang="ts">
  // funcion para redirigir al login en caso de no tener token
  function redirect() {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }
  redirect();
  // funcion para cerrar sesion
  function logout() {
	localStorage.removeItem("token");
	window.location.href = "/login";
  }

  logout();

</script>

<svelte:head>
  <title>Bienvenido</title>
</svelte:head>
