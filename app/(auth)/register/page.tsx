import { Metadata } from 'next';
import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Daftar Akun Baru - Eduquest RPG SMP',
  description: 'Daftar akun pahlawan baru di Eduquest RPG dan dapatkan bonus perlengkapan pemula.',
};

export default function RegisterPage() {
  return (
    <div className="py-8 sm:py-12 flex items-center justify-center">
      <RegisterForm />
    </div>
  );
}
