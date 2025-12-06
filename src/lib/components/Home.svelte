<script lang="ts">
  import logo from '../../assets/logo.png';
  import video from '../../assets/riskdetected.mp4';
  
  export let onGetStarted: () => void;

  const handleGetStartedClick = () => {
    localStorage.setItem('hasVisitedDashboard', 'true');
    onGetStarted();
  };
</script>

<div class="site-wrapper w-screen min-h-screen flex flex-col" style="background-color: #0a0a0a;">
  <!-- Header -->
  <header class="w-full px-6 py-4 border-b" style="border-color: #1a1a1a;">
    <div class="flex items-center gap-3">
      <img src={logo} alt="AMIDE Logo" class="w-12 h-12" style="filter: brightness(0) invert(1);" />
      <span class="text-xl font-bold" style="color: #FFFFFF;">AMIDE</span>
    </div>
  </header>
  
  <main class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl w-full text-center">

      <!-- Main Heading -->
      <h1 class="mb-6">
        <div style="font-family: 'Inter Tight', sans-serif; font-size: 71px; font-weight: 100; line-height: 80px; color: #FFFFFF;">Risk clarity.</div>
        <div style="font-family: 'Source Serif 4', serif; font-size: 71px; font-weight: 300; line-height: 80px; color: #FFFFFF;">Without the noise.</div>
      </h1>

      <!-- Subheading -->
      <p class="text-lg sm:text-xl mb-12 leading-relaxed" style="color: #BABABA;">
       Take control of encrypted-traffic threats with a platform that unifies 
        <br />
       packet metadata, behavioral patterns, ML detection, and real-time visibility.
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          on:click={handleGetStartedClick}
          class="px-8 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-semibold rounded-full transition-all duration-300 hover:shadow-lg"
          style="background-color: #F4F4ED; color: #0a0a0a;"
        >
          Get started
        </button>
        <button
          class="px-8 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-semibold rounded-full transition-all duration-300 border-2"
          style="border-color: #3a3a3a; color: #FFFFFF;"
        >
          Free trial
        </button>
      </div>

      <!-- Video Section -->
      <div class="mt-16" style="width: 100vw; margin-left: calc(-50vw + 50%); margin-right: calc(-50vw + 50%);">
        <video
          muted
          playsinline
          autoplay
          loop
          style="width: 100%; height: auto; display: block;"
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>

      <!-- Features Row (Optional) -->
      <div class="mt-20 pt-12 border-t" style="border-color: #2a2a2a;">
        <p class="text-xs sm:text-sm uppercase tracking-widest mb-8" style="color: #FFFFFF;">Trusted by leading enterprises</p>
        <div class="flex flex-wrap justify-center gap-8 items-center">
          <div style="color: #FFFFFF;" class="text-sm font-medium">Enterprise Security</div>
          <div style="color: #FFFFFF;" class="text-sm font-medium">Real-time Monitoring</div>
          <div style="color: #FFFFFF;" class="text-sm font-medium">AI-Powered Analytics</div>
        </div>
      </div>
    </div>
  </main>
</div>

<style>
  :global(body) {
    background-color: #0a0a0a;
  }
</style>
