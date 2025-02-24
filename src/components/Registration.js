import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Registration({ setIsAuthenticated }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // Loading state
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (!username.trim() || !password.trim()) {
            alert("Пожалуйста, введите имя пользователя и пароль.");
            return;
        }

        setLoading(true); // Set loading state to true

        try {
            const response = await fetch(`${apiUrl}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: username.trim(),  // Используем username как email
                    password: password.trim(),
                    username: username.trim(),  // Дублируем для username
                    is_active: true,
                    is_superuser: false,
                    is_verified: false,
                    role_id: 0,
                }),
            });
    
            const data = await response.json();
            if (response.ok) {
                alert("Регистрация успешна!");
                setIsAuthenticated(true); // Set authenticated status
                navigate("/");
            } else {
                alert(data.detail || "Ошибка регистрации.");
            }
        } catch (error) {
            console.error("Ошибка:", error);
            alert("Ошибка сети.");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading} // Disable input while loading
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading} // Disable input while loading
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Регистрация..." : "Зарегистрироваться"}
                </button>
            </form>
        </div>
    );
}

export default Registration;
