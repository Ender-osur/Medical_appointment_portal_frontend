<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const loginAs = (type: string) => {
  router.push({ path: `/login`, query: { type } })
}
</script>

<template>
  <div class="landing-container">
    <div class="header">
      <h1 class="title">Sistema de Citas Médicas</h1>
      <p class="subtitle">
        Gestiona tus citas médicas de manera fácil y eficiente
      </p>

      <div class="button-groups">
        <div class="button-pair">
          <button @click="loginAs('doctor')" class="button-doctor">
            Acceso Médicos
          </button>
          <button @click="loginAs('patient')" class="button-patient">
            Acceso Pacientes
          </button>
        </div>
        <div>
          <button @click="router.push('/register')" class="button-register">
            Registrarse como Paciente
          </button>
        </div>
      </div>
    </div>

    <div class="cards">
      <div class="card">
        <h3 class="card-title">Para Pacientes</h3>
        <ul class="card-list">
          <li>✓ Agenda citas fácilmente</li>
          <li>✓ Ver historial de citas</li>
          <li>✓ Recibe confirmaciones</li>
        </ul>
      </div>

      <div class="card">
        <h3 class="card-title">Para Médicos</h3>
        <ul class="card-list">
          <li>✓ Gestiona tu agenda</li>
          <li>✓ Confirma citas</li>
          <li>✓ Ver información del paciente</li>
        </ul>
      </div>

      <div class="card">
        <h3 class="card-title">Beneficios</h3>
        <ul class="card-list">
          <li>✓ Sistema seguro</li>
          <li>✓ Fácil de usar</li>
          <li>✓ Disponible 24/7</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
.landing-container {
  width: 100dvw;
}

.header {
  text-align: center;
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 2.25rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.25rem;
  color: #4b5563;
  margin-bottom: 2rem;
}

/* Grupos de botones */
button {
  cursor: pointer;
}

.button-groups {
  display: flex;
  flex-direction: column; /* space-y-4 */
  align-items: center;
  gap: 1rem;
}

.button-pair {
  display: flex; /* space-x-4 */
  gap: 1rem;
}

.button-doctor {
  background-color: #2563eb; /* bg-blue-600 */
  color: white; /* text-white */
  padding: 0.75rem 1.5rem; /* px-6 py-3 */
  border-radius: 0.5rem; /* rounded-lg */
  transition: background-color 0.2s ease;
}

.button-doctor:hover {
  background-color: #1d4ed8; /* hover:bg-blue-700 */
}

.button-patient {
  background-color: #3b82f6; /* bg-blue-500 */
  color: white; /* text-white */
  padding: 0.75rem 1.5rem; /* px-6 py-3 */
  border-radius: 0.5rem; /* rounded-lg */
  transition: background-color 0.2s ease;
}

.button-patient:hover {
  background-color: #2563eb; /* hover:bg-blue-600 */
}

.button-register {
  background-color: white; /* bg-white */
  color: #3b82f6; /* text-blue-500 */
  padding: 0.75rem 1.5rem; /* px-6 py-3 */
  border: 1px solid #3b82f6; /* border-blue-500 */
  border-radius: 0.5rem; /* rounded-lg */
  transition: background-color 0.2s ease;
}

.button-register:hover {
  background-color: #f0f9ff; /* hover:bg-blue-50 */
}

/* Tarjetas */
.cards {
  display: grid; /* grid */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding-inline: 2rem;
}

.card {
  background-color: white; /* bg-white */
  padding: 1.5rem; /* p-6 */
  border-radius: 0.5rem; /* rounded-lg */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow-md */
}

.card-title {
  font-size: 1.25rem; /* text-xl */
  font-weight: 600; /* font-semibold */
  margin-bottom: 1rem; /* mb-4 */
}

.card-list {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #4b5563; /* text-gray-600 */
}

.card-list li {
  margin-bottom: 0.5rem; /* space-y-2 */
}

.card-list li:last-child {
  margin-bottom: 0;
}
</style>
