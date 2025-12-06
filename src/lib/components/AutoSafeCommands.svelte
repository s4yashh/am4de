<script lang="ts">
  import type { AutoSafeCommand } from '$lib/api';

  export let commands: AutoSafeCommand[] = [];
</script>

<div class="space-y-2">
  {#each commands as command (command.id)}
    <div class="group relative overflow-hidden flex items-center justify-between p-3 rounded-lg border hover:shadow-md transition-all duration-300" style="background-color: #3a4028; border-color: #D2FF02;">
      <!-- Animated background -->
      <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style="background: linear-gradient(to right, rgba(210, 255, 2, 0.1), transparent);"></div>
      
      <div class="relative flex items-center gap-3 flex-1">
        {#if command.status === 'active'}
          <div class="relative">
            <div class="relative w-2.5 h-2.5 rounded-full animate-pulse" style="background-color: #D2FF02;"></div>
          </div>
          <span class="text-sm font-bold" style="color: #D2FF02;">{command.command}</span>
        {:else}
          <div class="w-2.5 h-2.5 bg-gray-400 rounded-full"></div>
          <span class="text-sm font-medium" style="color: #F4F4ED;">{command.command}</span>
        {/if}
      </div>
      
      <span
        class="relative text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide shadow-sm transition-all duration-300"
        class:bg-gray-100={command.status === 'completed'}
        class:text-gray-700={command.status === 'completed'}
        style="{command.status === 'active' ? 'background-color: #D2FF02; color: #282C20;' : ''}"
      >
        {command.status}
      </span>
    </div>
  {/each}
</div>

<style>
</style>

