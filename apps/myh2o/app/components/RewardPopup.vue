<template>

    <transition name="fade">
  
      <div
        v-if="show"
        class="fixed top-8 left-1/2 -translate-x-1/2 z-[9999]"
      >
  
        <div
          class="bg-white rounded-3xl shadow-2xl px-5 py-4 flex items-center gap-3 border border-slate-100"
        >
  
          <div
            class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center"
          >
            <Icon
              :name="icon"
              class="text-2xl text-blue-500"
            />
          </div>
  
          <div>
  
            <h4
              class="font-extrabold text-slate-800"
            >
              {{ title }}
            </h4>
  
            <p
              class="text-sm text-slate-500"
            >
              {{ message }}
            </p>
  
          </div>
  
        </div>
  
      </div>
  
    </transition>
  
  </template>
  
  <script setup>
  
  defineProps({
    show: Boolean,
    title: String,
    message: String,
    icon: String
  })
  
  </script>