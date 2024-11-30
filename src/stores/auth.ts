// src/stores/auth.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { loginUser, registerUser } from '@/services/authService'

interface User {
  id: number
  email: string
  name: string
  type: 'patient' | 'doctor'
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  const isAuthenticated = computed(() => user.value !== null)

  const login = async (email: string, password: string) => {
    const loggedInUser = await loginUser(email, password)
    if (loggedInUser) {
      user.value = loggedInUser
      return true
    }
    return false
  }

  const register = async (
    email: string,
    name: string,
    password: string,
    type: string,
  ) => {
    const newUser = await registerUser(email, name, password, type)
    if (newUser) {
      user.value = newUser;
      return true
    }
    return false
  }

  const logout = () => {
    user.value = null
  }

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
  }
})
