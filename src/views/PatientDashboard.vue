<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAppointmentStore } from '../stores/appointments'
import { useAuthStore } from '@/stores/auth'

const AppointmentStore = useAppointmentStore()
const AuthStore = useAuthStore()
const { appointments } = storeToRefs(AppointmentStore)
const router = useRouter()


const userId = computed(() => AuthStore.user?.id || 0)

const formatDate = (date: string | Date): string => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const loadAppointmentById = async () => {
  console.log('Cargando citas para el usuario:', userId.value) // Log para verificar el ID

  if (userId.value !== 0) {
    const fetchedAppointment = await AppointmentStore.getAppointById(
      userId.value,
    )
    console.log('Citas obtenidas del store:', fetchedAppointment) // Log para revisar los datos
    if (fetchedAppointment) {
      appointments.value = Array.isArray(fetchedAppointment)
        ? fetchedAppointment
        : [fetchedAppointment]
    }
  } else {
    console.error('El usuario no tiene ID válido')
  }

  console.log('Citas en appointments.value:', appointments) // Log final
}

onMounted(() => {
  loadAppointmentById()
})
</script>

<template>
  <div class="patient-container">
    <div class="header">
      <h1 class="title">Mis Citas</h1>
      <button @click="router.push('/book')" class="button">
        Agendar Nueva Cita
      </button>
    </div>

    <div class="card">
      <div v-if="appointments.length === 0" class="empty-message">
        No tienes citas programadas
      </div>
      <div v-else class="appointment-list">
        <div
          v-for="appointment in appointments"
          :key="appointment.patient_id"
          class="appointment-item"
        >
          <div class="appointment-details">
            <div>
              <p class="appointment-date-time">
                Fecha y hora: {{ formatDate(appointment.appoint_date) }} / {{ appointment.appoint_time }}
              </p>
              <p class="appointment-description">
                Descripción: {{ appointment.appoint_description }}
              </p>
            </div>
            <span
              :class="{
                'badge-pending': appointment.appoint_state === 'pending',
                'badge-approved': appointment.appoint_state === 'approve',
              }"
              class="badge"
            >
              {{ appointment.appoint_state }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Contenedor principal */
.patient-container {
  width: 80%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 1.5rem; /* text-2xl */
  font-weight: bold; /* font-bold */
}

.button {
  background-color: #3b82f6; /* bg-blue-500 */
  color: white; /* text-white */
  padding: 0.5rem 1rem; /* px-4 py-2 */
  border-radius: 0.375rem; /* rounded */
  transition: background-color 0.2s;
  border: none;
  cursor: pointer;
}

.button:hover {
  background-color: #2563eb; /* hover:bg-blue-600 */
}

/* Tarjeta */
.card {
  background-color: white; /* bg-white */
  border-radius: 0.5rem; /* rounded-lg */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow */
  overflow: hidden;
}

.empty-message {
  text-align: center;
  color: #6b7280; /* text-gray-500 */
}

/* Lista de citas */
.appointment-list {
  border-top: 1px solid #e5e7eb; /* divide-y */

}

.appointment-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb; /* divide-y */
}

.appointment-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.appointment-date-time {
  font-weight: 600; /* font-semibold */
}

.appointment-description {
  color: #6b7280; /* text-gray-600 */
}

.badge {
  border-radius: 9999px; /* rounded-full */
  font-size: 0.875rem; /* text-sm */
}

.badge-pending {
  background-color: #fef3c7; /* bg-yellow-100 */
  color: #92400e; /* text-yellow-800 */
}

.badge-approved {
  background-color: #d1fae5; /* bg-green-100 */
  color: #065f46; /* text-green-800 */
}
</style>
