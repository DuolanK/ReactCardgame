import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import socket from "../socket";

function Lobby() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        socket.emit("get_rooms");
        socket.on("rooms_list", (data) => setRooms(data));

        return () => {
            socket.off("rooms_list");
        };
    }, []);

    return (
        <div>
            <h1>Лобби</h1>
            <ul>
                {rooms.map((room) => (
                    <li key={room.id}>
                        <Link to={`/room/${room.id}`}>{room.name}</Link>
                    </li>
                ))}
            </ul>
            <button onClick={() => socket.emit("create_room", { name: "New Room" })}>
                Создать комнату
            </button>
        </div>
    );
}

export default Lobby;