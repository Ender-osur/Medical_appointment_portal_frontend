<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/appNavbar.vue'
</script>

<template>
  <div class="app">
    <Navbar />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>

.app {
  height: 100dvh;
  background: linear-gradient(to bottom right, #8bb0c9, #c3daf8);
}

.main-content {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(194, 215, 247);
  height: 90%;
}
</style>
