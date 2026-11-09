import { Link, Navigate } from 'react-router-dom';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { SignupForm } from '@/components/auth/SignupForm';
import { useAuth } from '@/context/AuthContext';

export function SignupPage() {
  const { session } = useAuth();

  if (session) {
    return <Navigate to="/app" replace />;
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Set up your developer profile and start sharing your work."
      footer={
        <p>
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-400 transition-colors hover:text-primary-300">
            Log in
          </Link>
        </p>
      }
    >
      <SignupForm />
    </AuthLayout>
  );
}
