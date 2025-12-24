import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginForm } from '../validators/authValidators';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formError, setFormError] = React.useState<string | null>(null);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginForm) => {
        setFormError(null);
        try {
            const success = await login(data.username, data.password);
            if (success) {
                navigate('/notes');
            }
        } catch (err: any) {
            setFormError(err.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-primary">
            <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-primary mb-2">Welcome Back</h1>
                    <p className="text-dark/70">Login to access your notes</p>
                </div>

                {formError && (
                    <div className="bg-red-50 text-red-500 p-3 rounded text-sm text-center border border-red-100">
                        {formError}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <Input
                        label="Username"
                        placeholder="Enter your username"
                        {...register('username')}
                        error={errors.username?.message}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register('password')}
                        error={errors.password?.message}
                    />

                    <Button type="submit" isLoading={isSubmitting} className="mt-2 w-full justify-center">
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
