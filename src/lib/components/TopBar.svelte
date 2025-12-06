<script lang="ts">
  import AutoSafeCommands from './AutoSafeCommands.svelte';
  import type { AutoSafeCommand } from '$lib/api';

  export let permissionStatus: string = 'Waiting for Permission';
  export let autoSafeCommands: AutoSafeCommand[] = [];
</script>

<header class="sticky top-0 z-40 border-b shadow-sm" style="background-color: #282C20; border-color: #3a4028;">
  <div class="w-full px-4 sm:px-6 lg:px-8 py-4">
    <div class="flex items-center justify-between">
      <!-- Logo & Title -->
      <div class="flex items-center gap-4">
        <div class="hidden sm:flex items-center gap-3">
          <div class="relative">
            <div class="relative px-3 py-2 rounded-lg" style="background-color: #282C20;">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" style="color: #D2FF02;">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
          <h1 class="text-2xl font-bold" style="color: #D2FF02;">amide</h1>
        </div>
        
        <!-- Permission Status -->
        <div class="flex items-center gap-2 px-4 py-2.5 rounded-lg border shadow-sm hover:shadow-md transition-all" style="background-color: #3a4028; border-color: #D2FF02;">
          <div class="relative">
            <div class="relative w-3 h-3 rounded-full animate-pulse" style="background-color: #D2FF02;"></div>
          </div>
          <span class="text-sm font-semibold" style="color: #F4F4ED;">{permissionStatus}</span>
        </div>
      </div>

      <!-- AutoSafe Commands Panel -->
      <div class="hidden lg:block flex-shrink-0">
        <div class="rounded-xl p-4 shadow-md hover:shadow-lg transition-all max-w-xs border" style="background-color: #3a4028; border-color: #D2FF02;">
          <h3 class="text-sm font-bold mb-3 uppercase tracking-wide" style="color: #F4F4ED;">Active Security Commands</h3>
          <AutoSafeCommands commands={autoSafeCommands} />
        </div>
      </div>
    </div>

    <!-- Mobile permission status -->
    <div class="sm:hidden mt-4 flex items-center gap-2 px-3 py-2 rounded-lg border" style="background-color: #3a4028; border-color: #D2FF02;">
      <div class="w-2 h-2 rounded-full animate-pulse" style="background-color: #D2FF02;"></div>
      <span class="text-xs font-semibold" style="color: #F4F4ED;">{permissionStatus}</span>
    </div>
  </div>
</header>

<style>
</style>
