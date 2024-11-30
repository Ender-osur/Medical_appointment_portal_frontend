interface User {
  id: number;
  email: string;
  name: string;
  type: 'patient' | 'doctor';
}

export const loginUser = async (
  email: string,
  password: string
): Promise<User | null> => {
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
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en la solicitud de inicio de sesión');
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al iniciar sesión:', error.message);
    } else {
      console.error('Error desconocido al iniciar sesión');
    }
    return null;
  }
};

export const registerUser = async (
  email: string,
  name: string,
  password: string,
  type: string
): Promise<User | null> => {
  try {
    const response = await fetch('http://localhost:5001/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
        password,
        type,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en la solicitud de registro');
    }

    const data = await response.json();
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Error al registrarse:', err.message);
    } else {
      console.error('Error desconocido al registrarse');
    }
    return null;
  }
};
