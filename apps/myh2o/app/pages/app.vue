<template>
  <div class="h-full w-full flex flex-col relative bg-slate-50">
    
    <main class="flex-1 overflow-y-auto pb-32 z-10 hide-scrollbar">
      <NuxtPage /> 
    </main>

    <nav
      class="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-slate-100 flex justify-evenly py-4 pb-7 z-50"
    >
      
      <NuxtLink to="/app" class="flex flex-col items-center text-slate-400 gap-1.5 transition-all group hover:-translate-y-1" active-class="!text-blue-500" exact-active-class="!text-blue-500">
        <Icon name="heroicons:home-solid" class="text-2xl" />
        <span class="text-[11px] font-extrabold tracking-wide">Home</span>
      </NuxtLink>
      
      <NuxtLink to="/app/diary" class="flex flex-col items-center text-slate-400 gap-1.5 transition-all group hover:-translate-y-1" active-class="!text-blue-500">
        <Icon name="heroicons:chart-bar-square-solid" class="text-2xl" />
        <span class="text-[11px] font-extrabold tracking-wide">History</span>
      </NuxtLink>

      <NuxtLink
        to="/app/scan"
        class="flex flex-col items-center text-slate-400 gap-1.5"
        active-class="!text-blue-500"
      >
        <Icon
          name="heroicons:qr-code-solid"
          class="text-2xl"
        />

        <span
          class="text-[11px] font-extrabold"
        >
          Scan
        </span>
      </NuxtLink>

      <NuxtLink
        to="/app/game"
        class="flex flex-col items-center text-slate-400 gap-1.5"
        active-class="!text-blue-500"
      >
        <Icon
          name="heroicons:play-solid"
          class="text-2xl"
        />

        <span
          class="text-[11px] font-extrabold"
        >
          Game
        </span>
      </NuxtLink>

      <NuxtLink
        to="/app/reminders"
        class="flex flex-col items-center text-slate-400 gap-1.5 transition-all group hover:-translate-y-1"
        active-class="!text-blue-500"
      >
        <Icon
          name="heroicons:bell-alert-solid"
          class="text-2xl"
        />

        <span
          class="text-[11px] font-extrabold tracking-wide"
        >
          Alerts
        </span>
      </NuxtLink>
      
      <NuxtLink to="/app/profile" class="flex flex-col items-center text-slate-400 gap-1.5 transition-all group hover:-translate-y-1" active-class="!text-blue-500">
        <Icon name="heroicons:cog-8-tooth-solid" class="text-2xl" />
        <span class="text-[11px] font-extrabold tracking-wide">Settings</span>
      </NuxtLink>
      
    </nav>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
})

import { onMounted } from 'vue'
import { useWaterTracker } from '~/composables/useWaterTracker'

const { loadData } = useWaterTracker()

onMounted(() => {
  loadData()
})
</script>