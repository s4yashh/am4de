<script lang="ts">
  import { onMount } from 'svelte';

  export let email: string;
  export let onOtpVerified: () => void;
  export let onBackToSignup: () => void;

  let otp = '';
  let loading = false;
  let error = '';
  let success = false;
  let timeLeft = 900;
  let timerInterval: number | null = null;

  onMount(() => {
    timerInterval = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(timerInterval!);
        error = 'OTP has expired. Please request a new one.';
      }
    }, 1000);

    return () => {
      if (timerInterval) clearInterval(timerInterval!);
    };
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      error = 'Please enter a valid 6-digit OTP';
      return;
    }

    loading = true;
    error = '';

    try {
      const response = await fetch('https://amide-backend.vercel.app/verify_otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok && data.verified) {
        success = true;
        if (timerInterval) clearInterval(timerInterval);
        setTimeout(() => {
          onOtpVerified();
        }, 1500);
      } else {
        error = data.message || 'Invalid OTP. Please try again.';
      }
    } catch (err) {
      error = 'Connection error. Please check your internet and try again.';
      console.error('OTP verification error:', err);
    } finally {
      loading = false;
    }
  };

  const handleResendOtp = async () => {
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

      if (response.ok) {
        timeLeft = 900;
        error = '';
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(() => {
          timeLeft--;
          if (timeLeft <= 0) {
            clearInterval(timerInterval!);
            error = 'OTP has expired. Please request a new one.';
          }
        }, 1000);
      } else {
        error = data.error || 'Failed to resend OTP.';
      }
    } catch (err) {
      error = 'Connection error. Please try again.';
      console.error('Resend OTP error:', err);
    } finally {
      loading = false;
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && otp.length === 6) {
      handleVerifyOtp();
    }
  };
</script>

<div class="otp-container">
  <div class="otp-wrapper">
    <button class="back-btn" on:click={onBackToSignup}>← Back</button>

    <h1 class="otp-title">Verify Email</h1>
    <p class="otp-subtitle">Enter the 6-digit code sent to</p>
    <p class="otp-email">{email}</p>

    {#if success}
      <div class="success-message">✓ Email verified successfully!</div>
    {/if}

    {#if error}
      <div class="error-message">{error}</div>
    {/if}

    <div class="form-group">
      <label for="otp">Enter OTP Code</label>
      <input
        id="otp"
        type="text"
        placeholder="000000"
        maxlength="6"
        inputmode="numeric"
        bind:value={otp}
        on:keypress={handleKeyPress}
        disabled={loading || success || timeLeft <= 0}
        pattern="[0-9]*"
      />
    </div>

    <button
      class="verify-btn"
      on:click={handleVerifyOtp}
      disabled={loading || success || otp.length !== 6 || timeLeft <= 0}
    >
      {loading ? 'Verifying...' : success ? 'Verified!' : 'Verify OTP'}
    </button>

    <div class="otp-footer">
      <p>Didn't receive the code?</p>
      <button
        class="resend-btn"
        on:click={handleResendOtp}
        disabled={loading || success || timeLeft > 600}
      >
        Resend in {formatTime(timeLeft)}
      </button>
    </div>
  </div>
</div>

<style>
  .otp-container {
    position: fixed;
    inset: 0;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
  }

  .otp-wrapper {
    background: white;
    padding: 48px 40px;
    border-radius: 12px;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    position: relative;
  }

  .back-btn {
    position: absolute;
    top: 16px;
    left: 16px;
    background: none;
    border: none;
    color: #0a0a0a;
    font-size: 14px;
    cursor: pointer;
    transition: color 0.2s;
    font-weight: 500;
  }

  .back-btn:hover {
    color: #666;
  }

  .otp-title {
    font-size: 28px;
    font-weight: 600;
    color: #0a0a0a;
    margin: 24px 0 8px 0;
    font-family: 'Inter', sans-serif;
  }

  .otp-subtitle {
    font-size: 14px;
    color: #666;
    margin: 0;
    font-family: 'Inter', sans-serif;
  }

  .otp-email {
    font-size: 14px;
    color: #0a0a0a;
    font-weight: 600;
    margin: 4px 0 24px 0;
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

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 24px;
  }

  label {
    font-size: 14px;
    font-weight: 500;
    color: #0a0a0a;
    font-family: 'Inter', sans-serif;
  }

  input {
    padding: 16px 14px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 24px;
    font-family: 'Courier New', monospace;
    letter-spacing: 8px;
    text-align: center;
    font-weight: 600;
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

  .verify-btn {
    width: 100%;
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

  .verify-btn:hover:not(:disabled) {
    background: #1a1a1a;
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .verify-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .otp-footer {
    text-align: center;
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid #eee;
  }

  .otp-footer p {
    font-size: 14px;
    color: #666;
    margin: 0 0 12px 0;
    font-family: 'Inter', sans-serif;
  }

  .resend-btn {
    background: none;
    border: none;
    color: #0a0a0a;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: color 0.2s;
    font-family: 'Inter', sans-serif;
  }

  .resend-btn:hover:not(:disabled) {
    color: #666;
  }

  .resend-btn:disabled {
    color: #999;
    cursor: not-allowed;
  }
</style>
