// src/components/GameRoom.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket";
import Chat from "./Chat"; // Импортируем Chat

function GameRoom() {
    const { id } = useParams();
    const [gameState, setGameState] = useState(null);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        socket.emit("join_room", { roomId: id });

        socket.on("game_state", (newState) => setGameState(newState));
        socket.on("players_update", (newPlayers) => setPlayers(newPlayers));

        return () => {
            socket.emit("leave_room", { roomId: id });
            socket.off("game_state");
            socket.off("players_update");
        };
    }, [id]);

    return (
        <div>
            <h1>Комната {id}</h1>
            {gameState ? (
                <div>
                    <h2>Текущий статус игры:</h2>
                    <pre>{JSON.stringify(gameState, null, 2)}</pre>
                </div>
            ) : (
                <p>Загрузка игры...</p>
            )}

            <h3>Игроки:</h3>
            <ul>
                {players.map((player, index) => (
                    <li key={index}>{player.name}</li>
                ))}
            </ul>

            {/* Вставляем компонент чата */}
            <Chat roomId={id} />
        </div>
    );
}

export default GameRoom;
