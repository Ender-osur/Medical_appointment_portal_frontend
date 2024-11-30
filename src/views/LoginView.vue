<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const type = ref<'patient' | 'doctor'>('patient')

onMounted(() => {
  const queryRole = route.query.type as 'patient' | 'doctor'
  if (queryRole === 'patient' || queryRole === 'doctor') {
    type.value = queryRole
  }
})

const handleLogin = async () => {
  const result = await authStore.login(email.value, password.value);
  if (result) {
    if (authStore.user?.type === 'patient') {
      router.push('/patient');
    } else if (authStore.user?.type === 'doctor') {
      router.push('/doctor');
    }
  } else {
    error.value = 'Credenciales incorrectas';
  }
}
</script>


<template>
    <div class="login-container">
      <div>
        <h2 class="title">
          Iniciar Sesión como {{ type === 'patient' ? 'Paciente' : 'Médico' }}
        </h2>
      </div>

      <form class="form" @submit.prevent="handleLogin">
        <div class="form-group">
          <div>
            <label for="email" class="label">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              v-model="email"
              required
              class="input"
            />
          </div>

          <div>
            <label for="password" class="label">
              Contraseña
            </label>
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
          <button
            v-if="type === 'patient'"
            type="button"
            @click="router.push('/register')"
            class="register-link"
          >
            ¿No tienes cuenta? Regístrate
          </button>
          <button
            type="submit"
            class="submit-button"
          >
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
</template>

<style>


.login-container {
  width: 60%;
  padding: 2rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
  display: flex;
  flex-direction: column;
  gap: 2rem; /* space-y-8 */
}

/* Título */
.title {
  text-align: center;
  font-size: 1.8rem;
  font-weight: bold;
  color: #1f2937;
}

/* Formulario */
.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem; /* space-y-6 */
  width: 100%;
  padding-inline: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 1rem; /* space-y-4 */
  width: 100%;
}

.label {
  display: block;
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  color: #374151; /* text-gray-700 */
  width: 100%;
}

.input {
  margin-top: 0.25rem; /* mt-1 */
  width: 100%; /* w-full */
  padding: 0.5rem; /* shadow-sm */
  border: 1px solid #d1d5db; /* border-gray-300 */
  border-radius: 0.375rem; /* rounded-md */
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05); /* shadow-sm */
  transition: border-color 0.2s, box-shadow 0.2s;

}

.input:focus {
  border-color: #3b82f6; /* focus:border-blue-500 */
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); /* focus:ring-blue-500 */
}

/* Mensaje de error */
.error-message {
  color: #ef4444; /* text-red-500 */
  font-size: 0.875rem; /* text-sm */
  text-align: center; /* text-center */
}

/* Acciones */
.actions {
  display: flex;
  align-items: center; /* items-center */
  justify-content: space-between; /* justify-between */
}

.register-link {
  font-size: 0.875rem; /* text-sm */
  color: #3b82f6; /* text-blue-500 */
  transition: color 0.2s;
}

.register-link:hover {
  color: #2563eb; /* hover:text-blue-600 */
}

.submit-button {
  background-color: #3b82f6; /* bg-blue-500 */
  color: white; /* text-white */
  padding: 0.5rem 1rem; /* px-4 py-2 */
  border-radius: 0.375rem; /* rounded */
  transition: background-color 0.2s;
}

.submit-button:hover {
  background-color: #2563eb; /* hover:bg-blue-600 */
}
</style>
