<script lang="ts">
  export let onSignupComplete: (email: string) => void;

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
      const response = await fetch('https://amide-backend.vercel.app/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && (data.status === 'ok' || data.status === 'exists')) {
        success = true;
        setTimeout(() => {
          onSignupComplete(email);
        }, 1500);
      } else {
        error = data.error || 'Failed to send OTP. Please try again.';
      }
    } catch (err) {
      error = 'Connection error. Please check your internet and try again.';
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

<div class="signup-container">
  <div class="form-wrapper">
    <h1 class="form-title">Create Account</h1>
    <p class="form-subtitle">Join AMIDE to monitor encrypted threats</p>

    {#if success}
      <div class="success-message">
        <p>✓ OTP sent to {email}</p>
      </div>
    {/if}

    {#if error}
      <div class="error-message">
        {error}
      </div>
    {/if}

    <form on:submit|preventDefault={handleSignup}>
      <div class="form-group">
        <label for="email">Email Address</label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          bind:value={email}
          on:keypress={handleKeyPress}
          disabled={loading || success}
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          bind:value={password}
          on:keypress={handleKeyPress}
          disabled={loading || success}
        />
        <small>At least 6 characters</small>
      </div>

      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          bind:value={confirmPassword}
          on:keypress={handleKeyPress}
          disabled={loading || success}
        />
      </div>

      <button type="submit" class="submit-btn" disabled={loading || success}>
        {loading ? 'Sending OTP...' : success ? 'OTP Sent!' : 'Get Started'}
      </button>
    </form>

    <p class="form-footer">
      Already have an account?
      <a href="#login">Sign in</a>
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
