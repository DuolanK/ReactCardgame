import React from "react";

function LogoutButton({ setIsAuthenticated }) {
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        alert("Вы вышли из системы!");
    };

    return <button onClick={handleLogout}>Выйти</button>;
}

export default LogoutButton;