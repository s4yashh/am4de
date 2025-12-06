<script lang="ts">
  export let email: string = '';
  export let onVerify: (otp: string) => Promise<void> = async () => {};
  export let onBack: () => void = () => {};

  let otp = '';
  let isLoading = false;
  let error = '';
  let resendCount = 0;

  const handleVerify = async () => {
    if (!otp || otp.length !== 6) {
      error = 'Please enter a 6-digit OTP';
      return;
    }

    isLoading = true;
    error = '';

    try {
      await onVerify(otp);
    } catch (err) {
      error = err instanceof Error ? err.message : 'Verification failed';
    } finally {
      isLoading = false;
    }
  };

  const handleResend = () => {
    resendCount++;
    // Backend will handle resending OTP
  };
</script>

<div class="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center px-4">
  <div class="w-full max-w-md">
    <div class="rounded-lg shadow-lg p-8" style="background-color: #DDE1D3;">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-12 h-12 bg-green-600 rounded-lg mb-4">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-900">Verify Email</h1>
        <p class="text-gray-600 mt-2">Enter the 6-digit code sent to {email}</p>
      </div>

      <!-- OTP Form -->
      <form on:submit|preventDefault={handleVerify} class="space-y-6">
        {#if error}
          <div class="bg-red-50 border border-red-200 rounded-lg p-3">
            <p class="text-red-800 text-sm">{error}</p>
          </div>
        {/if}

        <div>
          <label for="otp" class="block text-sm font-medium text-gray-700 mb-2">One-Time Password</label>
          <input
            type="text"
            id="otp"
            bind:value={otp}
            placeholder="000000"
            maxlength="6"
            inputmode="numeric"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-center text-2xl tracking-widest focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
          <p class="text-sm text-gray-500 mt-2">Check your email for the verification code</p>
        </div>

        <button
          type="submit"
          disabled={isLoading || otp.length !== 6}
          class="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Verifying...' : 'Verify Email'}
        </button>
      </form>

      <!-- Divider -->
      <div class="relative my-6">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 text-gray-700" style="background-color: #DDE1D3;">Didn't receive code?</span>
        </div>
      </div>

      <!-- Resend & Back -->
      <div class="space-y-2">
        <button
          type="button"
          on:click={handleResend}
          class="w-full border-2 border-blue-600 text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
        >
          Resend Code
        </button>
        <button
          type="button"
          on:click={onBack}
          class="w-full text-gray-600 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Back
        </button>
      </div>
    </div>
  </div>
</div>

<style>
</style>
