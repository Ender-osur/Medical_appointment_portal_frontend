<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAppointmentStore } from '../stores/appointments'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const AuthStore = useAuthStore()
const AppointmentStore = useAppointmentStore()
const router = useRouter()

const error = ref('')
const appointment = ref({
  id: 0,
  patient_id: 0,
  appoint_date: new Date(),
  appoint_time: new Date(),
  appoint_description: '',
  appoint_state: '',
})
const isAppoitmentCreated = ref(false)
const userName = computed(() => AuthStore.user?.name || '')
const userId = computed(() => AuthStore.user?.id || 0)

const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const formatTime = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}

const submitAppointment = async () => {
  const formattedDate = formatDate(new Date(appointment.value.appoint_date))
  const formattedTime = formatTime(
    new Date(`1970-01-01T${appointment.value.appoint_time}:00`),
  )

  console.log('FECHA Y HORA: ', formattedDate, formattedTime)
  const result = await AppointmentStore.addAppointment(
    userId.value,
    formattedDate,
    formattedTime,
    appointment.value.appoint_description,
  )
  console.log('RESULT', result)
  if (result) {
    isAppoitmentCreated.value = true
  } else {
    error.value = 'Error al agendar cita'
  }
}
const goToHome = () => {
  router.push('/patient')
}
</script>

<template>
  <div class="book-container">
    <div v-if="isAppoitmentCreated" class="success-message">
      <h2 class="title">¡Cita agenada!</h2>
      <p>Tu cita ha sido creada correctamente.</p>
      <button @click="goToHome" class="submit-button">
        Ir al portal paciente
      </button>
    </div>
    <div v-else>
      <h1 class="heading">Agendar Nueva Cita</h1>

      <form @submit.prevent="submitAppointment" class="form-container">
        <div class="form-group">
          <div>
            <label class="label">Nombre del Paciente</label>
            <input v-model="userName" type="text" disabled class="input" />
          </div>

          <div>
            <label class="label">Fecha</label>
            <input
              v-model="appointment.appoint_date"
              type="date"
              required
              class="input"
            />
          </div>

          <div>
            <label class="label">Hora</label>
            <input
              v-model="appointment.appoint_time"
              type="time"
              required
              class="input"
            />
          </div>

          <div>
            <label class="label">Motivo de la Consulta</label>
            <textarea
              v-model="appointment.appoint_description"
              required
              rows="3"
              class="textarea"
            ></textarea>
          </div>

          <div class="action-buttons">
            <div v-if="error" class="error-message">
              {{ error }}
            </div>
            <button
              type="button"
              @click="router.push('/patient')"
              class="cancel-button"
            >
              Cancelar
            </button>
            <button type="submit" class="submit-button">Agendar Cita</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
/* Estilos globales */
.book-container {
  display: flex;
  width: 100%;
  height: min-content;
  flex-direction: column;
  padding-inline: 4rem;
}

.heading {
  font-size: 1.5rem; /* text-2xl */
  font-weight: bold; /* font-bold */
  margin-bottom: 1.5rem; /* mb-6 */
}

.form-container {
  width: 100%;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 1rem; /* space-y-4 */
}

.label {
  display: block;
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  color: #4b5563; /* text-gray-700 */
  margin-bottom: 0.25rem;
}

.input,
.textarea {
  margin-top: 0.25rem; /* mt-1 */
  display: block;
  width: 100%; /* w-full */
  border-radius: 0.375rem; /* rounded-md */
  border: 1px solid #d1d5db; /* border-gray-300 */
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05); /* shadow-sm */
  padding: 0.5rem; /* espacio interno */
  font-size: 1rem;
}

.input:focus,
.textarea:focus {
  outline: none;
  border-color: #3b82f6; /* focus:border-blue-500 */
  box-shadow: 0 0 0 1px #3b82f6; /* focus:ring-blue-500 */
}

.action-buttons {
  display: flex;
  justify-content: flex-end; /* justify-end */
  gap: 0.5rem; /* space-x-2 */
}

.error-message {
  color: #ef4444; /* text-red-500 */
  font-size: 0.875rem; /* text-sm */
  text-align: center;
}

.cancel-button {
  padding: 0.5rem 1rem; /* px-4 py-2 */
  border: 1px solid #d1d5db; /* border-gray-300 */
  border-radius: 0.375rem; /* rounded-md */
  color: #4b5563; /* text-gray-700 */
  background-color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.cancel-button:hover {
  background-color: #f9fafb; /* hover:bg-gray-50 */
}

.submit-button {
  padding: 0.5rem 1rem; /* px-4 py-2 */
  background-color: #3b82f6; /* bg-blue-500 */
  color: white;
  border-radius: 0.375rem; /* rounded-md */
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-button:hover {
  background-color: #2563eb; /* hover:bg-blue-600 */
}
</style>
