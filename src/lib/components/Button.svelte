<script lang="ts">
    import { createEventDispatcher } from "svelte";
    // Tipos y props
    export let label: string = "Botón";
    export let variant: "primary" | "secondary" | "danger" = "primary";
    export let onClick: () => void = () => {;
        dispatch("click");
    };
    export let icon: string = ""; // Aquí pasaremos el SVG del ícono
    export let showIcon: boolean = true; // Controla si se muestra el ícono

    const dispatch = createEventDispatcher(); 
  
    // Clases CSS basadas en la variante
    const variants = {
      primary: "bg-blue-500 hover:bg-blue-700 text-white",
      secondary: "bg-gray-500 hover:bg-gray-700 text-white",
      danger: "bg-red-500 hover:bg-red-700 text-white",
    };
  
    // Clase final del botón
    $: buttonClass = `${variants[variant]} font-bold py-2 px-4 rounded flex items-center gap-2`;
  </script>
  
  <!-- Botón -->
  <button on:click={onClick} class={buttonClass}>
    <span>{label}</span>
    {#if showIcon && icon}
      <!-- Ícono personalizado -->
      {@html icon}
    {/if}
  </button>
  
  <style>
    /* Estilos generales */
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.3s ease;
    }
  
    /* Espaciado entre el texto y el ícono */
    .gap-2 {
      gap: 0.5rem;
    }
  </style>