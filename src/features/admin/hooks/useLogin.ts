'use client'
import { FormEvent, startTransition, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInAction } from '@/features/admin/services/auth';

export function useLogin() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await signInAction(formData);

      if (!result.success) {
        setError(result.message);
        return;
      }
      setLoading(false);
      router.push('/admin');
    });
  };

  return {
    email,
    password,
    error,
    loading,
    setEmail,
    handleSubmit,
    setPassword,
  };
}
