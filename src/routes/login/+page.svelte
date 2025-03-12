<script lang="ts">
  let username = ""; // Username
  let password = ""; // Password
  let error = ""; // Mensaje de error general
  let fieldErrors: { [key: string]: string } = {}; // Errores por campo
  let isLoading = false; // Estado de carga

  async function handleLogin() {
    // Reiniciar errores
    error = "";
    fieldErrors = {};

    try {
      // Enviar datos al servidor
      const response = await fetch("http://localhost:8000/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // FastAPI espera este formato
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
      });

      // Manejar la respuesta
      const data = await response.json();

      if (!response.ok) {
        // Si la respuesta no es exitosa, manejar errores
        if (data.detail) {
          // Procesar errores de validación
          data.detail.forEach((err: any) => {
            if (err.loc && err.loc.length > 1) {
              const field = err.loc[1]; // Obtener el nombre del campo (ej: "email" o "password")
              fieldErrors[field] = err.msg; // Guardar el mensaje de error
            } else {
              error = err.msg; // Error general
            }
          });
        } else {
          error = "Error desconocido. Inténtalo de nuevo.";
        }
        return;
      }

      // Si la respuesta es exitosa, guardar el token y redirigir
      localStorage.setItem("token", data.access_token); // Guardar el token
      localStorage.setItem("user", JSON.stringify(data)); // Guardar la información del usuario
      console.log("Usuario identificado");
      window.location.href = "/loading"; // Redirigir a la página de carga intermedia
    } catch (err) {
      error = "Error de conexión. Inténtalo de nuevo.";
    }
  }
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div class="flex flex-col lg:flex-row h-screen">
  <!-- Columna izquierda: Formulario de login -->
  <div class="flex-1 flex justify-center items-center bg-gray-50 p-4 lg:p-12">
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-6 lg:p-8">
      <img
        src="../oic.jpg"
        alt="Logo"
        class="mx-auto mb-4 w-20 h-20 sm:w-24 sm:h-24"
      />
      <h1
        class="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-gray-900"
      >
        Ingrese su Correo Institucional y contraseña
      </h1>
      <form on:submit|preventDefault={handleLogin}>
        <!-- Campo de correo -->
        <div class="mb-3 sm:mb-4">
          <label
            for="email"
            class="block text-sm sm:text-base font-medium text-gray-700"
            >Nombre de Usuario</label
          >
          <input
            type="text"
            id="username"
            bind:value={username}
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
            required
          />
          {#if fieldErrors.username}
            <p class="text-red-500 text-xs sm:text-sm mt-1">
              {fieldErrors.username}
            </p>
          {/if}
        </div>

        <!-- Campo de contraseña -->
        <div class="mb-4 sm:mb-6">
          <label
            for="password"
            class="block text-sm sm:text-base font-medium text-gray-700"
            >Contraseña</label
          >
          <input
            type="password"
            id="password"
            bind:value={password}
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
            required
          />
          {#if fieldErrors.password}
            <p class="text-red-500 text-xs sm:text-sm mt-1">
              {fieldErrors.password}
            </p>
          {/if}
        </div>

        <!-- Mensaje de error general -->
        {#if error}
          <div class="mb-4 text-red-500 text-xs sm:text-sm">{error}</div>
        {/if}

        <!-- Botón de envío -->
        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Iniciar sesión
        </button>
      </form>
      <!-- enlace al registro -->
      <!-- <div class="mt-4 sm:mt-6 text-center text-sm sm:text-base">
        <a href="/register" class="text-indigo-600 hover:underline"
          >¿No tienes cuenta? Regístrate</a
        >
      </div> -->
    </div>
  </div>

  <!-- Columna derecha: Información adicional -->
  <div class="flex-1 bg-indigo-900 text-white p-4 lg:p-12">
    <div class="max-w-2xl mx-auto">
      <h2 class="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">
        Bienvenido a la Plataforma SERUMICH 2.0
      </h2>
      <p class="text-base sm:text-lg mb-4 sm:mb-6">
        Recursos de apoyo para el correcto llenado de los anexos del proceso de
        entrega - recepción.
      </p>
      <ul class="list-disc list-inside mb-4 sm:mb-6 text-sm sm:text-base">
        <li class="mb-1 sm:mb-2">
          <a
            target="_blank"
            href="https://contraloria.umich.mx/archivos/normatividad/lineamientos_entrega_recepcion_umsnh.pdf"
            class="hover:underline"
            >Lineamientos del proceso de Entrega - Recepción</a
          >
        </li>
        <li class="mb-1 sm:mb-2">
          <a
            target="_blank"
            href="https://contraloria.umich.mx/entregarecepcion/archivos/archivos_contraloria/guia_usuario_serumich.pdf"
            class="hover:underline">Guía de usuario SERUMICH 2.0</a
          >
        </li>
        <li class="mb-1 sm:mb-2">
          <a
            target="_blank"
            href="https://contraloria.umich.mx/entregarecepcion/archivos/archivos_contraloria/instructivo_llenado_serumich.pdf"
            class="hover:underline">Instructivo de llenado de anexos</a
          >
        </li>
        <li class="mb-1 sm:mb-2">
          <a target="_blank" href="/" class="hover:underline"
            >Plantillas de anexos</a
          >
        </li>
        <li class="mb-1 sm:mb-2">
          <a
            href="/https://contraloria.umich.mx/index.php/portal/entrega_recepcion"
            class="hover:underline"
          >
            Circulares emitidas por el OIC (Órgano Interno de Control)
          </a>
        </li>
      </ul>
      <div class="w-full">
        <iframe
          width="100%"
          height="200px"
          src="https://www.youtube.com/embed/M0Z3qCxMpgY?si=X3bgONaCMXFaDZda"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
          class="rounded-lg shadow-lg"
        ></iframe>
      </div>
    </div>
  </div>
</div>
