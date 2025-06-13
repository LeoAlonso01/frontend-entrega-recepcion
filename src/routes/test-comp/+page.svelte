<script>
    import Slider from "$lib/components/Slider.svelte";
    import { onMount } from "svelte";
    import { authStore, authService } from "$lib/stores/auth";

    onMount(() => {
        authService.checkAuth();
    });
</script>

<h1>Bienvenido , {$authStore.user?.username}</h1>
<p>Tu Rol es: {$authStore.user?.role}</p>
<Slider />
