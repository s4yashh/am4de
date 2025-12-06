<script lang="ts">
  import { onMount } from 'svelte';
  import TopBar from '$lib/components/TopBar.svelte';
  import ParameterCard from '$lib/components/ParameterCard.svelte';
  import PredictionCard from '$lib/components/PredictionCard.svelte';
  import LogEntry from '$lib/components/LogEntry.svelte';
  import Preloader from '$lib/components/Preloader.svelte';
  import {
    getParameters,
    getPredictions,
    getLogs,
    getPermissionStatus,
    getAutoSafeCommands,
    type Parameter,
    type Prediction,
    type Log,
    type AutoSafeCommand
  } from '$lib/api';

  let parameters: Parameter[] = [];
  let predictions: Prediction[] = [];
  let logs: Log[] = [];
  let permissionStatus: string = 'Waiting for Permission';
  let autoSafeCommands: AutoSafeCommand[] = [];
  
  let isLoading = true;
  let error: string | null = null;

  const loadData = async () => {
    try {
      isLoading = true;
      error = null;
      
      const [paramsData, predsData, logsData, permissionData, commandsData] = await Promise.all([
        getParameters(),
        getPredictions(),
        getLogs(),
        getPermissionStatus(),
        getAutoSafeCommands()
      ]);

      parameters = paramsData;
      predictions = predsData;
      logs = logsData;
      permissionStatus = permissionData;
      autoSafeCommands = commandsData;
    } catch (err) {
      error = 'Failed to load dashboard data';
      console.error(err);
    } finally {
      isLoading = false;
    }
  };

  onMount(() => {
    loadData();
    
    // Auto-refresh every 3 seconds
    const interval = setInterval(loadData, 3000);
    
    return () => clearInterval(interval);
  });
</script>

<Preloader />

<div class="site-wrapper w-screen min-h-screen" style="background-color: #282C20;">
  <TopBar {permissionStatus} {autoSafeCommands} />

  <main class="w-full px-4 sm:px-6 lg:px-8 py-12">
    <!-- Loading State -->
    {#if isLoading && parameters.length === 0}
      <div class="flex items-center justify-center h-96">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-700 mb-4" style="border-top-color: #D2FF02;"></div>
          <p class="text-lg font-semibold" style="color: #D2FF02;">Loading threat analysis...</p>
          <p class="text-sm mt-2" style="color: #F4F4ED;">Analyzing network packets</p>
        </div>
      </div>
    {/if}

    <!-- Error State -->
    {#if error}
      <div class="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 mb-8 shadow-sm">
        <div class="flex items-start">
          <svg class="w-6 h-6 text-red-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <div class="ml-4">
            <h3 class="text-red-900 font-semibold">Error Loading Data</h3>
            <p class="text-red-800 text-sm mt-1">{error}</p>
          </div>
        </div>
      </div>
    {/if}

    {#if !isLoading || parameters.length > 0}
      <!-- Header -->
      <div class="mb-12">
        <div class="flex items-center justify-between mb-2">
          <div>
            <h2 class="text-4xl font-bold" style="color: #D2FF02;">Security Dashboard</h2>
            <p class="text-sm mt-2" style="color: #F4F4ED;">Real-time threat detection and network analysis</p>
          </div>
          <div class="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border shadow-sm" style="background-color: #3a4028; border-color: #D2FF02;">
            <div class="w-2 h-2 rounded-full animate-pulse" style="background-color: #D2FF02;"></div>
            <span class="text-sm font-semibold" style="color: #F4F4ED;">Live</span>
            <span class="text-xs ml-2" style="color: #F4F4ED;">{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
        <div class="h-1 w-16 rounded-full" style="background-color: #D2FF02;"></div>
      </div>

      <!-- Parameters Section -->
      <section class="mb-16">
        <div class="mb-6">
          <h3 class="text-2xl font-bold flex items-center gap-3" style="color: #D2FF02;">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #D2FF02;">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Network Metrics
          </h3>
          <p class="text-sm mt-2" style="color: #F4F4ED;">Current security and network parameters</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {#each parameters as param (param.name)}
            <ParameterCard parameter={param} />
          {/each}
        </div>
      </section>

      <!-- Predictions Section -->
      <section class="mb-16">
        <div class="mb-6">
          <h3 class="text-2xl font-bold flex items-center gap-3" style="color: #D2FF02;">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #D2FF02;">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            AI Detection Models
          </h3>
          <p class="text-sm mt-2" style="color: #F4F4ED;">Machine learning threat detection confidence levels</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {#each predictions as pred (pred.modelName)}
            <PredictionCard prediction={pred} />
          {/each}
        </div>
      </section>

      <!-- Logs Section -->
      <section>
        <div class="mb-6">
          <h3 class="text-2xl font-bold flex items-center gap-3" style="color: #D2FF02;">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #D2FF02;">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Security Alerts & Logs
          </h3>
          <p class="text-sm mt-2" style="color: #F4F4ED;">Real-time security events and threat warnings</p>
        </div>
        <div class="rounded-xl border shadow-md overflow-hidden" style="background-color: #3a4028; border-color: #D2FF02;">
          <div class="max-h-[600px] overflow-y-auto">
            {#if logs.length === 0}
              <div class="p-12 text-center">
                <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #D2FF02;">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="font-medium" style="color: #D2FF02;">No security alerts detected</p>
                <p class="text-sm mt-1" style="color: #F4F4ED;">System operating normally</p>
              </div>
            {:else}
              <div class="divide-y divide-gray-100">
                {#each logs as log (log.id)}
                  <LogEntry {log} />
                {/each}
              </div>
            {/if}
          </div>
        </div>
      </section>
    {/if}
  </main>
</div>

<style>
</style>
