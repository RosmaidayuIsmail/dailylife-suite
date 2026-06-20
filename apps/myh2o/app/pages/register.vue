<template>
    <div class="h-full overflow-y-auto bg-slate-50 p-8">
  
      <h1 class="text-3xl font-extrabold text-center mb-2">
        Create Account
      </h1>
  
      <p class="text-slate-500 text-center mb-8">
        Set up your hydration profile
      </p>
  
      <div class="space-y-4">
  
        <input
          v-model="accountUsername"
          placeholder="Username"
          class="w-full p-4 rounded-2xl border"
        />
  
        <input
          v-model="accountPassword"
          type="password"
          placeholder="Password"
          class="w-full p-4 rounded-2xl border"
        />

        <input
          v-model="email"
          type="email"
          placeholder="Email Address"
          class="w-full p-4 rounded-2xl border"
        />
  
        <input
          v-model="fullName"
          placeholder="Full Name"
          class="w-full p-4 rounded-2xl border"
        />
  
        <input
          v-model="weight"
          type="number"
          placeholder="Weight (kg)"
          class="w-full p-4 rounded-2xl border"
        />
  
        <input
          v-model="height"
          type="number"
          placeholder="Height (cm)"
          class="w-full p-4 rounded-2xl border"
        />
  
        <select
          v-model="activityLevel"
          class="w-full p-4 rounded-2xl border"
        >
          <option value="">Select Activity Level</option>
          <option>Low</option>
          <option>Moderate</option>
          <option>High</option>
        </select>
  
        <div
          v-if="activityLevel"
          class="bg-blue-50 p-4 rounded-2xl"
        >
          <p class="text-sm text-slate-500">
            Daily Goal
          </p>
  
          <h3 class="text-2xl font-extrabold text-blue-600">
            {{ estimatedGoal }} ml
          </h3>
        </div>
  
        <button
          @click="register"
          class="w-full bg-blue-500 text-white py-4 rounded-2xl font-bold"
        >
          Create Account
        </button>
  
      </div>
  
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const accountUsername = ref('')
  const accountPassword = ref('')
  const fullName = ref('')
  const email = ref('')
  
  const weight = ref('')
  const height = ref('')
  const activityLevel = ref('')
  
  const estimatedGoal = computed(() => {
    let base = Number(weight.value || 0) * 33
  
    if (activityLevel.value === 'Moderate')
      base += 400
  
    if (activityLevel.value === 'High')
      base += 800
  
    return Math.round(base / 50) * 50
  })
  
  const register = () => {
  const account = {
    username: accountUsername.value,
    password: accountPassword.value,
    email: email.value,
    name: fullName.value,
    weight: Number(weight.value),
    height: Number(height.value),
    activityLevel: activityLevel.value,
    dailyGoal: estimatedGoal.value
  }

  localStorage.setItem(
    `user-${account.username.toLowerCase()}`,
    JSON.stringify(account)
  )

  alert('Account created successfully!')
  router.push('/login')
}
  </script>