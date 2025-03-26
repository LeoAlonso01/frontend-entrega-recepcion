<script lang="ts">
  // Tipos y props
  export let title: string = "Card Title";
  export let content: string = "This is the card content.";
  export let icon: string = ""; // SVG del ícono (opcional)
  export let actionLabel: string = ""; // Texto para el botón de acción (opcional)
  export let onAction: () => void = () => {}; // Función para el botón de acción
  export let cardTitleClass: string = "card-title";

  // Clase CSS basada en la presencia de un ícono
  $: cardTitleClass = icon
    ? "card-title flex items-center gap-2"
    : "card-title";
</script>

<!-- Tarjeta -->
<div class="card">
  <!-- Título y contenido -->
  <div class={cardTitleClass}>
    {#if icon}
      <!-- Ícono personalizado -->
      {@html icon}
    {/if}
    <span>{title}</span>
  </div>
  <div class="card-content">{content}</div>
  {#if actionLabel}
    <button class="card-action" on:click={onAction}>{actionLabel}</button>
  {/if}
</div>

<style>
  /* Estilos generales */
  .card {
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 20px;
    box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.1),
      0 1px 3px rgba(0, 0, 0, 0.06);
    max-width: 350px;
    margin: 16px;
    background-color: white;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }

  .card-title {
    font-size: 1.25em;
    font-weight: bold;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    color: black;
  }

  .card-content {
    font-size: 1em;
    color: #555;
    margin-bottom: 16px;
  }

  .card-action {
    display: inline-block;
    background-color: #3498db;
    color: white;
    padding: 8px 16px;
    border-radius: 6px;
    text-decoration: none;
    font-size: 0.9em;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .card-action:hover {
    background-color: #2980b9;
  }

  /* Espaciado entre el título y el ícono */
  .gap-2 {
    gap: 0.5rem;
  }
</style>
