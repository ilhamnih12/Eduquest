import { Metadata } from 'next';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Masuk - Eduquest RPG SMP',
  description: 'Masuk ke dalam petualangan edukasi Eduquest RPG.',
};

export default function LoginPage() {
  return (
    <div className="py-8 sm:py-12 flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
