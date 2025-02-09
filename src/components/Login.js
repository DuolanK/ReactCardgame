import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuthenticated }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Получаем navigate

    const handleLogin = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/auth/login", {
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
                localStorage.setItem("access_token", data.access_token);
                alert("Вход выполнен!");
                setIsAuthenticated(true); // Устанавливаем статус авторизации
                navigate("/join"); // Перенаправляем на страницу с комнатами
            } else {
                alert(data.detail || "Ошибка входа.");
            }
        } catch (error) {
            console.error("Ошибка:", error);
            alert("Ошибка сети.");
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Логин"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Войти</button>
        </div>
    );
}

export default Login;