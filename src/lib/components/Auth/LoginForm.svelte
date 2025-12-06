<script lang="ts">
  import { sha256 } from '../../crypto';
  
  export let onLoginComplete: () => void;
  export let onBackToHome: () => void;

  let email = '';
  let password = '';
  let loading = false;
  let error = '';
  let success = false;

  const handleLogin = async () => {
    if (!email || !password) {
      error = 'Email and password are required';
      return;
    }

    if (password.length < 6) {
      error = 'Password must be at least 6 characters';
      return;
    }

    loading = true;
    error = '';

    try {
      const hashedPassword = await sha256(password);
      console.log('🔐 Password hashed:', hashedPassword.substring(0, 8) + '...');
      console.log('📧 Email:', email);
      
      const requestBody = { 
        email,
        password: hashedPassword
      };
      console.log('📤 Sending login request:', requestBody);
      
      // Try /api/signin first, then fall back to /api/login
      let response = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      // If 404, try /api/login instead
      if (response.status === 404) {
        console.log('⚠️ /api/signin returned 404, trying /api/login...');
        response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
      }

      const data = await response.json();
      console.log('✅ LOGIN RESPONSE:', data);
      console.log('📊 Response status:', response.status);
      console.log('📋 Response OK:', response.ok);
      console.log('🔑 Response keys:', Object.keys(data));

      // Check multiple possible response formats
      if (response.ok && (data.success === true || data.authenticated === true || data.status === 'ok' || data.verified === true)) {
        success = true;
        localStorage.setItem('authToken', data.token || data.access_token || '');
        localStorage.setItem('userEmail', email);
        setTimeout(() => {
          onLoginComplete();
        }, 1500);
      } else {
        error = data.error || data.message || data.detail || 'Login failed. Please try again.';
        console.error('❌ Login failed with response:', data);
      }
    } catch (err) {
      const errMessage = err instanceof Error ? err.message : String(err);
      error = `Connection error: ${errMessage}. Check internet or try again.`;
      console.error('Login error:', err);
    } finally {
      loading = false;
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };
</script>

<div class="login-container w-screen min-h-screen flex flex-col items-center justify-center" style="background-color: #0a0a0a;">
  <div class="form-wrapper w-full max-w-md px-6 sm:px-8">
    <button 
      on:click={onBackToHome}
      class="mb-8 text-sm flex items-center gap-2 transition-all duration-200 hover:opacity-80"
      style="color: #BABABA;"
    >
      ← Back to home
    </button>

    <h1 class="form-title text-4xl sm:text-5xl font-light mb-2" style="color: #FFFFFF;">Sign in</h1>
    <p class="form-subtitle text-base sm:text-lg mb-10" style="color: #BABABA;">
      Welcome back to AMIDE
    </p>

    {#if success}
      <div class="success-message mb-6 p-4 rounded-lg" style="background-color: #1a3a2a; border: 1px solid #2a5a4a;">
        <p style="color: #4ade80;">✓ Login successful! Redirecting...</p>
      </div>
    {/if}

    {#if error}
      <div class="error-message mb-6 p-4 rounded-lg" style="background-color: #3a1a1a; border: 1px solid #5a2a2a;">
        <p style="color: #ff6b6b;">{error}</p>
      </div>
    {/if}

    <form on:submit|preventDefault={handleLogin} class="space-y-6">
      <!-- Email Field -->
      <div class="form-group">
        <label for="email" class="block text-sm font-medium mb-2" style="color: #FFFFFF;">Email address</label>
        <input
          id="email"
          type="email"
          placeholder="you@company.com"
          bind:value={email}
          on:keypress={handleKeyPress}
          disabled={loading}
          class="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200"
          style="background-color: #1a1a1a; color: #FFFFFF; border: 1px solid #3a3a3a; --tw-ring-color: #4a9eff;"
        />
      </div>

      <!-- Password Field -->
      <div class="form-group">
        <label for="password" class="block text-sm font-medium mb-2" style="color: #FFFFFF;">Password</label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          bind:value={password}
          on:keypress={handleKeyPress}
          disabled={loading}
          class="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200"
          style="background-color: #1a1a1a; color: #FFFFFF; border: 1px solid #3a3a3a; --tw-ring-color: #4a9eff;"
        />
      </div>

      <!-- Login Button -->
      <button
        type="submit"
        disabled={loading}
        class="w-full py-3 rounded-lg font-medium transition-all duration-300 transform hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        style="background-color: #F4F4ED; color: #0a0a0a;"
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>

    <!-- Signup Link -->
    <p class="text-center mt-6" style="color: #BABABA;">
      Don't have an account? 
      <a href="#signup" class="font-medium transition-colors duration-200 hover:text-white" style="color: #4a9eff;">Create one</a>
    </p>
  </div>
</div>

<style>
  .login-container {
    overflow-y: auto;
  }

  .form-wrapper {
    animation: slideUp 0.5s ease-out;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  input::placeholder {
    color: #5a5a5a;
  }
</style>
