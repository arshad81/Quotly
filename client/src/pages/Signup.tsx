import axios from "axios";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSignup = async () => {
        console.log("Signing up with", username, password);
        try {
            const res = await axios.post("https://quotly.onrender.com/api/auth/register", {
                username,
                password,
            });
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                alert("Signup successful!");
                navigate("/");

            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert("Signup failed. Please try again.");
        }

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
                <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
                    Sign Up
                </h1>
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <button
                        onClick={() => handleSignup()}
                        className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}
