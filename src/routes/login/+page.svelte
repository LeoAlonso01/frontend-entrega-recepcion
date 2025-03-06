<script lang="ts">
	let email = '';
	let password = '';
	let error = '';
  
	/* async function handleLogin() {
	  try {
		// Lógica para enviar credenciales a la API
		const response = await fetch('/api/auth/login', {
		  method: 'POST',
		  headers: { 'Content-Type': 'application/json' },
		  body: JSON.stringify({ email, password }),
		});
  
		if (!response.ok) {
		  throw new Error('Credenciales incorrectas');
		}
  
		const data = await response.json();
		// Guardar el token JWT en localStorage o cookies
		localStorage.setItem('token', data.token);
		// Redirigir al dashboard
		window.location.href = '/dashboard';
	  } catch (err) {
		error = err.message;
	  }
	} */

    function redirect(){
        window.location.href = "/dashboard";
    }

    async function handleLogin() {
        console.log(email, password);
        redirect();
    }

  </script>
  
  <svelte:head>
	<title>Login</title>
  </svelte:head>
  
  <div class="flex justify-center items-center h-screen bg-gray-50">
	<div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
		<img src="../oic.jpg" alt="">
	  <h1 class="text-2xl font-bold mb-6 text-center text-gray-900">Ingrese su Correo Institucional y contraseña</h1>
	  <form on:submit|preventDefault={handleLogin}>
		<div class="mb-4">
		  <label for="email" class="block text-sm font-medium text-gray-700">Correo</label>
		  <input
			type="email"
			id="email"
			bind:value={email}
			class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
			required
		  />
		</div>
		<div class="mb-6">
		  <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
		  <input
			type="password"
			id="password"
			bind:value={password}
			class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
			required
		  />
		</div>
		{#if error}
		  <div class="mb-4 text-red-500 text-sm">{error}</div>
		{/if}
		<button
		  type="submit"
		  class="btn variant-filled-surface w-full"
		>
		  Iniciar sesión
		</button>
	  </form>
	</div>
  </div>