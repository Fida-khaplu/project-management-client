"use client"

import { loginSuccess } from "@/lib/features/authSlice";
import { signIn } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { useDispatch } from "react-redux";
// import { loginSuccess } from "@/lib/features/authSlice";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const router = useRouter();

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("clicked", formData);

        try {
            const resp = await signIn(formData);

            console.log(resp, "==============");


            if (resp.success) {
                console.log("Login successful ✅", resp);

                if (resp.success) {
                    console.log("Login successful ✅", resp.user);

                    dispatch(
                        loginSuccess({
                            user: resp.user,   
                        })
                    );

                    router.push("/dashboard")

                }
                
            } else {
                console.error("Login failed ❌", resp);
                setError("Invalid email or password");
            }
        } catch (error) {
            console.error("Error during login:", error);
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
                <h1 className="text-2xl font-bold mb-6 text-black text-center">Login</h1>

                {error && (
                    <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
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

                    {/* Submit */}
                    <button
                        type="submit"
                        // disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                    >
                        {/* {loading ? "Logging in..." : "Login"}
                         */}

                        Login
                    </button>
                </form>

                {/* Signup link */}
                <p className="mt-4 text-sm text-black text-center">
                    Don’t have an account?{" "}
                    <a href="/signup" className="text-blue-600 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;