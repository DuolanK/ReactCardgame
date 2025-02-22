import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ Правильный импорт



function JoinRoom({ setRoomName, setUsername, setInChat }) {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState("");
    const [usernameInput, setUsernameInput] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch(`${apiUrl}/room`);
                const data = await response.json();
                setRooms(data);
            } catch (error) {
                console.error("Ошибка загрузки комнат:", error);
            }
        };
        fetchRooms();
    }, [apiUrl]);

    const handleJoinRoom = async () => {
        if (!selectedRoom || !usernameInput || !password) {
            alert("Введите имя, выберите комнату и введите пароль.");
            return;
        }
        
        // Декодируем токен и получаем user_id
        const token = localStorage.getItem("token");
        let userId = null;
        if (token) {
            const decoded = jwtDecode(token);
            userId = decoded.sub;
        }
    
        if (!userId) {
            alert("Ошибка: невозможно получить user_id.");
            return;
        }
    
        try {
            const response = await fetch(`${apiUrl}/room/join-room/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    room_name: selectedRoom,
                    user_id: userId,
                    password
                }),
            });
    
            if (response.ok) {
                setRoomName(selectedRoom);
                setUsername(usernameInput);
                setInChat(true);
                navigate("/chat");
            } else {
                const errorData = await response.json();
                alert(errorData.detail || "Ошибка входа в комнату");
            }
        } catch (error) {
            console.error("Ошибка входа в комнату:", error);
        }
    };

    const handleCreateRoom = async () => {
        const newRoomName = prompt("Введите название новой комнаты:");
        if (!newRoomName) return;

        const roomPassword = prompt("Введите пароль для комнаты:");
        if (!roomPassword) return;

        try {
            const response = await fetch(`${apiUrl}/room/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: newRoomName,
                    creator_id: 1, // замените на реальный ID
                    is_active: true,
                    password: roomPassword
                }),
            });

            if (response.ok) {
                alert("Комната успешно создана!");
                setRooms([...rooms, { id: rooms.length + 1, name: newRoomName }]);
            } else {
                const errorData = await response.json();
                alert(`Ошибка: ${errorData.detail || "Неизвестная ошибка"}`);
            }
        } catch (error) {
            console.error("Ошибка создания комнаты:", error);
        }
    };

    return (
        <div>
            <h2>Присоединиться к комнате</h2>
            <input
                type="text"
                placeholder="Введите ваше имя"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
            />
            <select onChange={(e) => setSelectedRoom(e.target.value)} value={selectedRoom}>
                <option value="">Выберите комнату</option>
                {rooms.map((room) => (
                    <option key={room.id} value={room.name}>{room.name}</option>
                ))}
            </select>
            <input
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleJoinRoom}>Присоединиться</button>
            <button onClick={handleCreateRoom}>Создать комнату</button>
        </div>
    );
}

export default JoinRoom;