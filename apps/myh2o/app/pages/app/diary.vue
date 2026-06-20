<template>
  <div class="px-6 pt-10 pb-10 animate-fade-in bg-slate-50 min-h-full">
    
    <header class="flex justify-between items-center mb-8">
      <h2 class="text-2xl font-extrabold text-slate-800">Hydration History</h2>
      <button class="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-500 shadow-sm border border-slate-100 hover:scale-105 transition-transform">
        <Icon name="heroicons:calendar-days-solid" class="text-xl" />
      </button>
    </header>

    <div class="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/40 border border-slate-100 mb-6">
      <div class="flex justify-between items-center mb-8">
        <h3 class="font-extrabold text-slate-800">Weekly Intake</h3>
        <span class="bg-blue-50 px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider text-blue-500">Last 7 Days</span>
      </div>
      
      <div
        class="flex items-end h-44 gap-3 mb-3"
      >
        <div
          v-for="day in weeklyStats"
          :key="day.date"
          class="flex-1 h-full flex items-end"
        >
          <div
            class="w-full rounded-t-xl bg-gradient-to-t from-blue-600 to-cyan-400 transition-all duration-700"
            :style="{
              height:
                day.amount > 0
                  ? Math.max(
                      (day.amount / maxAmount) * 170,
                      12
                    ) + 'px'
                  : '4px'
            }"
          />
        </div>
      </div>
      
      <div
        class="flex justify-between text-xs text-slate-400 font-extrabold"
      >
        <span
          v-for="day in weeklyStats"
          :key="day.date"
        >
          {{ day.label }}
        </span>
      </div>
    </div>

    <div class="flex gap-3 overflow-x-auto pb-2">

      <div
        class="min-w-[140px] bg-white rounded-3xl p-4 shadow-md"
      >
        <p class="text-xs text-slate-400">
          Best Day
        </p>

        <h4 class="font-black text-slate-800 mt-2">
          {{ bestDay }}
        </h4>
      </div>

      <div
        class="min-w-[140px] bg-white rounded-3xl p-4 shadow-md"
      >
        <p class="text-xs text-slate-400">
          Avg Intake
        </p>

        <h4 class="font-black text-slate-800 mt-2">
          {{ (averageIntake / 1000).toFixed(1) }}L
        </h4>
      </div>

      <div
        class="min-w-[140px] bg-white rounded-3xl p-4 shadow-md"
      >
        <p class="text-xs text-slate-400">
          Goal Hits
        </p>

        <h4 class="font-black text-slate-800 mt-2">
          {{ goalHits }}
        </h4>
      </div>

      </div>

    <div class="grid grid-cols-3 gap-3 mb-8">

    <div class="bg-white rounded-3xl p-4 shadow-md">
      <p class="text-[10px] font-bold text-slate-400 uppercase">
        Avg
      </p>

      <h4 class="text-xl font-black text-slate-800">
        {{ (weeklyAverage / 1000).toFixed(1) }}L
      </h4>
    </div>

    <div class="bg-white rounded-3xl p-4 shadow-md">
      <p class="text-[10px] font-bold text-slate-400 uppercase">
        Streak
      </p>

      <h4 class="text-xl font-black text-green-600">
        {{ streakDays }} Days
      </h4>
    </div>

    <div class="bg-white rounded-3xl p-4 shadow-md">
      <p class="text-[10px] font-bold text-slate-400 uppercase">
        Goal
      </p>

      <h4 class="text-xl font-black text-blue-600">
        {{ Math.round((currentIntake / dailyGoal) * 100) }}%
      </h4>
    </div>

    </div>

    <div
      class="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-3xl p-5 mb-6 text-white shadow-xl"
    >
      <div class="flex justify-between items-center">

        <div>
          <p class="text-blue-100 text-xs font-bold uppercase">
            Today's Progress
          </p>

          <h3 class="text-3xl font-black mt-1">
            {{ currentIntake }}
          </h3>

          <p class="text-sm text-blue-100">
            of {{ dailyGoal }} ml
          </p>
        </div>

        <div class="text-right">

          <div
            class="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center"
          >
            <span class="text-2xl font-black">
              {{ Math.round((currentIntake / dailyGoal) * 100) }}%
            </span>
          </div>

        </div>

      </div>
    </div>

    <h3 class="font-extrabold text-slate-800 mb-4 text-lg">Recent Logs</h3>
    
    <div v-if="waterLog.length === 0" class="text-center text-slate-400 py-10 bg-white rounded-3xl border-2 border-dashed border-slate-200">
      <Icon name="heroicons:beaker" class="text-4xl mb-2 text-slate-300" />
      <p class="text-sm font-bold">
        No water logged yet.
      </p>

      <p class="text-xs text-slate-400 mt-2">
        Start tracking your hydration today.
      </p>
    </div>

    <div class="space-y-3">
      <div v-for="(log, index) in waterLog.slice(0, 5)" :key="index" class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center hover:scale-[1.01] transition-transform">
         <div class="flex items-center gap-4">
           <div class="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-500">
             <Icon name="heroicons:beaker-solid" class="text-xl" />
           </div>
           <div>
            <h4 class="font-extrabold text-slate-800 text-sm">
              Water Intake
            </h4>

            <p class="text-xs text-slate-400">
              {{ log.time }}
            </p>
             <p class="text-xs text-slate-400 font-bold">Added Water</p>
           </div>
         </div>
         <div class="text-right">
           <h4 class="font-extrabold text-blue-500">{{ log.amount }} ml</h4>
         </div>
      </div>
    </div>

    <div
      class="mt-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-3xl p-5 border border-orange-100"
    >
      <div class="flex gap-4">

        <div
          class="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0"
        >
          <Icon
            name="heroicons:light-bulb-solid"
            class="text-orange-500"
          />
        </div>

        <div>
          <h4 class="font-extrabold text-orange-700">
            Weather Insight
          </h4>

          <p class="text-sm text-orange-600 mt-1">
            Temperatures are rising this week.
            Stay hydrated and increase your intake
            during hot afternoons.
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

import { useWaterTracker } from '~/composables/useWaterTracker'
import { computed, onMounted } from 'vue'

const {
  loadData
} = useWaterTracker()

onMounted(() => {
  loadData()

  console.log(
  JSON.stringify(
    waterLog.value,
    null,
    2
  )
)
})

const {
  currentIntake,
  dailyGoal,
  waterLog
} = useWaterTracker()

const goalStatus = computed(() => {
  if (currentIntake.value >= dailyGoal.value)
    return {
      label: 'Met Daily Goal',
      color: 'bg-green-100 text-green-600'
    }

  if (currentIntake.value >= dailyGoal.value * 0.8)
    return {
      label: 'Near Goal',
      color: 'bg-yellow-100 text-yellow-600'
    }

  return {
    label: 'Below Goal',
    color: 'bg-red-100 text-red-600'
  }
})

const weeklyStats = computed(() => {
  const days = []

  for (let i = 6; i >= 0; i--) {
    const date = new Date()

    date.setDate(
      date.getDate() - i
    )

    const year = date.getFullYear()

    const month = String(
      date.getMonth() + 1
    ).padStart(2, '0')

    const day = String(
      date.getDate()
    ).padStart(2, '0')

    const dateKey =
      `${year}-${month}-${day}`

    const total =
      waterLog.value
        .filter(
          log =>
            log.date === dateKey
        )
        .reduce(
          (sum, log) =>
            sum + Number(log.amount),
          0
        )

    days.push({
      date: dateKey,

      label:
        date.toLocaleDateString(
          'en-US',
          {
            weekday: 'short'
          }
        ),

      amount: total
    })
  }

  return days
})

// const maxAmount = computed(() => {
//   return Math.max(
//     ...weeklyStats.value.map(
//       d => d.amount
//     ),
//     1
//   )
// })

const averageIntake = computed(() => {
  if (!waterLog.value.length)
    return 0

  const total =
    waterLog.value.reduce(
      (sum, item) => sum + item.amount,
      0
    )

  const uniqueDays =
    new Set(
      waterLog.value.map(
        item => item.date
      )
    ).size

  return Math.round(
    total / Math.max(uniqueDays, 1)
  )
})

const bestDay = computed(() => {
  const dailyTotals = {}

  waterLog.value.forEach(log => {
    if (!log.date)
      return

    if (!dailyTotals[log.date]) {
      dailyTotals[log.date] = 0
    }

    dailyTotals[log.date] += log.amount
  })

  let bestDate = null
  let bestAmount = 0

  Object.entries(dailyTotals).forEach(
    ([date, amount]) => {
      if (amount > bestAmount) {
        bestAmount = amount
        bestDate = date
      }
    }
  )

  if (!bestDate)
    return 'Today'

  return new Date(bestDate)
    .toLocaleDateString(
      'en-US',
      {
        weekday: 'long'
      }
    )
})

const goalHits = computed(() => {
  const dailyTotals = {}

  waterLog.value.forEach(log => {
    if (!dailyTotals[log.date])
      dailyTotals[log.date] = 0

    dailyTotals[log.date] += log.amount
  })

  const hitCount =
    Object.values(dailyTotals)
      .filter(
        total =>
          total >= dailyGoal.value
      )
      .length

  return `${hitCount}/${Object.keys(dailyTotals).length}`
})

const streakDays = computed(() => {
  const dates =
    [...new Set(
      waterLog.value
        .filter(log => log.date)
        .map(log => log.date)
    )]

  return dates.length
})

const weeklyAverage = computed(() => {
  const total =
    weeklyStats.value.reduce(
      (sum, day) =>
        sum + day.amount,
      0
    )

  return Math.round(
    total / 7
  )
})

const maxAmount = computed(() => {
  return Math.max(
    ...weeklyStats.value.map(
      day => day.amount
    ),
    1
  )
})
</script>