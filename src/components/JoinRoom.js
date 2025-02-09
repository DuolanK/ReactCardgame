import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function JoinRoom({ setRoomName, setUsername, setInChat }) {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState("");
    const [usernameInput, setUsernameInput] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Здесь можно использовать fetch для получения списка всех комнат с вашего сервера
        const fetchRooms = async () => {
            const response = await fetch("http://127.0.0.1:8000/room");  // Ваш URL для получения списка комнат
            const data = await response.json();
            setRooms(data);
        };
        fetchRooms();
    }, []);

    const handleJoinRoom = () => {
        if (selectedRoom && usernameInput) {
            setRoomName(selectedRoom);
            setUsername(usernameInput);
            setInChat(true);
            navigate("/chat"); // Переход к чату
        } else {
            alert("Пожалуйста, выберите комнату и введите имя.");
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
                    <option key={room.id} value={room.name}>
                        {room.name}
                    </option>
                ))}
            </select>
            <button onClick={handleJoinRoom}>Присоединиться</button>
        </div>
    );
}

export default JoinRoom;