import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const [username, setUsername] = useState<string | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode<any>(token);
            console.log("Logged in as:", decoded.username);
            setUsername(decoded.username);
        }
    }, []);
    return (
        <div className="flex justify-between items-center mb-12">
            <h1 className="text-5xl text-center text-black italic mb-12 fon">
                Quotly
            </h1>
            {
                localStorage.getItem("token") ?
                    <div>
                        <span className="text-gray-700">Hello, {username}</span>
                        <Link to="/profile">
                            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-4">
                                My Profile
                            </button>
                        </Link>
                        <button onClick={() => {
                            localStorage.removeItem("token")
                            navigate("/");
                        }} className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-4">
                            Log Out
                        </button>
                    </div>
                    :
                    <div>
                        <Link to="/login">
                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg ml-4">
                                Login
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-4">
                                Register
                            </button>
                        </Link>
                    </div>
            }
        </div>
    )
}