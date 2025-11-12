"use client"

import { signIn, signUp } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "",
        role: ""
    })

    const [error, setError] = useState("");

    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("clicked", formData);

        try {
            const resp = await signUp(formData);

            console.log(resp, "==============");


            if (resp.success) {
                console.log("signup successful ✅", resp);
                // Example: redirect to home or dashboard
                router.push("/");
            } else {
                console.error("signup failed ❌", resp);
                setError("Invalid email or password");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            setError("Something went wrong. Please try again!");
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-black text-center">SignUp</h1>

                {error && (
                    <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                        />
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                            Role
                        </label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                        >
                            <option value="">Select a role</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full text-gray-700 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="mt-4 text-sm text-black text-center">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Login in
                    </a>
                </p>
            </div>
        </div>
    );
}

export default SignUp;