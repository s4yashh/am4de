<script lang="ts">
  import { sha256 } from '../../crypto';
  import { fetchAPI } from '../../fetchAPI';
  
  export let onSignupComplete: (email: string, password: string) => void;
  export let onBackToLogin: () => void;

  let email = '';
  let password = '';
  let confirmPassword = '';
  let loading = false;
  let error = '';
  let success = false;

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      error = 'All fields are required';
      return;
    }

    if (password !== confirmPassword) {
      error = 'Passwords do not match';
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
      
      const response = await fetchAPI('https://amide-backend.vercel.app/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          password: hashedPassword
        }),
      });

      const data = await response.json();
      console.log('✅ SIGNUP RESPONSE:', data);
      console.log('📊 Response status:', response.status);

      if (response.ok && (data.status === 'ok' || data.status === 'exists')) {
        success = true;
        setTimeout(() => {
          onSignupComplete(email, hashedPassword);
        }, 1500);
      } else {
        error = data.error || data.message || 'Failed to send OTP. Please try again.';
      }
    } catch (err) {
      const errMessage = err instanceof Error ? err.message : String(err);
      error = `Connection error: ${errMessage}. Check internet or try again.`;
      console.error('Signup error:', err);
    } finally {
      loading = false;
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSignup();
    }
  };
</script>

<div class="signup-container w-screen min-h-screen flex flex-col items-center justify-center" style="background-color: #0a0a0a;">
  <div class="form-wrapper w-full max-w-md px-6 sm:px-8">
    <button 
      on:click={onBackToLogin}
      class="mb-8 text-sm flex items-center gap-2 transition-all duration-200 hover:opacity-80"
      style="color: #BABABA;"
    >
      ← Back to sign in
    </button>

    <h1 class="form-title text-4xl sm:text-5xl font-light mb-2" style="color: #FFFFFF;">Create Account</h1>
    <p class="form-subtitle text-base sm:text-lg mb-10" style="color: #BABABA;">
      Join AMIDE to monitor encrypted threats
    </p>

    {#if success}
      <div class="success-message mb-6 p-4 rounded-lg" style="background-color: #1a3a2a; border: 1px solid #2a5a4a;">
        <p style="color: #4ade80;">✓ OTP sent to {email}</p>
      </div>
    {/if}

    {#if error}
      <div class="error-message mb-6 p-4 rounded-lg" style="background-color: #3a1a1a; border: 1px solid #5a2a2a;">
        <p style="color: #ff6b6b;">{error}</p>
      </div>
    {/if}

    <form on:submit|preventDefault={handleSignup} class="space-y-6">
      <div class="form-group">
        <label for="email" class="block text-sm font-medium mb-2" style="color: #FFFFFF;">Email address</label>
        <input
          id="email"
          type="email"
          placeholder="you@company.com"
          bind:value={email}
          on:keypress={handleKeyPress}
          disabled={loading || success}
          class="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200"
          style="background-color: #1a1a1a; color: #FFFFFF; border: 1px solid #3a3a3a; --tw-ring-color: #4a9eff;"
        />
      </div>

      <div class="form-group">
        <label for="password" class="block text-sm font-medium mb-2" style="color: #FFFFFF;">Password</label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          bind:value={password}
          on:keypress={handleKeyPress}
          disabled={loading || success}
          class="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200"
          style="background-color: #1a1a1a; color: #FFFFFF; border: 1px solid #3a3a3a; --tw-ring-color: #4a9eff;"
        />
        <p class="text-xs mt-1" style="color: #BABABA;">At least 6 characters</p>
      </div>

      <div class="form-group">
        <label for="confirmPassword" class="block text-sm font-medium mb-2" style="color: #FFFFFF;">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          bind:value={confirmPassword}
          on:keypress={handleKeyPress}
          disabled={loading || success}
          class="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200"
          style="background-color: #1a1a1a; color: #FFFFFF; border: 1px solid #3a3a3a; --tw-ring-color: #4a9eff;"
        />
      </div>

      <button
        type="submit"
        disabled={loading || success}
        class="w-full py-3 rounded-lg font-medium transition-all duration-300 transform hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        style="background-color: #F4F4ED; color: #0a0a0a;"
      >
        {loading ? 'Sending OTP...' : success ? 'OTP Sent!' : 'Create Account'}
      </button>
    </form>

    <p class="text-center mt-6" style="color: #BABABA;">
      Already have an account? 
      <button
        on:click={onBackToLogin}
        class="font-medium transition-colors duration-200 hover:text-white"
        style="color: #4a9eff; background: none; border: none; cursor: pointer; padding: 0;"
      >
        Sign in
      </button>
    </p>
  </div>
</div>

<style>
  .signup-container {
    position: fixed;
    inset: 0;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
  }

  .form-wrapper {
    background: white;
    padding: 48px 40px;
    border-radius: 12px;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }

  .form-title {
    font-size: 28px;
    font-weight: 600;
    color: #0a0a0a;
    margin: 0 0 8px 0;
    font-family: 'Inter', sans-serif;
  }

  .form-subtitle {
    font-size: 14px;
    color: #666;
    margin: 0 0 32px 0;
    font-family: 'Inter', sans-serif;
  }

  .success-message {
    background: #e8f5e9;
    border-left: 4px solid #4caf50;
    padding: 12px 16px;
    border-radius: 4px;
    margin-bottom: 24px;
    font-size: 14px;
    color: #2e7d32;
  }

  .error-message {
    background: #ffebee;
    border-left: 4px solid #f44336;
    padding: 12px 16px;
    border-radius: 4px;
    margin-bottom: 24px;
    font-size: 14px;
    color: #c62828;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  label {
    font-size: 14px;
    font-weight: 500;
    color: #0a0a0a;
    font-family: 'Inter', sans-serif;
  }

  input {
    padding: 12px 14px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    transition: all 0.2s;
  }

  input:focus {
    outline: none;
    border-color: #0a0a0a;
    box-shadow: 0 0 0 3px rgba(10, 10, 10, 0.1);
  }

  input:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
  }

  small {
    font-size: 12px;
    color: #999;
  }

  .submit-btn {
    padding: 12px 20px;
    background: #0a0a0a;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    font-family: 'Inter', sans-serif;
  }

  .submit-btn:hover:not(:disabled) {
    background: #1a1a1a;
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .form-footer {
    text-align: center;
    font-size: 14px;
    color: #666;
    margin-top: 24px;
    font-family: 'Inter', sans-serif;
  }

  .form-footer a {
    color: #0a0a0a;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s;
  }

  .form-footer a:hover {
    color: #555;
  }
</style>
