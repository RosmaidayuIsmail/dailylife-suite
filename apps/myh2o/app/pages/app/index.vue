<template>
  <div class="px-6 pt-10 pb-10 animate-fade-in relative min-h-full bg-slate-50">
    <RewardPopup
      :show="showPopup"
      :title="popupTitle"
      :message="popupMessage"
      :icon="popupIcon"
    />
    
    <header class="mb-6">
      <p
        class="text-blue-500 font-bold text-sm uppercase tracking-wider"
      >
        Welcome Back
      </p>

      <div class="flex justify-between items-center mt-1">
        <h2
          class="text-3xl font-extrabold text-slate-800"
        >
          {{ username }}
        </h2>

        <div
          class="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100"
        >
          <div
            class="w-2 h-2 rounded-full bg-green-500 animate-pulse"
          />

          <span
            class="text-xs font-bold text-green-700"
          >
            Hydrated
          </span>
        </div>
      </div>
    </header>

    <div class="grid grid-cols-5 gap-3 mb-6">
      <div
        class="bg-white rounded-2xl min-h-[72px] px-2 flex flex-col items-center justify-center shadow-lg"
      >
      <div
        class="h-8 flex items-center justify-center font-black text-blue-600"
        :class="cardNumberSize(currentIntake)"
      >
      {{ currentIntake.toLocaleString() }}
      </div>

        <div
          class="text-xs text-slate-400 font-bold"
        >
          TODAY
        </div>
      </div>

      <div
        class="bg-white rounded-2xl min-h-[72px] px-2 flex flex-col items-center justify-center shadow-lg"
      >
      <div
        class="h-8 flex items-center justify-center font-black text-cyan-600"
        :class="cardNumberSize(Math.round(progressPercentage))"
      >
        {{ Math.round(progressPercentage) }}%
      </div>

        <div
          class="text-xs text-slate-400 font-bold"
        >
          GOAL
        </div>
      </div>

      <div
        class="bg-white rounded-2xl min-h-[72px] px-2 flex flex-col items-center justify-center shadow-lg"
      >
      <div
        class="h-8 flex items-center justify-center font-black text-emerald-600"
        :class="cardNumberSize(todayLogs)"
      >
        {{ todayLogs }}
      </div>

        <div
          class="text-xs text-slate-400 font-bold"
        >
          LOGS
        </div>
      </div>

      <div
        class="bg-white rounded-2xl min-h-[72px] px-2 flex flex-col items-center justify-center shadow-lg"
      >
      <div
        class="h-8 flex items-center justify-center font-black text-amber-500"
        :class="cardNumberSize(rewardPoints)"
      >
        {{ rewardPoints }}
      </div>

        <div
          class="text-xs text-slate-400 font-bold"
        >
          POINTS
        </div>
      </div>

      <div
        class="bg-white rounded-2xl min-h-[72px] px-2 flex flex-col items-center justify-center shadow-lg"
      >
      <div
        class="h-8 flex items-center justify-center font-black text-red-500"
        :class="cardNumberSize(streak)"
      >
        {{ streak }}
      </div>

        <div
          class="text-xs text-slate-400 font-bold"
        >
          STREAK
        </div>
      </div>
    </div>

    <div
      class="grid grid-cols-[1fr_110px] gap-4 mb-4 items-start"
    >
      
    <!-- Water Tank -->

    <div
      class="bg-white rounded-[40px] p-5 shadow-xl shadow-blue-100/30"
    >
    <div
      class="relative w-44 h-72 mx-auto rounded-[50px] overflow-hidden border-[8px] border-blue-300 bg-slate-100 shadow-[0_0_60px_rgba(6,182,212,0.35)]"
    >

        <!-- Tank Top Shine -->

        <div
          class="absolute top-4 left-6 right-6 h-4 bg-white/50 rounded-full z-20"
        />

        <div
          class="absolute top-4 left-4
                w-24 h-14
                rounded-full
                bg-white/20
                blur-md
                z-20"
        />

        <!-- Water -->

        <div
          class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-500 via-sky-400 to-blue-300 transition-all duration-1000"
          :style="{
            height: `${progressPercentage}%`
          }"
        >

          <!-- Water Surface -->

          <div
            class="absolute -top-4 left-[-50%]
                  w-[200%] h-10
                  bg-white/35
                  rounded-[100%]
                  animate-wave"
          />

          <div
            class="absolute -top-2 left-[-20%]
                  w-[140%] h-8
                  bg-white/20
                  rounded-[100%]
                  animate-wave-slow"
          />

          <!-- Water Highlight -->

          <div
            class="absolute top-0 left-0 right-0
                  h-3 bg-white/20"
          />

          <!-- Light Reflection -->

          <div
            class="absolute inset-0
                  bg-gradient-to-b
                  from-white/10
                  via-transparent
                  to-transparent"
          />

          <!-- Bubbles -->

          <div class="bubble bubble-1"></div>
          <div class="bubble bubble-2"></div>
          <div class="bubble bubble-3"></div>
          <div class="bubble bubble-4"></div>
          <div class="bubble bubble-5"></div>
          <div class="bubble bubble-6"></div>

        </div>

        <!-- Content -->

        <div
          class="absolute inset-0 flex flex-col items-center justify-center z-30"
        >

        <div
          class="w-full px-2 text-center font-black text-slate-800"
          :class="
            currentIntake > 9999
              ? 'text-4xl'
              : 'text-6xl'
          "
        >
        {{ currentIntake.toLocaleString() }}
        </div>

        <div
          class="text-xs font-bold text-slate-600 text-center px-2"
        >
          of {{ dailyGoal }} ml
        </div>

          <div
            class="mt-3 px-5 py-2 rounded-full bg-white/90 shadow-md text-blue-600 text-sm font-black"
          >
            {{ Math.round(progressPercentage) }}%
          </div>

        </div>

      </div>
    </div>

    <!-- Quick Add -->

    <div
      class="flex flex-col gap-4"
    >

      <!-- Cup -->

      <button
        @click="addWater(250)"
        class="h-[65px] rounded-3xl bg-cyan-50 shadow-md hover:scale-105 transition flex flex-col items-center justify-center"
      >
      <Icon
        name="mdi:cup-water"
        class="text-2xl text-cyan-600"
      />
        <span class="text-sm font-bold text-cyan-700">
          Glass
        </span>
        <span class="text-xs text-cyan-500">
          250 ml
        </span>
      </button>

      <!-- Bottle -->

      <button
        @click="addWater(500)"
        class="h-[65px] rounded-3xl bg-blue-500 shadow-lg shadow-blue-300 hover:scale-105 transition flex flex-col items-center justify-center"
      >
      <Icon
        name="mdi:bottle-soda"
        class="text-2xl text-white"
      />
        <span class="text-sm font-bold text-white">
          Bottle
        </span>
        <span class="text-xs text-blue-100">
          500 ml
        </span>
      </button>

      <!-- Sport -->

      <button
        @click="addWater(750)"
        class="h-[65px] rounded-3xl bg-cyan-50 shadow-md hover:scale-105 transition flex flex-col items-center justify-center"
      >
      <Icon
        name="mdi:glass-mug"
        class="text-2xl text-cyan-600"
      />
        <span class="text-sm font-bold text-cyan-700">
          Jug
        </span>
        <span class="text-xs text-cyan-500">
          750 ml
        </span>
      </button>

      <!-- Custom Amount -->

      <div
        class="bg-white rounded-3xl p-2 shadow-md border border-slate-100"
      >
      <input
        v-model="customAmount"
        type="number"
        placeholder="ml"
        class="w-full text-center text-xs font-bold bg-slate-50 rounded-xl py-2 outline-none"
      />

        <button
          @click="addCustom"
          class="mt-2 w-full bg-slate-800 text-white rounded-xl py-2 text-xs font-bold"
        >
          Add
        </button>
      </div>

    </div>
    </div>

    <div
      class="bg-gradient-to-r from-orange-50 to-red-50 rounded-3xl p-4 border border-orange-100 mb-4 -mt-2 shadow-lg"
    >
      <div class="flex items-center gap-4">
        
        <div
          class="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center"
        >
          <Icon
            name="heroicons:sun-solid"
            class="text-orange-500 text-xl"
          />
        </div>

        <div>
          <h4 class="font-bold text-slate-800">
            Weather Adjusted
          </h4>

          <p class="text-sm text-slate-500">
            Temp is 32°C. Your goal increased by
            300ml today.
          </p>
        </div>

      </div>
      
    </div>

    <div
          class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-5 border border-cyan-100 shadow-lg mb-4"
        >
          <h3
            class="font-extrabold text-slate-800"
          >
            Weekly Challenge
          </h3>

          <p
            class="text-sm text-slate-500 mt-1"
          >
            Drink 14,000ml this week
          </p>

          <div
            class="mt-4 h-4 bg-slate-200 rounded-full overflow-hidden"
          >
            <div
              class="h-full bg-cyan-500"
              :style="{
                width: weeklyProgress + '%'
              }"
            />
          </div>

          <p
            class="mt-2 text-sm font-bold text-cyan-700"
          >
            {{ weeklyTotal.toLocaleString() }} / 14,000 ml
          </p>
        </div>

    <div
      v-if="currentIntake >= dailyGoal"
      class="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-3xl p-4 border border-yellow-200 shadow-lg mb-4"
    >
      <div class="flex items-center gap-4">

        <div
          class="w-14 h-14 rounded-2xl bg-yellow-400 flex items-center justify-center shadow-md"
        >
          <Icon
            name="heroicons:trophy-solid"
            class="text-white text-2xl"
          />
        </div>

        <div>
          <h4 class="font-extrabold text-slate-800">
            Daily Goal Completed
          </h4>

          <p class="text-sm text-slate-500">
            Hydration target achieved • Great job!
          </p>
        </div>

      </div>
    </div>

    <div
      v-if="
        smartReminder &&
        !isQuietHours
      "
      class="bg-blue-50 border border-blue-100 rounded-3xl p-4 mb-4 shadow-lg"
    >
      <div class="flex items-center gap-3">

        <div
          class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center"
        >
          <Icon
            name="heroicons:bell-alert-solid"
            class="text-blue-500 text-xl"
          />
        </div>

        <div>
          <h4 class="font-bold text-blue-700">
            Smart Reminder Active
          </h4>

          <p class="text-sm text-blue-500">
            Stay hydrated and log water regularly.
          </p>
        </div>

      </div>
    </div>

    <div
      v-if="showWeatherAlert"
      class="mt-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl p-5 border border-red-100 shadow-lg shadow-red-100/30"
    >
      <div class="flex items-start gap-4">

        <div
          class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0"
        >
          <Icon
            name="heroicons:sun-solid"
            class="text-red-500 text-xl"
          />
        </div>

        <div>
          <h4 class="font-extrabold text-red-700">
            Hot & Sunny
          </h4>

          <p class="text-sm text-red-600 mt-1 leading-relaxed">
            High temperature detected.
            Consider drinking an additional
            <span class="font-bold">200ml</span>
            today to stay hydrated.
          </p>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
})

import { ref, computed, onMounted } from 'vue'
import { useWaterTracker } from '~/composables/useWaterTracker'
import RewardPopup from '~/components/RewardPopup.vue'

onMounted(() => {
  loadData()
})

const {
  loadData,
  username,
  streak,
  currentIntake,
  dailyGoal,
  addWater,
  waterLog,
  rewardPoints,
  weatherAlert,
  smartReminder,
  quietHours,
  popupMessage,
  showPopup,
  popupTitle,
  popupIcon
} = useWaterTracker()

const customAmount = ref('')

const cardNumberSize = (value) => {
  const length = String(value).length

  if (length >= 6) return 'text-base'
  if (length >= 5) return 'text-lg'

  return 'text-xl'
}

const progressPercentage = computed(() => {
  return Math.min((currentIntake.value / dailyGoal.value) * 100, 100)
})

const motivationMessage = computed(() => {
  if (progressPercentage.value >= 100)
    return 'Amazing! Goal achieved today 🎉'

  if (progressPercentage.value >= 75)
    return "You're doing great! Keep it up."

  if (progressPercentage.value >= 50)
    return 'Halfway there! Stay hydrated.'

  return 'Start your hydration journey today.'
})

const addCustom = async () => {
  if (!customAmount.value)
    return

  await addWater(Number(customAmount.value))

  customAmount.value = ''
}

const weeklyTotal = computed(() => {
  return waterLog.value.reduce(
    (sum, item) =>
      sum + Number(item.amount),
    0
  )
})

const weeklyProgress = computed(() => {
  return Math.min(
    (weeklyTotal.value / 14000) * 100,
    100
  )
})

const showWeatherAlert = computed(() => {
  return (
    weatherAlert.value &&
    currentIntake.value > 0 &&
    currentIntake.value < dailyGoal.value * 0.5
  )
})

const todayLogs = computed(() => {

const now = new Date()

const today =
  `${now.getFullYear()}-${
    String(now.getMonth() + 1).padStart(2, '0')
  }-${
    String(now.getDate()).padStart(2, '0')
  }`

return waterLog.value.filter(
  log => log.date === today
).length

})

const isQuietHours = computed(() => {
  const hour = new Date().getHours()

  return (
    quietHours.value &&
    (
      hour >= 22 ||
      hour < 6
    )
  )
})
</script>

<style scoped>

@keyframes wave {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

@keyframes waveSlow {
  from {
    transform: translateX(-10%);
  }

  to {
    transform: translateX(-60%);
  }
}

@keyframes bubble {
  0% {
    transform: translateY(0);
    opacity: 0;
  }

  30% {
    opacity: 1;
  }

  100% {
    transform: translateY(-60px);
    opacity: 0;
  }
}

.animate-wave {
  animation: wave 4s linear infinite;
}

.animate-wave-slow {
  animation: waveSlow 8s linear infinite;
}

.animate-bubble {
  animation: bubble 3s infinite;
}

.bubble {
  position: absolute;
  bottom: 0;
  border-radius: 9999px;
  background: rgba(255,255,255,0.4);
}

.bubble-1 {
  width: 8px;
  height: 8px;
  left: 20%;
  animation: bubble 4s infinite;
}

.bubble-2 {
  width: 12px;
  height: 12px;
  left: 40%;
  animation: bubble 5s infinite 1s;
}

.bubble-3 {
  width: 6px;
  height: 6px;
  left: 60%;
  animation: bubble 3s infinite;
}

.bubble-4 {
  width: 10px;
  height: 10px;
  left: 80%;
  animation: bubble 6s infinite;
}

.bubble-5 {
  width: 7px;
  height: 7px;
  left: 30%;
  animation: bubble 5s infinite 2s;
}

.bubble-6 {
  width: 9px;
  height: 9px;
  left: 70%;
  animation: bubble 4s infinite 1s;
}
</style>