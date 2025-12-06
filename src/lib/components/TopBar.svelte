<script lang="ts">
  import logo from '../../assets/logo.png';
  import AutoSafeCommands from './AutoSafeCommands.svelte';
  import type { AutoSafeCommand } from '$lib/api';

  export let permissionStatus: string = 'Waiting for Permission';
  export let autoSafeCommands: AutoSafeCommand[] = [];
</script>

<header class="sticky top-0 z-40 border-b shadow-sm" style="background-color: #FAFAF8; border-color: #000000;">
  <div class="w-full px-4 sm:px-6 lg:px-8 pb-4" style="padding-top: -8px;">
    <div class="flex items-center justify-between">
      <!-- Logo & Title -->
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-1">
          <img src={logo} alt="AMIDE Logo" class="w-24 h-24" />
        </div>
        
        <!-- Permission Status -->
        <div class="flex items-center gap-2 px-4 py-2.5 rounded-lg border shadow-sm hover:shadow-md transition-all" style="background-color: #FAFAF8; border-color: #000000;">
          <div class="relative">
            <div class="relative w-3 h-3 rounded-full animate-pulse" style="background-color: #000000;"></div>
          </div>
          <span class="text-sm font-semibold" style="color: #000000;">{permissionStatus}</span>
        </div>
      </div>

      <!-- AutoSafe Commands Panel -->
      <div class="hidden lg:block flex-shrink-0">
        <div class="rounded-xl p-4 shadow-md hover:shadow-lg transition-all max-w-xs border" style="background-color: #FAFAF8; border-color: #000000;">
          <h3 class="text-sm font-bold mb-3 uppercase tracking-wide" style="color: #000000;">Active Security Commands</h3>
          <AutoSafeCommands commands={autoSafeCommands} />
        </div>
      </div>
    </div>

    <!-- Mobile permission status -->
    <div class="sm:hidden mt-4 flex items-center gap-2 px-3 py-2 rounded-lg border" style="background-color: #FAFAF8; border-color: #000000;">
      <div class="w-2 h-2 rounded-full animate-pulse" style="background-color: #000000;"></div>
      <span class="text-xs font-semibold" style="color: #000000;">{permissionStatus}</span>
    </div>
  </div>
</header>

<style>
</style>
