import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  scheduleAppointment,
  approveAppointment,
  getAppointmentById,
  getAppointments,
} from '@/services/appointmentService'

interface Appointment {
  id: number
  patient_id: number
  doctor_id: number
  appoint_date: string
  appoint_time: string
  appoint_description: string
  appoint_state: string
}

export const useAppointmentStore = defineStore('appointments', () => {
  const appointments = ref<Appointment[]>([])

  const handleError = (mensaje: string, error: unknown) => {
    console.error(mensaje, error)
  }

  const addAppointment = async (
    patient_id: number,
    appoint_date: string,
    appoint_time: string,
    appoint_description: string,
  ): Promise<boolean> => {
    try {
      const newAppointment = await scheduleAppointment(
        patient_id,
        appoint_date,
        appoint_time,
        appoint_description,
      )

      if (newAppointment) {
        appointments.value.push(newAppointment)
        return true
      }
      return false
    } catch (error) {
      handleError('Error al agregar cita:', error)
      return false
    }
  }

  const approveAppoint = async (id: number): Promise<boolean> => {
    try {
      const approvedAppointment = await approveAppointment(id)
      if (approvedAppointment) {
        const index = appointments.value.findIndex(appt => appt.id === id)
        if (index !== -1) {
          appointments.value[index] = {
            ...appointments.value[index],
            ...approvedAppointment,
          }
        }
        return true
      }
      return false
    } catch (error) {
      handleError('Error al aprobar cita:', error)
      return false
    }
  }

  /**
   * Obtiene una cita específica por el ID del paciente.
   */
  const getAppointById = async (
    patient_id: number,
  ): Promise<Appointment[] | null> => {
    try {
      const appointmentsById = await getAppointmentById(patient_id) // Devuelve un arreglo de citas
      if (appointmentsById && appointmentsById.length > 0) {
        // Itera sobre las citas y verifica si ya existen en el estado local
        appointmentsById.forEach(appointment => {
          const exists = appointments.value.some(
            appt => appt.id === appointment.id,
          ) // Verifica por ID
          if (!exists) {
            appointments.value.push(appointment) // Agrega solo si no existe
          }
        })

        return appointmentsById // Retorna todas las citas encontradas
      } else {
        console.warn('No se encontraron citas para el paciente')
        return null
      }
    } catch (error) {
      handleError('Error al obtener las citas por ID:', error)
      return null
    }
  }

  /**
   * Obtiene todas las citas del sistema.
   */
  const getAllAppointments = async (
    email: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const fetchedAppointments = await getAppointments(email, password)
      if (fetchedAppointments) {
        appointments.value = fetchedAppointments
        return true
      }
      return false
    } catch (error) {
      handleError('Error al obtener todas las citas:', error)
      return false
    }
  }

  return {
    appointments,
    addAppointment,
    approveAppoint,
    getAppointById,
    getAllAppointments,
  }
})
