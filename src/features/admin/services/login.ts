interface LoginPayload {
  email: string;
  password: string;
}

export async function login(payload: LoginPayload) {
  // TODO: CALL LOGIN HERE
  const response = await fetch('/api/admin/auth/sign-in/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Login failed');
  }

  return data;
}

