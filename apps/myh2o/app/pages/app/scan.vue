<template>
    <div class="px-6 pt-10 pb-10">
  
      <h2
        class="text-2xl font-extrabold text-slate-800 mb-6"
      >
        Scan Water QR
      </h2>
  
      <div
        id="reader"
        class="bg-white rounded-3xl overflow-hidden shadow-lg h-[350px]"
      ></div>
  
      <div
        class="mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-5 rounded-3xl shadow-lg"
        >
        <p class="text-sm font-bold opacity-90">
            Today's Hydration
        </p>

        <div class="mt-2 flex items-end gap-2">
            <span class="text-4xl font-black">
            {{ currentIntake }}
            </span>

            <span class="text-lg font-bold mb-1">
            ml
            </span>
        </div>

        <div class="mt-3">
            <div
            class="w-full h-3 bg-white/20 rounded-full overflow-hidden"
            >
            <div
                class="h-full bg-white rounded-full transition-all duration-700"
                :style="{
                width: `${progressPercentage}%`
                }"
            />
            </div>

            <p class="text-xs mt-2 opacity-90">
            {{ Math.round(progressPercentage) }}%
            of {{ dailyGoal }}ml goal
            </p>
        </div>
        </div>
  
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    middleware: ['auth']
  })
  
  import { onMounted, onBeforeUnmount, computed } from 'vue'
  import { Html5Qrcode } from 'html5-qrcode'
  import { useWaterTracker } from '~/composables/useWaterTracker'
  
  const {
    addWater,
    currentIntake,
    dailyGoal
} = useWaterTracker()

const progressPercentage = computed(() => {
  return Math.min(
    (currentIntake.value / dailyGoal.value) * 100,
    100
  )
})
  
  let scanner = null

  let lastScan = 0
  
  onMounted(async () => {

    scanner =
    new Html5Qrcode('reader')
  
    try {

        await scanner.start(
        {
            facingMode: 'environment'
        },
        {
            fps: 10,
            qrbox: 250
        },
        async (decodedText) => {

            const now = Date.now()

            if (now - lastScan < 3000)
            return

            lastScan = now

            const amount = Number(decodedText)

            if (
            amount === 250 ||
            amount === 500 ||
            amount === 750
            ) {
            addWater(amount)

            alert(`Added ${amount}ml`)
            }
        }
        )

        }
        catch (err) {

        console.error(err)

        alert(
        'Camera Error: ' +
        JSON.stringify(err)
        )

        }
  
  })
  
  onBeforeUnmount(async () => {

    if (scanner) {
    await scanner.stop()
    }

  })
  </script>