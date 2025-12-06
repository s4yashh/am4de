<script lang="ts">
  import { onMount } from "svelte";
  import logoImage from "$lib/../assets/logo.png";

  let progress = 0;
  let expand = false;
  let hide = false;

  onMount(() => {
    let n = 0;

    // Ultra-smooth progress interval at 120fps
    const interval = setInterval(() => {
      n += 1;
      progress = n;

      if (n >= 100) {
        clearInterval(interval);

        // Trigger vertical reveal smoothly
        setTimeout(() => (expand = true), 200);

        // Remove preloader AFTER expansion completes
        setTimeout(() => (hide = true), 1200);
      }
    }, 8.33); // 8.33ms = 120fps
  });
</script>

{#if !hide}
<div class="preloader">

  <!-- Vertical expanding screen -->
  <div class="expander" class:expanded={expand}></div>

  <!-- Logo -->
  <img src={logoImage} class="logo" alt="AMIDE" />

  <!-- Horizontal progress bar -->
  <div class="line-container">
    <div class="line-fill" style="width: {progress}%"></div>
  </div>

  <p class="brand">AMIDE</p>
</div>
{/if}

<style>
  .preloader {
    position: fixed;
    inset: 0;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 364px;
    z-index: 999;
    overflow: hidden;
  }

  /* FULLSCREEN EXPAND PANEL */
  .expander {
    position: absolute;
    inset: 0;
    background: #000;
    transform-origin: center;
    transform: scaleY(0);
    transition: transform 0.9s cubic-bezier(0.25, 1, 0.5, 1); /* super smooth */
    z-index: 20;
  }

  .expander.expanded {
    transform: scaleY(1);
  }

  .logo {
    width: 120px;
    height: auto;
    z-index: 30;
    margin-bottom: 12px;
    will-change: transform;
  }

  .line-container {
    width: 280px;
    height: 3px;
    background: #e5e5e5;
    border-radius: 2px;
    overflow: hidden;
    z-index: 30;
    will-change: transform;
  }

  /* Super smooth width animation */
  .line-fill {
    height: 100%;
    background: black;
    transition: width 0.12s linear; /* smooth motion */
    will-change: width;
  }

  .brand {
    margin-top: 22px;
    font-family: "Mona Sans", sans-serif;
    letter-spacing: 2px;
    font-weight: bold;
    font-size: 16px;
    color: #333;
    z-index: 30;
  }
</style>
