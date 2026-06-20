<template>
    <div class="p-8 animate-fade-in space-y-7">
      <h2 class="text-3xl font-bold text-gray-800 mb-8 tracking-tight">Reminders</h2>

      <div
        class="bg-blue-50 rounded-3xl p-5 border border-blue-100 mb-8"
      >
        <div class="flex items-center gap-4">

          <div
            class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center"
          >
            <Icon
              name="heroicons:bell-solid"
              class="text-blue-500 text-xl"
            />
          </div>

          <div>
            <h3 class="font-bold text-slate-800">
              {{ activeCount }} Active Reminders
            </h3>

            <p class="text-sm text-slate-500">
              Stay on track with your hydration goals.
            </p>
          </div>

        </div>
      </div>
  
      <button
        @click="showModal = true"
        class="w-full bg-blue-100 text-blue-600 font-bold py-5 rounded-2xl mb-10 flex items-center justify-center gap-3 hover:bg-blue-200 transition-all transform hover:scale-[1.02] shadow-sm"
      >
        <Icon
          name="heroicons:plus-circle-solid"
          class="text-2xl"
        />
        New Alarm
      </button>

      <div
        class="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-3xl p-5 border border-cyan-100"
      >
        <div class="flex items-center gap-4">

          <div
            class="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center"
          >
            <Icon
              name="heroicons:sparkles-solid"
              class="text-cyan-500"
            />
          </div>

          <div>
            <h3 class="font-bold text-slate-800">
              Smart Reminder
            </h3>

            <p class="text-sm text-slate-500">
              Based on today's weather, drink an extra
              200ml this afternoon.
            </p>
          </div>

        </div>
      </div>
  
      <div class="space-y-5">

        <div
          class="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex justify-between items-center"
        >
          <div class="flex items-center gap-5">

            <div
              class="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center"
            >
              <Icon
                name="heroicons:sun-solid"
                class="text-yellow-500 text-3xl"
              />
            </div>

            <div>
              <h3
                class="font-bold text-gray-800 text-xl"
              >
                08:00 AM
              </h3>

              <p
                class="text-gray-400"
              >
                Morning Hydration
              </p>
            </div>

          </div>

          <button
            @click="r1 = !r1"
            :class="r1 ? 'bg-green-400' : 'bg-gray-200'"
            class="w-14 h-8 rounded-full relative"
          >
            <div
              :class="r1 ? 'translate-x-6' : 'translate-x-0'"
              class="w-7 h-7 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform"
            />
          </button>

        </div>
      </div>

      <div
        v-for="reminder in customReminders"
        :key="reminder.id"
        class="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex justify-between items-center mt-4"
      >
        <div class="flex items-center gap-5">

          <div
            class="w-14 h-14 rounded-full bg-cyan-100 flex items-center justify-center"
          >
            <Icon
              :name="reminder.icon"
              class="text-cyan-500 text-2xl"
            />
          </div>

          <div>
            <h3
              class="font-bold text-gray-800 text-xl"
            >
              {{ reminder.time }}
            </h3>

            <p
              class="text-gray-400"
            >
              {{ reminder.title }}
            </p>
          </div>

        </div>

        <div class="flex items-center gap-3">

          <button
            @click="deleteReminder(reminder.id)"
            class="text-red-500"
          >
            <Icon
              name="heroicons:trash-solid"
              class="text-xl"
            />
          </button>

          <button
            @click="reminder.enabled = !reminder.enabled"
            :class="reminder.enabled ? 'bg-green-400' : 'bg-gray-200'"
            class="w-14 h-8 rounded-full relative"
          >
            <div
              :class="reminder.enabled ? 'translate-x-6' : 'translate-x-0'"
              class="w-7 h-7 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform"
            />
          </button>

        </div>

      </div>

      <Teleport to="body">

      <div
        v-if="showModal"
        class="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-6"
      >

        <div
          class="bg-white rounded-3xl p-6 w-full max-w-sm"
        >

          <h3
            class="text-xl font-bold text-slate-800 mb-5"
          >
            New Reminder
          </h3>

          <div class="space-y-4">

            <input
              v-model="reminderForm.title"
              placeholder="Reminder Name"
              class="w-full border rounded-xl px-4 py-3"
            />

            <input
              v-model="reminderForm.time"
              type="time"
              class="w-full border rounded-xl px-4 py-3"
            />

            <select
              v-model="reminderForm.icon"
              class="w-full border rounded-xl px-4 py-3"
            >
              <option value="heroicons:beaker-solid">
                Water
              </option>

              <option value="heroicons:sun-solid">
                Morning
              </option>

              <option value="heroicons:moon-solid">
                Night
              </option>

              <option value="heroicons:briefcase-solid">
                Work
              </option>
            </select>

          </div>

          <div class="flex gap-3 mt-6">

            <button
              @click="showModal = false"
              class="flex-1 bg-slate-100 py-3 rounded-xl font-bold"
            >
              Cancel
            </button>

            <button
              @click="saveReminder"
              class="flex-1 bg-blue-500 text-white py-3 rounded-xl font-bold"
            >
              Save
            </button>

          </div>

        </div>

      </div>

      </Teleport>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
  middleware: ['auth']
})

  import { ref, computed, onMounted, watch } from 'vue'
  import { useWaterTracker } from '~/composables/useWaterTracker'

  const { loadData } = useWaterTracker()

  onMounted(() => {
  loadData()
})

  const showModal = ref(false)

  const customReminders = ref([])

  const reminderForm = ref({
    title: '',
    time: '',
    enabled: true,
    icon: 'heroicons:beaker-solid'
  })

  const saveReminder = () => {
  if (!reminderForm.value.title)
    return

  if (!reminderForm.value.time)
    return

  customReminders.value.push({
    id: Date.now(),
    title: reminderForm.value.title,
    time: reminderForm.value.time,
    enabled: true,
    icon: reminderForm.value.icon
  })

  reminderForm.value = {
    title: '',
    time: '',
    enabled: true,
    icon: 'heroicons:beaker-solid'
  }

  showModal.value = false
}

const r1 = ref(false)
const r2 = ref(false)

onMounted(async () => {
  const saved = localStorage.getItem('water-reminders')

  if (saved) {
    customReminders.value = JSON.parse(saved)
  }

  try {
    const data = await $fetch('/api/reminders')

    r1.value = data.morning
    r2.value = data.afternoon
  }
  catch (error) {
    console.error(error)
  }
})

watch(customReminders, () => {
  localStorage.setItem(
    'water-reminders',
    JSON.stringify(customReminders.value)
  )
}, { deep: true })

const activeCount = computed(() => {
  const defaults =
    [r1.value, r2.value].filter(Boolean).length

  const customs =
    customReminders.value.filter(
      reminder => reminder.enabled
    ).length

  return defaults + customs
})

const deleteReminder = (id) => {
  customReminders.value =
    customReminders.value.filter(
      reminder => reminder.id !== id
    )
}

  watch([r1, r2], async () => {
    try {
      await $fetch('/api/reminders', {
        method: 'POST',
        body: {
          morning: r1.value,
          afternoon: r2.value
        }
      })
    } catch (error) {
      console.error(error)
    }
  })
  </script>