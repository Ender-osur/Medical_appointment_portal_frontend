<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const isAuthenticated = computed(() => authStore.isAuthenticated)

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <nav v-if="isAuthenticated" class="navbar">
    <div class="navbar-content">
      <div class="links">
        <div v-if="authStore.user?.type === 'patient'" class="nav-link">
          Portal Paciente
        </div>
        <div v-if="authStore.user?.type === 'doctor'" class="nav-link">
          Portal Médico
        </div>
      </div>
      <div class="user-actions">
        <span class="username">{{ authStore.user?.name }}</span>
        <button @click="handleLogout" class="logout-button">
          Cerrar Sesión
        </button>
      </div>
    </div>
  </nav>
</template>

<style>
.navbar {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  height: 8%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.navbar-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}

.links {
  display: flex;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
  transition:
    color 0.3s,
    border-color 0.3s;
}

.nav-link.active {
  border-color: #3b82f6;
  color: #1f2937;
}

.nav-link:hover {
  color: #374151;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.username {
  color: #374151;
  font-size: 1rem;
}

.logout-button {
  color: #6b7280;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: color 0.3s;
}

.logout-button:hover {
  color: #374151;
}
</style>
