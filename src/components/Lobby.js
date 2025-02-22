import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Lobby() {
    const [rooms, setRooms] = useState([]);
    const [newRoomName, setNewRoomName] = useState("");
    const [error, setError] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;
    

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch(`${apiUrl}/rooms`);
                if (!response.ok) {
                    throw new Error("Ошибка загрузки комнат");
                }
                const data = await response.json();
                setRooms(data);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchRooms();
    }, [apiUrl]); // Add apiUrl to the dependency array

    const createRoom = async () => {
        if (!newRoomName) return;

        try {
            const response = await fetch(`${apiUrl}/rooms`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newRoomName }),
            });

            if (!response.ok) {
                throw new Error("Ошибка создания комнаты");
            }

            const room = await response.json();
            setRooms((prevRooms) => [...prevRooms, room]);
            setNewRoomName("");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h1>Лобби</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {rooms.map((room) => (
                    <li key={room.id}>
                        <Link to={`/room/${room.id}`}>{room.name}</Link> ({room.participants} участников)
                    </li>
                ))}
            </ul>
            <input
                type="text"
                placeholder="Название комнаты"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
            />
            <button onClick={createRoom}>Создать комнату</button>
        </div>
    );
}

export default Lobby;
