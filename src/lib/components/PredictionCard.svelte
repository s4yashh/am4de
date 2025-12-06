<script lang="ts">
  import type { Prediction } from '$lib/api';

  export let prediction: Prediction;

  const getColor = (confidence: number) => {
    // All confidence levels use green accent (#D2FF02)
    return { bg: '#D2FF02', text: '#D2FF02' };
  };

  const colors = getColor(prediction.confidence);
  const percentage = Math.round(prediction.confidence * 100);
</script>

<div class="group relative overflow-hidden rounded-xl border shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-6" style="background-color: #FAFAF8; border-color: #000000;">
  <!-- Top accent bar -->
  <div class="absolute top-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500" style="background-color: #000000;"></div>
  
  <div class="relative z-10">
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

