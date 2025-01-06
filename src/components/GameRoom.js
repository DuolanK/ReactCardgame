import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Chat from "./Chat"; // Импортируем Chat

function GameRoom() {
    const { id } = useParams();
    const [gameState, setGameState] = useState(null);
    const [players, setPlayers] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Создаем WebSocket-соединение
        const ws = new WebSocket(`ws://localhost:8000/ws/${id}`);

        // Устанавливаем сокет в состояние компонента
        setSocket(ws);

        // Обрабатываем сообщения от сервера
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            // Обновляем состояние игры или игроков в зависимости от типа сообщения
            if (data.type === "game_state") {
                setGameState(data.state);
            } else if (data.type === "players_update") {
                setPlayers(data.players);
            }
        };

        // Очистка при размонтировании компонента
        return () => {
            ws.close();
        };
    }, [id]);

    // Обработка события, когда игрок присоединяется или покидает комнату
    const sendMessage = (type, payload) => {
        if (socket) {
            socket.send(JSON.stringify({ type, ...payload }));
        }
    };

    useEffect(() => {
        if (socket) {
            // Сообщаем серверу, что игрок присоединился к комнате
            sendMessage("join_room", { roomId: id });

            return () => {
                // Сообщаем серверу, что игрок покидает комнату
                sendMessage("leave_room", { roomId: id });
            };
        }
    }, [socket, id]);

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
