<script lang="ts">
  import { onMount } from 'svelte';
  import logoImage from '$lib/../assets/logo.png';
  
  let hidePreloader = false;

  onMount(() => {
    setTimeout(() => (hidePreloader = true), 2500);
  });
</script>

{#if !hidePreloader}
  <div class="preloader fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white overflow-hidden">
    
    <!-- Center Logo with subtle movement animation -->
    <img 
      src={logoImage} 
      alt="amide" 
      class="w-32 h-32 z-10 animate-bounce" 
      style="animation-duration: 2s;"
    />

    <!-- AMIDE Text at bottom -->
    <div class="absolute bottom-12 z-10">
      <p class="text-1xl font-bold text-gray-900" style="font-family: 'Mona Sans', sans-serif; letter-spacing: 2px;">AMIDE</p>
    </div>
  </div>
{/if}

<style>
  .preloader {
    pointer-events: none;
  }
</style>
