<script lang="ts">
  import logo from '../../assets/logo.png';
  import video from '../../assets/riskdetected.mp4';
  import SignupForm from './Auth/SignupForm.svelte';
  import OTPForm from './Auth/OTPForm.svelte';
  import LoginForm from './Auth/LoginForm.svelte';
  
  export let onGetStarted: () => void;

  let authStep: 'home' | 'signup' | 'login' | 'otp' = 'home';
  let signupEmail = '';
  let signupHashedPassword = '';

  const handleGetStartedClick = () => {
    authStep = 'signup';
  };

  const handleLoginClick = () => {
    authStep = 'login';
  };

  const handleSignupComplete = (email: string, hashedPassword: string) => {
    signupEmail = email;
    signupHashedPassword = hashedPassword;
    authStep = 'otp';
  };

  const handleLoginComplete = () => {
    localStorage.setItem('hasVisitedDashboard', 'true');
    onGetStarted();
  };

  const handleOtpVerified = () => {
    localStorage.setItem('hasVisitedDashboard', 'true');
    onGetStarted();
  };

  const handleBackToSignup = () => {
    authStep = 'signup';
    signupEmail = '';
  };

  const handleBackToHome = () => {
    authStep = 'home';
    signupEmail = '';
  };

  const handleBackToLogin = () => {
    authStep = 'login';
  };
</script>

<div class="site-wrapper w-screen min-h-screen flex flex-col" style="background-color: #0a0a0a;">
  {#if authStep === 'signup'}
    <SignupForm onSignupComplete={handleSignupComplete} onBackToLogin={handleBackToLogin} />
  {:else if authStep === 'login'}
    <LoginForm onLoginComplete={handleLoginComplete} onBackToHome={handleBackToHome} />
  {:else if authStep === 'otp'}
    <OTPForm email={signupEmail} hashedPassword={signupHashedPassword} onOtpVerified={handleOtpVerified} onBackToSignup={handleBackToSignup} />
  {:else}
    <!-- Home Page Content -->
    <div class="home-content">
  <header class="w-full px-6 py-4 border-b" style="border-color: #1a1a1a;">
    <div class="flex items-center">
      <img src={logo} alt="AMIDE Logo" class="w-20 h-20" style="filter: brightness(0) invert(1);" />
      <span class="text-3xl font-semibold" style="color: #FFFFFF; margin-left: -8px;">Amide</span>
    </div>
  </header>
  
  <main class="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-40">
    <div class="max-w-3xl w-full text-center">

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
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
        <button
          on:click={handleGetStartedClick}
          class="px-8 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-light rounded-full transition-all duration-300 hover:shadow-lg"
          style="background-color: #F4F4ED; color: #0a0a0a;"
        >
          Get started
        </button>
        <button
          on:click={handleLoginClick}
          class="px-8 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-light rounded-full transition-all duration-300 border-2"
          style="border-color: #3a3a3a; color: #FFFFFF;"
        >
          Sign in
        </button>
      </div>
    </div>
  </main>

  <!-- Video Section (Full Width) -->
  <div style="width: 100vw; margin-left: calc(-50vw + 50%);">
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

  <!-- Features Row -->
  <div class="w-full px-4 sm:px-6 lg:px-8 mt-20 pb-12">
    <div class="max-w-4xl mx-auto pt-12 border-t text-center" style="border-color: #2a2a2a;">
      <p class="text-xs sm:text-sm uppercase tracking-widest mb-8" style="color: #FFFFFF;">Trusted by leading enterprises</p>
      <div class="flex flex-wrap justify-center gap-8 items-center">
        <div style="color: #FFFFFF;" class="text-sm font-medium">Enterprise Security</div>
        <div style="color: #FFFFFF;" class="text-sm font-medium">Real-time Monitoring</div>
        <div style="color: #FFFFFF;" class="text-sm font-medium">AI-Powered Analytics</div>
      </div>
    </div>
  </div>
    </div>
  {/if}
</div>

<style>
  :global(body) {
    background-color: #0a0a0a;
  }
</style>
