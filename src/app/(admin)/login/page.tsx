'use client';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import TextSlideshow from '@/features/admin/components/TextSlideshow';
import { useLogin } from '@/features/admin/hooks/useLogin';
import Image from 'next/image';

export default function LoginPage() {
  const {
    email,
    password,
    error,
    loading,
    setEmail,
    setPassword,
    handleSubmit,
  } = useLogin();

  return (
    <>
      <header className="flex h-[10vh] w-screen items-center gap-5 px-5">
        <div className="relative aspect-square h-15">
          <Image priority fill src='/assets/shared/logos/logo-himasisfo.webp' alt={''} />
        </div>
        <p className="text-2xl font-bold">DASHBOARD</p>
      </header>
      <div className='grid grid-cols-12 *:col-span-6 h-[90vh]'>
        <section className="flex items-center justify-center">
          <form
            className="w-[60%] p-10"
            onSubmit={handleSubmit}
          >
            <FieldSet className="flex h-full flex-col items-center justify-around">
              <FieldLegend>
                <p className="text-xl font-semibold">Selamat Datang,</p>
                <p className='text-sm font-light'>Sistem Dashboard Himasisfo</p>
              </FieldLegend>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email" className="text-base font-semibold">
                    Email
                  </FieldLabel>
                  <Input
                    placeholder='admin123@upnyk.ac.id'
                    className="bg-[#F2F2F2] border border-[#DFDFDF] h-15 px-4 py-3 rounded-lg placeholder-[#B9B9B9]"
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password" className="text-base font-semibold">
                    Password
                  </FieldLabel>
                  <Input
                    placeholder='●●●●●●●●'
                    className="bg-[#F2F2F2] border border-[#DFDFDF] h-15 px-4 py-3 rounded-lg placeholder-[#B9B9B9]"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Field>
              </FieldGroup>

              {error && (
                <p className="text-sm text-[#FF5449] text-center">
                  {error}
                </p>
              )}

              <Button type="submit" className="bg-[#3385FF] h-12 px-8 py-2 text-base font-medium w-full">
                {loading ? '...' : 'Login'}
              </Button>
            </FieldSet>
          </form>
        </section>
        <section className='flex flex-col items-center gap-30 justify-center'>
          <TextSlideshow />
          <div className='flex flex-col text-center'>
            <p className='text-md font-semibold'>Himpunan Sistem Informasi</p>
            <p className='text-sm text-[#1B3C53]/70'>UPN Veteran Yogyakarta</p>
          </div>
        </section>
      </div>
    </>
  );
}