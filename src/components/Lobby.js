import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Lobby() {
    const [rooms, setRooms] = useState([]);
    const [newRoomName, setNewRoomName] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:3000/rooms")
            .then((response) => response.json())
            .then((data) => setRooms(data));
    }, []);

    const createRoom = async () => {
        if (!newRoomName) return;
        const response = await fetch("http://127.0.0.1:3000/rooms", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newRoomName }),
        });
        const room = await response.json();
        setRooms([...rooms, room]);
        setNewRoomName("");
    };

    return (
        <div>
            <h1>Лобби</h1>
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