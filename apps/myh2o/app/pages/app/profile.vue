<template>
  <div class="px-6 pt-10 pb-10 animate-fade-in bg-slate-50 min-h-full">
    
    <header class="flex justify-between items-center mb-8">
      <h2 class="text-2xl font-extrabold text-slate-800">Settings</h2>
    </header>

    <div class="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/40 border border-slate-100 mb-8 relative transition-all">
      
      <div v-if="!isEditing">
        <button @click="isEditing = true" class="absolute top-5 right-5 w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-all">
          <Icon name="heroicons:pencil-solid" class="text-lg" />
        </button>
        <div class="flex items-center gap-5">
          <div class="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-extrabold text-3xl shadow-lg shadow-purple-200">
            {{ username?.charAt(0) || 'U' }}
          </div>
          <div>
            <h3 class="font-extrabold text-slate-800 text-2xl">{{ username }}</h3>
            <p class="text-sm font-bold text-slate-400 mt-1"><span class="text-blue-500">{{ dailyGoal }} ml</span> Daily Goal</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-100">
          <div>
            <p class="text-xs font-bold tracking-wider text-slate-400 uppercase">Weight</p>
            <p class="font-extrabold text-slate-800 text-lg">{{ weight }} kg</p>
          </div>
          <div>
            <p class="text-xs font-bold tracking-wider text-slate-400 uppercase">Height</p>
            <p class="font-extrabold text-slate-800 text-lg">{{ height }} cm</p>
          </div>
          <div class="col-span-2">
            <p class="text-xs font-bold tracking-wider text-slate-400 uppercase">Activity</p>
            <p class="font-extrabold text-slate-800 text-lg">{{ activityLevel }}</p>
          </div>
        </div>
      </div>

      <div v-else class="space-y-4 animate-fade-in">
        <h3 class="font-extrabold text-slate-800 text-lg mb-4">Edit Profile</h3>
        
        <div>
          <label class="text-xs font-bold tracking-wider text-slate-400 uppercase">Name</label>
          <input v-model="editForm.username" type="text" class="w-full bg-slate-50 p-3 rounded-xl font-bold text-slate-800 mt-1 outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        
        <div class="flex gap-4">
          <div class="flex-1">
            <label class="text-xs font-bold tracking-wider text-slate-400 uppercase">Weight (kg)</label>
            <input v-model="editForm.weight" type="number" class="w-full bg-slate-50 p-3 rounded-xl font-bold text-slate-800 mt-1 outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div class="flex-1">
            <label class="text-xs font-bold tracking-wider text-slate-400 uppercase">Height (cm)</label>
            <input v-model="editForm.height" type="number" class="w-full bg-slate-50 p-3 rounded-xl font-bold text-slate-800 mt-1 outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
        </div>

        <div>
          <label class="text-xs font-bold tracking-wider text-slate-400 uppercase">Activity Level</label>
          <select v-model="editForm.activityLevel" class="w-full bg-slate-50 p-3 rounded-xl font-bold text-slate-800 mt-1 outline-none focus:ring-2 focus:ring-blue-400 appearance-none">
            <option>Low</option>
            <option>Moderate</option>
            <option>High</option>
          </select>
        </div>

        <div class="flex gap-3 mt-6 pt-4">
          <button @click="isEditing = false" class="flex-1 py-3 font-bold text-slate-400 bg-slate-50 rounded-xl hover:bg-slate-100">Cancel</button>
          <button @click="saveProfile" class="flex-1 py-3 font-bold text-white bg-blue-500 rounded-xl hover:bg-blue-600 shadow-lg shadow-blue-200">Save</button>
        </div>
      </div>
    </div>

    <div
      class="bg-gradient-to-r
            from-amber-400
            to-yellow-500
            rounded-3xl
            p-6
            text-white
            shadow-xl
            mb-6"
    >
      <div class="flex justify-between items-center">

        <div>
          <p class="text-sm font-bold">
            Reward Points
          </p>

          <h3
            class="text-4xl font-black mt-2"
          >
            {{ rewardPoints }}
          </h3>
        </div>

        <Icon
          name="heroicons:gift-solid"
          class="text-5xl opacity-80"
        />
      </div>
    </div>

    <div
      class="bg-white rounded-3xl p-6
            shadow-xl shadow-slate-200/40
            border border-slate-100
            mb-6"
    >
      <h3
        class="font-extrabold text-slate-800 mb-5"
      >
        Achievements
      </h3>

      <div class="space-y-4">

        <div
          v-if="achievements.includes('first-goal')"
          class="flex items-center gap-3"
        >
          <div
            class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center"
          >
            <Icon
              name="heroicons:check-badge-solid"
              class="text-green-500"
            />
          </div>

          <span
            class="font-bold text-slate-700"
          >
            First Goal Completed
          </span>
        </div>

        <div
          v-if="achievements.includes('ten-goals')"
          class="flex items-center gap-3"
        >
          <div
            class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"
          >
            <Icon
              name="heroicons:trophy-solid"
              class="text-blue-500"
            />
          </div>

          <span
            class="font-bold text-slate-700"
          >
            10 Goals Completed
          </span>
        </div>

        <div
          v-if="achievements.includes('hundred-points')"
          class="flex items-center gap-3"
        >
          <div
            class="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center"
          >
            <Icon
              name="heroicons:gift-solid"
              class="text-yellow-500"
            />
          </div>

          <span
            class="font-bold text-slate-700"
          >
            100 Points Earned
          </span>
        </div>

        <div
          v-if="achievements.includes('seven-day-streak')"
          class="flex items-center gap-3"
        >
          <div
            class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center"
          >
            <Icon
              name="heroicons:fire-solid"
              class="text-orange-500"
            />
          </div>

          <span
            class="font-bold text-slate-700"
          >
            7 Day Streak
          </span>
        </div>

        <div
          v-if="achievements.includes('thirty-day-streak')"
          class="flex items-center gap-3"
        >
          <div
            class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center"
          >
            <Icon
              name="heroicons:bolt-solid"
              class="text-red-500"
            />
          </div>

          <span
            class="font-bold text-slate-700"
          >
            30 Day Streak
          </span>
        </div>

        <div
          v-if="achievements.includes('ten-liters')"
          class="flex items-center gap-3"
        >
          <div
            class="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center"
          >
            <Icon
              name="heroicons:beaker-solid"
              class="text-cyan-500"
            />
          </div>

          <span
            class="font-bold text-slate-700"
          >
            First 10 Liters Logged
          </span>
        </div>

        <div
          v-if="achievements.length === 0"
          class="text-center py-4 text-slate-400"
        >
          No achievements unlocked yet.
        </div>

        </div>
    </div>

    <div
      class="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/40 border border-slate-100 mb-6"
    >
      <h3 class="font-extrabold text-slate-800 mb-5">
        Notifications
      </h3>

      <div class="space-y-5">

        <div class="flex justify-between items-center">
          <div>
            <p class="font-bold text-slate-800">
              Smart Reminders
            </p>

            <p class="text-xs text-slate-400">
              Get hydration reminders.
            </p>
          </div>

          <input
            v-model="smartReminder"
            type="checkbox"
            class="w-5 h-5"
          />
        </div>

        <div class="flex justify-between items-center">
          <div>
            <p class="font-bold text-slate-800">
              Weather Alerts
            </p>

            <p class="text-xs text-slate-400">
              Notify during hot days.
            </p>
          </div>

          <input
            v-model="weatherAlert"
            type="checkbox"
            class="w-5 h-5"
          />
        </div>

        <div class="flex justify-between items-center">
          <div>
            <p class="font-bold text-slate-800">
              Quiet Hours
            </p>

            <p class="text-xs text-slate-400">
              Disable notifications at night.
            </p>
          </div>

          <input
            v-model="quietHours"
            type="checkbox"
            class="w-5 h-5"
          />
        </div>

      </div>
    </div>

    <div
      class="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/40 border border-slate-100 mb-6"
    >
      <h3 class="font-extrabold text-slate-800 mb-5">
        Preferences
      </h3>

      <div class="space-y-4">

        <div class="flex justify-between">
          <span class="text-slate-500">
            Unit
          </span>

          <span class="font-bold text-slate-800">
            Milliliters (ml)
          </span>
        </div>

        <div>

          <!-- <p
            class="text-slate-500 mb-3"
          >
            Theme
          </p>

          <div
            class="flex gap-2"
          >

            <button
              @click="
                theme='light';
                applyTheme()
              "
              :class="
                theme === 'light'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-100'
              "
              class="px-4 py-2 rounded-xl font-bold"
            >
              Light
            </button>

            <button
              @click="
                theme='dark';
                applyTheme()
              "
              :class="
                theme === 'dark'
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100'
              "
              class="px-4 py-2 rounded-xl font-bold"
            >
              Dark
            </button>

          </div> -->

          </div>

      </div>
    </div>

    <div
      class="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/40 border border-slate-100 mb-6"
    >
      <h3 class="font-extrabold text-slate-800 mb-4">
        About
      </h3>

      <p class="text-sm text-slate-500">
        MyH2O Version 2.4.0
      </p>

      <p class="text-xs text-slate-400 mt-2">
        Made with ♥ for your health.
      </p>
    </div>

    <button 
      @click="handleLogout" 
      class="w-full py-5 bg-red-50 rounded-3xl border-2 border-red-200 text-red-500 font-extrabold flex justify-center items-center gap-2 hover:bg-red-50 hover:border-red-200 transition-all shadow-lg shadow-red-100/50"
    >
      <Icon name="heroicons:arrow-right-on-rectangle" class="text-xl" /> Sign Out
    </button>
    
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
})

import { useRouter } from 'vue-router'
import {
  ref,
  computed,
  onMounted,
  watch
} from 'vue'
import { useWaterTracker } from '~/composables/useWaterTracker'

const router = useRouter()

const {
  username,
  weight,
  height,
  activityLevel,
  dailyGoal,
  rewardPoints,
  waterLog,
  achievements,

  theme,
  applyTheme,

  smartReminder,
  weatherAlert,
  quietHours,

  calculateGoal,
  saveData,
  logoutUser,
  loadData
} = useWaterTracker()

const totalWater = computed(() => {
  return waterLog.value.reduce(
    (sum, item) => sum + item.amount,
    0
  )
})

onMounted(() => {
  loadData()
})

const isEditing = ref(false)

watch(
  [
    smartReminder,
    weatherAlert,
    quietHours
  ],
  () => {
    saveData()
  },
  {
    deep: true
  }
)

// Temporary state for the edit form
const editForm = ref({
  username: username.value,
  weight: weight.value,
  height: height.value,
  activityLevel: activityLevel.value
})

const saveProfile = async () => {
  username.value = editForm.value.username
  weight.value = editForm.value.weight
  height.value = editForm.value.height
  activityLevel.value = editForm.value.activityLevel

  await calculateGoal()
  await saveData()

  isEditing.value = false
}

const handleLogout = () => {
  logoutUser()

  router.push('/login')
}
</script>