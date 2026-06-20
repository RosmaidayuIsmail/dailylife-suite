<template>
  <div class="h-full w-full flex flex-col items-center justify-center p-8 relative bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-700 overflow-hidden shadow-2xl">

    <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

    <div class="w-36 h-36 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-10 shadow-[0_0_40px_rgba(255,255,255,0.2)] border border-white/30 relative z-10">
      <Icon name="heroicons:stop-circle" class="text-7xl text-white rotate-45 rounded-tl-full" style="clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%); border-radius: 50% 50% 50% 0;" />
    </div>

    <h1 class="text-5xl font-extrabold text-white mb-5 tracking-tight drop-shadow-md z-10">MyH2O</h1>
    <p class="text-blue-100 text-center text-lg mb-16 max-w-xs leading-relaxed font-semibold z-10">
      Unlock energy and focus through consistent, beautiful hydration.
    </p>

    <button 
      @click="goToLogin"
      class="w-full bg-white text-blue-600 font-extrabold py-5 rounded-3xl shadow-xl shadow-blue-900/20 active:scale-95 hover:scale-[1.02] transition-all flex justify-center items-center gap-3 absolute bottom-12 max-w-[calc(100%-4rem)] z-10"
    >
      Get Started <Icon name="heroicons:arrow-right-solid" class="text-xl" />
    </button>

  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = async () => {
  try {
    const account = await $fetch('/api/account')

    if (account.username) {
      await router.push('/login')
      return
    }

    await router.push('/register')
  } catch (error) {
    console.error(error)

    await router.push('/register')
  }
}

onMounted(async () => {
  setTimeout(async () => {
    try {
      const session = await $fetch('/api/session')

      if (session.loggedIn) {
        await router.replace('/app')
      } else {
        await router.replace('/welcome')
      }
    } catch (error) {
      console.error(error)

      await router.replace('/welcome')
    }
  }, 2000)
})
</script>