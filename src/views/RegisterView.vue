<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const name = ref('')
const password = ref('')
const type = ref('patient')
const error = ref('')
const isRegistered = ref(false)

const handleRegister = async () => {
  const result = await authStore.register(
    email.value,
    name.value,
    password.value,
    type.value,
  )
  if (result) {
    isRegistered.value = true
  } else {
    error.value = 'El correo electrónico ya está registrado'
  }
}
const goToHome = () => {
  router.push('/')
}
</script>
<template>
  <div class="register-container">
    <div v-if="isRegistered" class="success-message">
      <h2 class="title">¡Registro exitoso!</h2>
      <p>Tu cuenta ha sido creada correctamente.</p>
      <button @click="goToHome" class="submit-button">
        Ir a la página principal
      </button>
    </div>
    <div class="form-wrapper" v-else>
      <div>
        <h2 class="title">Registro de Paciente</h2>
      </div>

      <form class="form" @submit.prevent="handleRegister">
        <div class="form-group">
          <div>
            <label for="name" class="label">Nombre Completo</label>
            <input
              id="name"
              type="text"
              v-model="name"
              required
              class="input"
            />
          </div>

          <div>
            <label for="email" class="label">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              v-model="email"
              required
              class="input"
            />
          </div>

          <div>
            <label for="password" class="label">Contraseña</label>
            <input
              id="password"
              type="password"
              v-model="password"
              required
              class="input"
            />
          </div>
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <div class="actions">
          <button type="button" @click="router.push('/')" class="link-button">
            ¿Ya tienes cuenta? Inicia sesión
          </button>
          <button type="submit" class="submit-button">Registrarse</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
/* Contenedor */
.register-container {
  background-color: #ffffff; /* bg-white */
  border-radius: 0.5rem; /* rounded-lg */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow */
  width: 60%;
  padding: 2rem;
}

.form-wrapper {
}

.title {
  text-align: center;
  font-size: 1.875rem; /* text-3xl */
  font-weight: bold;
  color: #1f2937; /* text-gray-900 */
  margin-bottom: 1rem;
}

.form {
  margin-top: 2rem; /* mt-8 */
}

.form-group > div {
  margin-bottom: 1rem; /* space-y-4 */
}

.label {
  display: block;
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  color: #374151; /* text-gray-700 */
}

.input {
  margin-top: 0.25rem; /* mt-1 */
  display: block;
  width: 100%;
  border-radius: 0.375rem; /* rounded-md */
  border: 1px solid #d1d5db; /* border-gray-300 */
  padding: 0.5rem; /* px-4 py-2 */
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1); /* shadow-sm */
  font-size: 1rem;
}

.input:focus {
  outline: none;
  border-color: #3b82f6; /* focus:border-blue-500 */
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25); /* focus:ring-blue-500 */
}

.success-message {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

/* Mensajes de error */
.error-message {
  text-align: center;
  color: #ef4444; /* text-red-500 */
  font-size: 0.875rem; /* text-sm */
}

/* Botones */
.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.link-button {
  font-size: 0.875rem; /* text-sm */
  color: #3b82f6; /* text-blue-500 */
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
}

.link-button:hover {
  color: #2563eb; /* hover:text-blue-600 */
}

.submit-button {
  background-color: #3b82f6; /* bg-blue-500 */
  color: white; /* text-white */
  padding: 0.5rem 1rem; /* px-4 py-2 */
  border-radius: 0.375rem; /* rounded */
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button:hover {
  background-color: #2563eb; /* hover:bg-blue-600 */
}
</style>
