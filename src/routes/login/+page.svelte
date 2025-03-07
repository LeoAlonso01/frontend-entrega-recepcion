<script lang="ts">
	let username = "Dani Alonso"; // Username
	let password = "0526"; // Password
	let error = ""; // Mensaje de error general
	let fieldErrors: { [key: string]: string } = {}; // Errores por campo
  
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
		console.log(data.access_token);
		console.log(data);
		alert("¡Bienvenido! Has iniciado sesión correctamente.");
		window.location.href = "/dashboard"; // Redirigir al dashboard
	  } catch (err) {
		error = "Error de conexión. Inténtalo de nuevo.";
	  }
	}
  </script>
  
  <svelte:head>
	<title>Login</title>
  </svelte:head>
  
  <div class="flex h-screen">
	<!-- Columna izquierda: Formulario de login -->
	<div class="flex-1 flex justify-center items-center bg-gray-50 p-6 lg:p-12">
	  <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8">
		<img src="../oic.jpg" alt="Logo" class="mx-auto mb-6 w-24 h-24" />
		<h1 class="text-2xl font-bold mb-6 text-center text-gray-900">
		  Ingrese su Correo Institucional y contraseña
		</h1>
		<form on:submit|preventDefault={handleLogin}>
		  <!-- Campo de correo -->
		  <div class="mb-4">
			<label for="email" class="block text-sm font-medium text-gray-700">Correo</label>
			<!--Cambiado de "email" a "text" para poder ingresar un usuario-->
			<input
			  type="text"   
			  id="username"
			  bind:value={username}
			  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
			  required
			/>
			{#if fieldErrors.username}
			  <p class="text-red-500 text-sm mt-1">{fieldErrors.username}</p>
			{/if}
		  </div>
  
		  <!-- Campo de contraseña -->
		  <div class="mb-6">
			<label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
			<input
			  type="password"
			  id="password"
			  bind:value={password}
			  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
			  required
			/>
			{#if fieldErrors.password}
			  <p class="text-red-500 text-sm mt-1">{fieldErrors.password}</p>
			{/if}
		  </div>
  
		  <!-- Mensaje de error general -->
		  {#if error}
			<div class="mb-4 text-red-500 text-sm">{error}</div>
		  {/if}
  
		  <!-- Botón de envío -->
		  <button
			type="submit"
			class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
		  >
			Iniciar sesión
		  </button>
		</form>
	  </div>
	</div>
  
	<!-- Columna derecha: Información adicional -->
	<div class="flex-1 bg-indigo-900 text-white p-6 lg:p-12">
	  <div class="max-w-2xl mx-auto">
		<h2 class="text-4xl font-bold mb-6">
		  Bienvenido a la Plataforma SERUMICH 2.0
		</h2>
		<p class="text-lg mb-6">
		  Recursos de apoyo para el correcto llenado de los anexos del proceso de
		  entrega - recepción.
		</p>
		<ul class="list-disc list-inside mb-6">
		  <li class="mb-2">
			<a href="/" class="hover:underline">Lineamientos del proceso de Entrega - Recepción</a>
		  </li>
		  <li class="mb-2">
			<a href="/" class="hover:underline">Guía de usuario SERUMICH 2.0</a>
		  </li>
		  <li class="mb-2">
			<a href="/" class="hover:underline">Instructivo de llenado de anexos</a>
		  </li>
		  <li class="mb-2">
			<a href="/" class="hover:underline">Plantillas de anexos</a>
		  </li>
		  <li class="mb-2">
			<a href="/" class="hover:underline">
			  Circulares emitidas por el OIC (Órgano Interno de Control)
			</a>
		  </li>
		</ul>
		<div class="w-full">
		  <iframe
			width="100%"
			height="315"
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
