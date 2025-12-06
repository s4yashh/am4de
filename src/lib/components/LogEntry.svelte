<script lang="ts">
  import type { Log } from '$lib/api';

  export let log: Log;

  const isWarning = log.level === 'warning';
  const isAlert = log.level === 'alert';

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };
</script>

<div
  class="group relative flex items-start gap-4 px-4 py-3 border-l-4 transition-all duration-300 hover:px-6 hover:bg-opacity-100 animate-fade-in"
  class:border-amber-400={isWarning}
  class:border-red-500={isAlert}
  class:border-lime-400={!isWarning && !isAlert}
  style="background-color: #2a2a2a; color: #FFFFFF;"
>
  <!-- Animated left indicator -->
  <div class="absolute left-0 top-0 h-full w-1 transition-all duration-300"
    class:border-lime-400={!isWarning && !isAlert}
    class:from-amber-400={isWarning}
    class:to-amber-600={isWarning}
    class:from-red-500={isAlert}
    class:to-red-700={isAlert}
    style="{!isWarning && !isAlert ? 'background-color: #D2FF02;' : ''}"
  ></div>

  <!-- Icon -->
  <div class="flex-shrink-0 mt-1">
    {#if isWarning}
      <div class="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
        <svg class="w-5 h-5 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
    {:else if isAlert}
      <div class="w-8 h-8 rounded-lg bg-red-900 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow animate-pulse">
        <svg class="w-5 h-5 text-red-300" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M13.477 14.89A6 6 0 15.572 13m0 0l1.415 1.414m-7.07-7.07l1.414-1.414m2.828 2.828a4 4 0 11-5.657-5.657m5.657 5.657L9.172 9.172m0 0L7.757 7.757"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
    {/if}
  </div>

  <!-- Content -->
  <div class="flex-1 min-w-0 py-1">
    <p class="text-sm font-semibold transition-colors" style="color: #FFFFFF;">
      {log.message}
    </p>
    <p class="text-xs mt-1.5 flex items-center gap-2" style="color: #BABABA;">
      <span class="inline-block w-1.5 h-1.5 rounded-full" 
        class:bg-amber-400={isWarning}
        class:bg-red-500={isAlert}
        style="{!isWarning && !isAlert ? 'background-color: #D2FF02;' : ''}"
      ></span>
      {formatTime(log.timestamp)}
    </p>
  </div>

  <!-- Badge -->
  <div class="flex-shrink-0">
    <span
      class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm"
      class:bg-amber-100={isWarning}
      class:text-amber-800={isWarning}
      class:bg-red-100={isAlert}
      class:text-red-800={isAlert}
      style="{!isWarning && !isAlert ? 'background-color: #D2FF02; color: #282C20;' : ''}"
    >
      {log.level}
    </span>
  </div>
</div>

<style>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  :global(.animate-fade-in) {
    animation: fadeIn 0.3s ease-out;
  }
</style>
