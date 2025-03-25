<script lang="ts">
    //import { enhance } from '$app/forms';
    //import { goto } from '$app/navigation';
  
    // Datos del usuario (cargados via load function o store)
    export let data;
  
    let user = { ...data.user };  // Copia editable
    let error: string | null = null;
  
    async function handleSubmit() {
      const response = await fetch(`http://localhost:8000/users${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
  
      if (response.ok) {
        goto('/users');  // Redirige a la lista tras editar
      } else {
        error = await response.text();
      }
    }
  </script>
  
  <div class="max-w-md mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Editar Usuario</h1>
  
    {#if error}
      <div class="bg-red-100 p-2 mb-4">{error}</div>
    {/if}
  
    <form use:enhance={handleSubmit}>
      <div class="mb-4">
        <label class="block mb-2">Username</label>
        <input
          bind:value={user.username}
          class="w-full p-2 border rounded"
        />
      </div>
  
      <div class="mb-4">
        <label class="block mb-2">Email</label>
        <input
          bind:value={user.email}
          type="email"
          class="w-full p-2 border rounded"
        />
      </div>
  
      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Guardar
      </button>
    </form>
  </div>