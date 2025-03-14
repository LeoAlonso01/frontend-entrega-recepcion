<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';

    let user = {};
    let userId = $page.params.id;

    onMount(async () => {
        const response = await fetch(`/api/users/${userId}`);
        user = await response.json();
    });
</script>

<main>
    <h1>User Details</h1>
    {#if user}
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
    {:else}
        <p>Loading...</p>
    {/if}
</main>

<style>
    main {
        padding: 1rem;
    }
    h1 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }
    p {
        font-size: 1.2rem;
        margin: 0.5rem 0;
    }
</style>