import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Chat from "./Chat";

function Lobby() {
    const [rooms, setRooms] = useState([]);

    // Пример, как можно получить комнаты (этот код можно настроить по вашему усмотрению)
    useEffect(() => {
        // Симулируем получение списка комнат
        setRooms([
            { id: 1, name: "Room 1" },
            { id: 2, name: "Room 2" },
        ]);
    }, []);

    return (
        <div>
            <h1>Lobby</h1>
            <ul>
                {rooms.map((room) => (
                    <li key={room.id}>
                        <Link to={`/room/${room.id}`}>{room.name}</Link>
                    </li>
                ))}
            </ul>

            {/* Пример отображения чата */}
            <div>
                <h1>WebSocket Chat</h1>
                <Chat roomId={1} /> {/* Укажите ID комнаты */}
            </div>
        </div>
    );
}

export default Lobby;
