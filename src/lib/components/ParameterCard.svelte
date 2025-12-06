<script lang="ts">
  import type { Parameter } from '$lib/api';

  export let parameter: Parameter;

  const getGradient = (name: string) => {
    // All use green accent (#D2FF02)
    return '';
  };
</script>

<div class="group relative overflow-hidden rounded-xl border shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-6" style="background-color: #FAFAF8; border-color: #000000;">
  <!-- Accent bar -->
  <div class="absolute top-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500" style="background-color: #000000;"></div>
  
  <div class="relative z-10">
    <div class="text-xs font-bold uppercase tracking-widest mb-3 opacity-75" style="color: #000000;">
      {parameter.name}
    </div>
    <div class="text-4xl font-bold" style="color: #000000;">
      {parameter.value}
    </div>
    <div class="mt-4 h-1 rounded-full overflow-hidden" style="background-color: #000000;">
      <div class="h-full w-3/4 rounded-full" style="background-color: #000000;"></div>
    </div>
  </div>
  
  <!-- Subtle icon -->
  <div class="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
    <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
    </svg>
  </div>
</div>

<style>
</style>

