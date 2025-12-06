<script lang="ts">
  import { onMount } from "svelte";
  import logoImage from "$lib/../assets/logo.png";

  let progress = 0;
  let expand = false;
  let hide = false;

  onMount(() => {
    let n = 0;

    // progress bar animation
    const interval = setInterval(() => {
      n++;
      progress = n;

      if (n >= 100) {
        clearInterval(interval);

        // delay then expand vertically
        setTimeout(() => (expand = true), 300);

        // remove preloader after animation
        setTimeout(() => (hide = true), 1100);
      }
    }, 12);
  });
</script>

{#if !hide}
<div class="preloader">

  <!-- Vertical expanding panel -->
  <div class="expander" style="transform: scaleY({expand ? 1 : 0});"></div>

  <!-- Center logo -->
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

  /* ✔ Fullscreen vertical expansion */
  .expander {
    position: absolute;
    inset: 0;
    background: #000;
    transform-origin: center;
    transform: scaleY(0);
    transition: transform 0.8s ease-in-out;
    z-index: 20;
  }

  .logo {
    width: 120px;
    height: auto;
    z-index: 30;
    margin-bottom: 10px;
  }

  .line-container {
    width: 280px;
    height: 3px;
    background: #e5e5e5;
    overflow: hidden;
    border-radius: 2px;
    z-index: 30;
  }

  /* ✔ The line that fills left → right */
  .line-fill {
    height: 100%;
    background: black;
    transition: width 0.05s linear;
  }

  .brand {
    margin-top: 25px;
    font-family: "Mona Sans", sans-serif;
    letter-spacing: 2px;
    font-weight: bold;
    font-size: 16px;
    color: #333;
    z-index: 30;
  }
</style>
