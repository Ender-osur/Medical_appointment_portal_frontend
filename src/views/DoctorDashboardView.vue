<script setup lang="ts">
import { useAppointmentStore } from '../stores/appointments'
import { storeToRefs } from 'pinia'

const store = useAppointmentStore()
const { appointments } = storeToRefs(store)

const updateStatus = (id: number) => {
  store.approveAppoint(id)
}
</script>
<template>
  <div class="doctor-container">
    <h1 class="heading">Panel del Doctor</h1>

    <div class="card">
      <div v-if="appointments.length === 0" class="empty-message">
        No hay citas pendientes
      </div>
      <div v-else class="appointment-list">
        <div
          v-for="appointment in appointments"
          :key="appointment.id"
          class="appointment-item"
        >
          <div class="appointment-content">
            <div>
              <p class="appointment-details">
                {{ appointment.appoint_date }} - {{ appointment.appoint_time }}
              </p>
              <p class="appointment-details">
                Motivo: {{ appointment.appoint_description }}
              </p>
            </div>
            <div class="appointment-actions">
              <button
                v-if="appointment.appoint_state === 'pending'"
                @click="updateStatus(appointment.id)"
                class="confirm-button"
              >
                Confirmar
              </button>
              <span
                v-else
                :class="{
                  'confirmed-status': appointment.appoint_state === 'confirmed',
                }"
                class="status-badge"
              >
                {{ appointment.appoint_state }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Título */
.heading {
  font-size: 1.5rem; /* text-2xl */
  font-weight: bold; /* font-bold */
  margin-bottom: 1.5rem; /* mb-6 */
}

/* Contenedor principal */
.doctor-container {
  width: 80%;
}

.card {
  background-color: #ffffff; /* bg-white */
  border-radius: 0.5rem; /* rounded-lg */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* shadow */
}

/* Mensaje vacío */
.empty-message {
  padding: 1rem; /* p-4 */
  text-align: center; /* text-center */
  color: #6b7280; /* text-gray-500 */
  font-size: 1rem;
}

/* Lista de citas */
.appointment-list {
  border-top: 1px solid #e5e7eb; /* divide-y */
  width: 100%;
  display: flex;
  flex-direction: column;
}

.appointment-item {
  padding: 1rem; /* p-4 */
  border-bottom: 1px solid #e5e7eb; /* divide-y */
}

/* Contenido de la cita */
.appointment-content {
  display: flex;
  justify-content: space-between; /* justify-between */
  align-items: center; /* items-center */
  width: 100%;
}

.patient-name {
  font-weight: 600; /* font-semibold */
}

.appointment-details {
  color: #6b7280; /* text-gray-600 */
}

/* Acciones */
.appointment-actions {
  display: flex;
  gap: 0.5rem; /* space-x-2 */
}

.confirm-button {
  background-color: #10b981; /* bg-green-500 */
  color: white; /* text-white */
  padding: 0.25rem 0.75rem; /* px-3 py-1 */
  border-radius: 0.375rem; /* rounded */
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.confirm-button:hover {
  background-color: #059669; /* hover:bg-green-600 */
}

.cancel-button {
  background-color: #ef4444; /* bg-red-500 */
  color: white; /* text-white */
  padding: 0.25rem 0.75rem; /* px-3 py-1 */
  border-radius: 0.375rem; /* rounded */
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.cancel-button:hover {
  background-color: #dc2626; /* hover:bg-red-600 */
}

/* Estado de cita */
.status-badge {
  padding: 0.25rem 0.75rem; /* px-3 py-1 */
  border-radius: 9999px; /* rounded-full */
  font-size: 0.875rem;
  display: inline-block;
}

.confirmed-status {
  background-color: #d1fae5; /* bg-green-100 */
  color: #065f46; /* text-green-800 */
}

.cancelled-status {
  background-color: #fee2e2; /* bg-red-100 */
  color: #7f1d1d; /* text-red-800 */
}
</style>
