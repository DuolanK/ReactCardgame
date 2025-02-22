import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuthenticated }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (!username.trim() || !password.trim()) {
            alert("Пожалуйста, введите логин и пароль.");
            return;
        }

        setLoading(true); // Start loading

        try {
            const response = await fetch(`${apiUrl}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    grant_type: "password",
                    username: username.trim(),
                    password: password.trim(),
                    scope: "",
                    client_id: "",
                    client_secret: ""
                }),
            });

            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem("token", data.access_token);
                alert("Вход выполнен!");
                setIsAuthenticated(true); // Set authentication status
                navigate("/join"); // Redirect to rooms page
            } else {
                alert(data.detail || "Ошибка входа.");
            }
        } catch (error) {
            console.error("Ошибка:", error);
            alert("Ошибка сети.");
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading} // Disable input during loading
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading} // Disable input during loading
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Загрузка..." : "Войти"}
                </button>
            </form>
        </div>
    );
}

export default Login;