<template>
    <div
      class="relative bg-gradient-to-b from-sky-200 via-cyan-100 to-blue-200 rounded-3xl min-h-screen overflow-hidden"
    >
      <div
        v-if="!gameStarted"
        class="absolute inset-0 flex flex-col items-center justify-center z-20"
      >
      <Icon
        name="mdi:water"
        class="text-cyan-500 drop-shadow-lg animate-bounce"
        style="font-size:100px"
      />

        <h3
          class="text-3xl font-black text-slate-800"
        >
          Catch The Drop
        </h3>

        <p
          class="text-slate-500 mt-2"
        >
          Tap water drops to earn points
        </p>

        <button
          @click="startGame"
          class="mt-8 px-10 py-4 rounded-2xl bg-blue-500 text-white font-bold shadow-lg"
        >
          START GAME
        </button>
      </div>

      <div
        v-if="gameOver"
        class="absolute inset-0 bg-black/60 flex items-center justify-center z-30"
      >
        <div
          class="bg-white rounded-3xl p-8 text-center w-[260px]"
        >
          <Icon
            name="mdi:trophy"
            class="text-yellow-500 text-7xl mx-auto mb-3"
          />

          <h3
            class="text-3xl font-black text-slate-800"
          >
            Game Over
          </h3>

          <p
            class="mt-3 text-slate-500"
          >
            Score
          </p>

          <h4
            class="text-5xl font-black text-blue-500"
          >
            {{ score }}
          </h4>

          <p
            class="mt-3 font-bold text-green-600"
          >
            +{{ rewardEarned }} Points
          </p>

          <button
            @click="startGame"
            class="mt-6 w-full bg-blue-500 text-white py-3 rounded-2xl font-bold"
          >
            Play Again
          </button>
        </div>
      </div>

      <!-- Wave 1 -->
      <div class="wave wave1"></div>

      <!-- Wave 2 -->
      <div class="wave wave2"></div>

      <!-- Wave 3 -->
      <div class="wave wave3"></div>

      <div class="bubble b1"></div>
      <div class="bubble b2"></div>
      <div class="bubble b3"></div>
      <div class="bubble b4"></div>
      <div class="bubble b5"></div>

      <div
        v-if="gameStarted"
        class="absolute top-4 left-4 right-4 flex justify-between z-10"
      >
      <div
        class="bg-white/90 backdrop-blur rounded-2xl px-4 py-2 shadow-lg font-bold flex items-center gap-2"
      >
        <Icon
          name="mdi:water"
          class="text-cyan-500 text-xl"
        />

        <span>
          {{ score }}
        </span>
      </div>

      <div
        class="bg-white/90 backdrop-blur rounded-2xl px-4 py-2 shadow-lg font-bold flex items-center gap-2"
      >
      <Icon
        name="heroicons:clock-solid"
        :class="
          timeLeft <= 10
            ? 'text-red-500 text-xl animate-pulse'
            : 'text-slate-600 text-xl'
        "
      />

        <span>
          {{ timeLeft }}
        </span>
      </div>
      </div>
  
      <div
        v-for="drop in drops"
        :key="drop.id"
        @click="catchDrop(drop.id)"
        class="absolute cursor-pointer z-20"
        :style="{
            left: drop.x + 'px',
            top: drop.y + 'px'
        }"
        >
        <Icon
          name="mdi:water"
          class="text-cyan-500 text-6xl drop-shadow-lg animate-bounce"
        />
    </div>
  
    </div>
  </template>
  
<script setup>
import { ref } from 'vue'
import { useWaterTracker } from '~/composables/useWaterTracker'

const gameStarted = ref(false)

const gameOver = ref(false)

const rewardEarned = ref(0)

const {
  addRewardPoints
} = useWaterTracker()
  
  const score = ref(0)
  const timeLeft = ref(30)
  
  const drops = ref([])
  
  let gameInterval = null
  let timerInterval = null
  
  const startGame = () => {

    gameStarted.value = true
    gameOver.value = false
    rewardEarned.value = 0
  
    score.value = 0
    timeLeft.value = 30
    drops.value = []
  
    clearInterval(gameInterval)
    clearInterval(timerInterval)
  
    gameInterval = setInterval(() => {
  
      drops.value.push({
        id: Date.now(),
        x: Math.random() * 250,
        y: 80 + Math.random() * 500,
        size: Math.floor(Math.random() * 25) + 50
      })
  
    }, 800)
  
    timerInterval = setInterval(() => {
  
      timeLeft.value--
  
      if (timeLeft.value <= 0) {
  
        clearInterval(gameInterval)
        clearInterval(timerInterval)
  
        let reward = 0

        if (score.value >= 30)
        reward = 5

        else if (score.value >= 20)
        reward = 3

        else if (score.value >= 10)
        reward = 1

        if (reward > 0) {
        addRewardPoints(reward)
        }

        rewardEarned.value = reward

        gameOver.value = true

        gameStarted.value = false
      }
  
    }, 1000)
  }
  
  const catchDrop = (id) => {
  
    score.value++
  
    drops.value =
      drops.value.filter(
        drop => drop.id !== id
      )
  }
  </script>

<style scoped>

.wave {
  position: absolute;

  width: 200%;
  height: 220px;

  left: -50%;

  border-radius: 45%;

  pointer-events: none;
}

.wave1 {
  bottom: -100px;

  background:
    rgba(255,255,255,.18);

  animation:
    waveMove 12s linear infinite;
}

.wave2 {
  bottom: -120px;

  background:
    rgba(255,255,255,.12);

  animation:
    waveMoveReverse 18s linear infinite;
}

.wave3 {
  bottom: -140px;

  background:
    rgba(255,255,255,.08);

  animation:
    waveMove 25s linear infinite;
}

@keyframes waveMove {
  from {
    transform:
      rotate(0deg);
  }

  to {
    transform:
      rotate(360deg);
  }
}

@keyframes waveMoveReverse {
  from {
    transform:
      rotate(360deg);
  }

  to {
    transform:
      rotate(0deg);
  }
}

.drop-shadow-lg {
  filter:
    drop-shadow(
      0 0 15px rgba(6,182,212,.6)
    );
}

.bubble {
  position: absolute;

  border-radius: 9999px;

  background:
    rgba(255,255,255,.35);

  backdrop-filter:
    blur(2px);

  animation:
    bubbleUp linear infinite;
}

.b1 {
  width: 20px;
  height: 20px;

  left: 15%;
  bottom: -20px;

  animation-duration: 10s;
}

.b2 {
  width: 12px;
  height: 12px;

  left: 35%;
  bottom: -20px;

  animation-duration: 8s;
}

.b3 {
  width: 24px;
  height: 24px;

  left: 55%;
  bottom: -20px;

  animation-duration: 12s;
}

.b4 {
  width: 15px;
  height: 15px;

  left: 75%;
  bottom: -20px;

  animation-duration: 7s;
}

.b5 {
  width: 18px;
  height: 18px;

  left: 90%;
  bottom: -20px;

  animation-duration: 11s;
}

@keyframes bubbleUp {
  from {
    transform:
      translateY(0);
    opacity: 0;
  }

  20% {
    opacity: .7;
  }

  100% {
    transform:
      translateY(-700px);
    opacity: 0;
  }
}

</style>