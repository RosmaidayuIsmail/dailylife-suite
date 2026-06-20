<template>
  <div class="h-full flex flex-col justify-center px-8 bg-slate-50">

    <h1 class="text-3xl font-extrabold text-center mb-2">
      Sign In
    </h1>

    <p class="text-slate-500 text-center mb-10">
      Welcome back to MyH2O
    </p>

    <div class="space-y-4">

      <input
        v-model="username"
        placeholder="Username"
        class="w-full p-4 rounded-2xl border"
      />

      <div class="relative">

      <input
        v-model="password"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Password"
        class="w-full p-4 rounded-2xl border"
      />

      <button
        type="button"
        @click="showPassword = !showPassword"
        class="absolute right-4 top-1/2 -translate-y-1/2"
      >
        <Icon
          :name="
            showPassword
              ? 'heroicons:eye-slash-solid'
              : 'heroicons:eye-solid'
          "
          class="text-slate-500 text-xl"
        />
      </button>

      </div>

      <p
        class="text-right text-sm text-blue-500 font-medium cursor-pointer"
        @click="forgotPassword"
      >
        Forgot Password?
      </p>

      <button
        @click="login"
        class="w-full bg-blue-500 text-white py-4 rounded-2xl font-bold"
      >
        Sign In
      </button>

      <button
        @click="router.push('/register')"
        class="w-full bg-white border py-4 rounded-2xl font-bold"
      >
        Create Account
      </button>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const password = ref('')
const showPassword = ref(false)

const login = () => {
  const saved = localStorage.getItem(
    `user-${username.value.toLowerCase()}`
  )

  if (!saved) {
    alert('User not found')
    return
  }

  const user = JSON.parse(saved)

  if (user.password !== password.value) {
    alert('Invalid password')
    return
  }

  localStorage.setItem(
    'loggedIn',
    'true'
  )

  localStorage.setItem(
    'currentUser',
    username.value.toLowerCase()
  )

  const profileKey =
  `hydration-profile-${username.value.toLowerCase()}`

  const existingProfile =
    localStorage.getItem(profileKey)

  if (!existingProfile) {
    localStorage.setItem(
      profileKey,
      JSON.stringify({
        username: user.name,
        weight: user.weight,
        height: user.height,
        activityLevel: user.activityLevel,
        dailyGoal: user.dailyGoal,

        currentIntake: 0,
        waterLog: [],
        streak: 0,

        rewardPoints: 0,
        rewardedDates: [],
        achievements: [],

        smartReminder: true,
        weatherAlert: true,
        quietHours: false
      })
    )
  }

  router.push('/app')
}

const forgotPassword = () => {

const saved = localStorage.getItem(
  `user-${username.value.toLowerCase()}`
)

if (!saved) {
  alert('Please enter your username first')
  return
}

const user = JSON.parse(saved)

alert(
  `Password recovery email would be sent to:\n${
    user.email || 'No email registered'
  }`
)
}
</script>