<script lang="ts">
  import "../app.postcss";
  import { onMount } from 'svelte';
  import { Spinner } from 'flowbite-svelte';

  onMount(() => {
    window.location.href = '/home';
  });
</script>

<style>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Adjust the opacity as needed */
    backdrop-filter: blur(2px); /* Adjust the blur intensity as needed */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999; /* Ensure the overlay is above other content */
  }
</style>

<div class="overlay">
  <div class="flex justify-center items-center">
    <Spinner color="purple"/>
  </div>
</div>
