<script lang="ts">
  import type { AutoSafeCommand } from '$lib/api';
  import FillTitle from './FillTitle.svelte';

  export let permissionStatus: string = 'Waiting for Permission';
  export let autoSafeCommands: AutoSafeCommand[] = [];
</script>

<header class="sticky top-0 z-40 border-b shadow-sm" style="background-color: #FAFAF8; border-color: #000000;">
  <div class="w-full px-4 sm:px-6 lg:px-8 py-4" style="">
    <div class="flex items-center justify-between">
      <!-- Logo and Title -->
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="AMIDE Logo" class="w-16 h-16" />
        <div class="text-5xl font-bold dashboard-heading">
          <FillTitle
            text="Security Dashboard"
            textColor="#000000"
            fillColor="#DBDBDB"
            delay={0.4}
          />
        </div>
      </div>
      
      <!-- Permission Status -->
      <div class="flex items-center gap-2 px-4 py-2.5 rounded-lg border shadow-sm hover:shadow-md transition-all" style="background-color: #FAFAF8; border-color: #000000;">
        <div class="relative">
          <div class="relative w-3 h-3 rounded-full animate-pulse" style="background-color: #000000;"></div>
        </div>
        <span class="text-sm font-semibold" style="color: #000000;">{permissionStatus}</span>
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
