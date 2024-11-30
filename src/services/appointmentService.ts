interface Appointment {
  id: number
  patient_id: number
  doctor_id: number
  appoint_date: string
  appoint_time: string
  appoint_description: string
  appoint_state: string
}

export const scheduleAppointment = async (
  patient_id: number,
  appoint_date: string,
  appoint_time: string,
  appoint_description: string,
): Promise<Appointment | null> => {
  try {
    const response = await fetch('http://localhost:5001/citas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patient_id,
        appoint_date,
        appoint_time,
        appoint_description,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.message || 'Error en la solicitud de creación de cita',
      )
    }

    return await response.json()
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al crear cita:', error.message)
    } else {
      console.error('Error desconocido al crear cita')
    }
    return null
  }
}

export const approveAppointment = async (
  id: number,
): Promise<Appointment | null> => {
  try {
    const response = await fetch(`http://localhost:5001/citas/${id}/aprobar`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al aprobar la cita')
    }

    const data = await response.json()
    return data
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Error al aprobar cita:', err.message)
    } else {
      console.error('Error desconocido al aprobar cita')
    }
    return null
  }
}
export const getAppointmentById = async (
  patient_id: number,
): Promise<Appointment[] | null> => { // Devuelve una lista de citas
  try {
    const response = await fetch(`http://localhost:5001/citas?patient_id=${patient_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al solicitar citas');
    }

    const data = await response.json();
    console.log('Respuesta del servidor:', data); // Aquí ves la respuesta en consola
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al solicitar citas:', error.message);
    } else {
      console.error('Error desconocido al solicitar citas');
    }
    return null;
  }
};


export const getAppointments = async (
  email: string,
  password: string,
): Promise<Appointment[] | null> => {
  try {
    const response = await fetch('http://localhost:5001/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.message || 'Error al solicitar citas',
      )
    }

    return await response.json()
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al solicitar citas:', error.message)
    } else {
      console.error('Error desconocido al solicitar citas')
    }
    return null
  }
}
