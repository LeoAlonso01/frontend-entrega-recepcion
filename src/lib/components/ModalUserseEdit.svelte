<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { toast } from "svelte-sonner";
  const dispatch = createEventDispatcher();

  export let isOpen = false;
  export let title = "Crear usuario";
  export let onSubmit: (data: any) => void = () => {};

  let formData = {
    username: "",
    email: "",
    password: "",
    role: "",
  };

  let isLoading = true

  async function handleSubmit() {
    isLoading = true;

    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Error al crear usuario");

      toast.success("Usuario creado exitosamente");
      dispatch("submit", formData); // Para actualizar la lista
      dispatch("close");
      
    } catch (error) {
      toast.error(error.message);
    } finally {
      isLoading = false;
    }
    console.log(formData);
    onSubmit(formData);
    dispatch("close");
  }
</script>

{#if isOpen}
  <div
    class="modal-overlay"
    open
    on:click|self={() => dispatch("close")}
    on:keydown|self={(e) => e.key === "Escape" && dispatch("close")}
  >
    <div class="modal-content" role="document" on:click|stopPropagation>
      <h2>{title}</h2>

      <form on:submit|preventDefault={handleSubmit}>
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Nombre de usuario:
          <input
            type="text"
            bind:value={formData.username}
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>

        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email:
          <input
            type="email"
            bind:value={formData.email}
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>

        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Contraseña:
          <input
            type="password"
            bind:value={formData.password}
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>

        <label class="block text-gray-700 text-sm font-bold mb-2" for="role">
          Rol:
          <select
            bind:value={formData.role}
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
          >
            <option value="ADMIN">Administrador</option>
            <option value="USER">Usuario</option>
          </select>
        </label>

        <button type="submit">Guardar</button>
      </form>
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }

  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-width: 90%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  input,
  select,
  button {
    padding: 8px;
    font-size: 1rem;
  }

  button {
    background-color: #3498db;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  button:hover {
    background-color: #2980b9;
  }
</style>
