<template>
    <div class="p-6">
      <h1
        class="text-3xl font-black mb-6"
      >
        Achievements
      </h1>
  
      <div
        class="space-y-4"
      >
  
        <div
          v-for="item in achievementList"
          :key="item.id"
          class="bg-white rounded-3xl p-5 shadow-lg flex items-center gap-4"
        >
          <div
            class="text-4xl"
          >
            {{ item.icon }}
          </div>
  
          <div>
            <h3
              class="font-bold"
            >
              {{ item.title }}
            </h3>
  
            <p
              class="text-sm text-slate-500"
            >
              {{ item.description }}
            </p>
          </div>
        </div>
  
      </div>
    </div>
  </template>
  
  <script setup>
  import { useWaterTracker } from '~/composables/useWaterTracker'
  
  const {
    achievements
  } = useWaterTracker()
  
  const achievementList = [
    {
      id: 'first-goal',
      icon: '💧',
      title: 'First Goal',
      description: 'Reach hydration goal once'
    },
    {
      id: 'ten-goals',
      icon: '🏆',
      title: '10 Goals',
      description: 'Complete 10 hydration goals'
    },
    {
      id: 'hundred-points',
      icon: '⭐',
      title: '100 Points',
      description: 'Earn 100 reward points'
    }
  ].filter(
    item =>
      achievements.value.includes(item.id)
  )
  </script>