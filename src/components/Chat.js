import React, { useState, useEffect } from "react";
import socket from "../socket";

function Chat() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        socket.on("chat_message", (newMessage) => setMessages((prev) => [...prev, newMessage]));

        return () => {
            socket.off("chat_message");
        };
    }, []);

    const sendMessage = () => {
        socket.emit("send_message", message);
        setMessage("");
    };

    return (
        <div>
            <h2>Чат</h2>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Отправить</button>
        </div>
    );
}

export default Chat;