<template>
    <div class="h-full flex flex-col justify-center items-center px-8 bg-slate-50">
  
      <div
        class="w-28 h-28 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center mb-8"
      >
        <Icon
          name="heroicons:beaker-solid"
          class="text-white text-5xl"
        />
      </div>
  
      <h1
        class="text-4xl font-extrabold text-slate-800 text-center"
      >
        Welcome to MyH2O
      </h1>
  
      <p
        class="text-slate-500 text-center mt-4 leading-relaxed"
      >
        Track your hydration, build healthy habits,
        and stay refreshed every day.
      </p>
  
      <div class="w-full mt-12 space-y-4">
  
        <button
          @click="goLogin"
          class="w-full bg-blue-500 text-white py-4 rounded-3xl font-bold"
        >
          Sign In
        </button>
  
        <button
          @click="goRegister"
          class="w-full bg-white border border-slate-200 text-slate-800 py-4 rounded-3xl font-bold"
        >
          Create Account
        </button>
  
      </div>
  
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const goLogin = () => {
    router.push('/login')
  }
  
  const goRegister = () => {
    router.push('/register')
  }
  </script>