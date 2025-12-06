<script lang="ts">
  import type { Prediction, Log } from '$lib/api';
  import LogEntry from './LogEntry.svelte';

  export let prediction: Prediction;
  export let isSelected: boolean = false;
  export let onSelect: (modelName: string) => void = () => {};
  export let logs: Log[] = [];

  const getColor = (confidence: number) => {
    // All confidence levels use green accent (#D2FF02)
    return { bg: '#D2FF02', text: '#D2FF02' };
  };

  const colors = getColor(prediction.confidence);
  const percentage = Math.round(prediction.confidence * 100);

  const getRelevantLogs = () => {
    return logs.filter(log => log.message.toLowerCase().includes(prediction.modelName.toLowerCase()));
  };
</script>

<div class="relative rounded-xl border shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden" style="background-color: {isSelected ? '#E8E8E6' : '#FAFAF8'}; border-color: #000000; border-width: {isSelected ? '3px' : '1px'};">
  <!-- Top accent bar -->
  <div class="absolute top-0 left-0 h-1 w-full transition-all duration-500" style="background-color: #000000;"></div>
  
  <div class="p-6" on:click={() => onSelect(prediction.modelName)}>
    <div class="flex items-start justify-between mb-4">
      <h3 class="text-lg font-bold flex-1" style="color: #000000;">{prediction.modelName}</h3>
      <div class="text-right">
        <div class="text-3xl font-bold" style="color: #000000;">
          {percentage}%
        </div>
      </div>
    </div>
    
    <!-- Advanced progress bar with animation -->
    <div class="mb-4">
      <div class="relative h-3 rounded-full overflow-hidden" style="background-color: #000000;">
        <div
          class="h-full rounded-full transition-all duration-1000 ease-out shadow-lg"
          style="width: {percentage}%; background-color: #000000; animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;"
        ></div>
      </div>
    </div>

    <!-- Status indicator -->
    <div class="flex items-center justify-between">
      <span class="text-xs font-semibold" style="color: #000000;">Confidence Score</span>
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 rounded-full animate-pulse" style="background-color: #000000;"></div>
        <span class="text-xs font-semibold" style="color: #000000;">Active</span>
      </div>
    </div>
  </div>

  <!-- Always Visible Logs Section -->
  <div class="border-t overflow-hidden transition-all duration-500 ease-out" style="max-height: {isSelected ? '400px' : '200px'}; border-color: #333333;">
    <div style="background-color: #1a1a1a;" class="p-4">
      <div class="space-y-2 max-h-[300px] overflow-y-auto">
        {#if getRelevantLogs().length === 0}
          <p class="text-xs" style="color: #BABABA;">No detections</p>
        {:else}
          {#each getRelevantLogs() as log (log.id)}
            <div class="text-xs p-2 rounded" style="background-color: #2a2a2a; border-color: #333333; border: 1px solid #333333;">
              <p style="color: #FFFFFF;" class="line-clamp-2">{log.message}</p>
              <p style="color: #BABABA;" class="text-xs mt-1">{new Date(log.timestamp).toLocaleTimeString()}</p>
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }
</style>

