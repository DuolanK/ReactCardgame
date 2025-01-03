import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket";

function GameRoom() {
    const { id } = useParams();
    const [state, setState] = useState({});

    useEffect(() => {
        socket.emit("join_room", { roomId: id });

        socket.on("game_state", (newState) => setState(newState));

        return () => {
            socket.emit("leave_room", { roomId: id });
            socket.off("game_state");
        };
    }, [id]);

    return (
        <div>
            <h1>Комната {id}</h1>
            <p>Текущий статус игры:</p>
            <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
    );
}

export default GameRoom;
