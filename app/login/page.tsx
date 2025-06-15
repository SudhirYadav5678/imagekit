"use client";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await signIn("credentials", { email, password, redirect: false });
        if (res?.error) {
            console.error("Login error:", res.error);
            alert("Login failed: " + res.error);
        } else {
            console.log("Login successful");
            router.push('/');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-6">
                    <button
                        onClick={() => signIn("google")}
                        className="w-full flex items-center justify-center border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition duration-200"
                    >
                        <img
                            src="/google-icon.svg"
                            alt="Google"
                            className="w-5 h-5 mr-2"
                        />
                        Login with Google
                    </button>
                </div>
                <div className="mt-4 text-center text-sm text-gray-600">
                    Don’t have an account?{' '}
                    <a href="/register" className="text-blue-600 hover:underline">
                        Register here
                    </a>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
