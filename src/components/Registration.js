import React, { useState } from "react";

function Registration({ setIsAuthenticated }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: username.trim(),  // Используем username как email
                    password: password.trim(),
                    username: username.trim(),  // Дублируем для username
                    is_active: true,
                    is_superuser: false,
                    is_verified: false,
                    role_id: 0
                }),
            });
    
            const data = await response.json();
            if (response.ok) {
                alert("Регистрация успешна!");
            } else {
                alert(data.detail || "Ошибка регистрации.");
            }
        } catch (error) {
            console.error("Ошибка:", error);
            alert("Ошибка сети.");
        }
    };

    return (
        <div>
            <input type="text" placeholder="Имя пользователя" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Зарегистрироваться</button>
        </div>
    );
}

export default Registration;
