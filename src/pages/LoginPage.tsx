import { Link, Navigate } from 'react-router-dom';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';
import { useAuth } from '@/context/AuthContext';

export function LoginPage() {
  const { session } = useAuth();

  if (session) {
    return <Navigate to="/app" replace />;
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to continue to your HYL dashboard."
      footer={
        <p>
          New to HYL?{' '}
          <Link to="/signup" className="font-medium text-primary-400 transition-colors hover:text-primary-300">
            Create an account
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
}
