import React, { useState, useEffect } from "react";

const Chat = ({ roomId }) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Загружаем историю чата
        const fetchHistory = async () => {
            try {
                const response = await fetch(`http://localhost:8000/room/history/${roomId}`);
                const data = await response.json();
                setMessages(data.map(msg => `${msg.user}: ${msg.content}`));
            } catch (error) {
                console.error("Failed to fetch chat history:", error);
            }
        };
        fetchHistory();

        // Подключаем WebSocket
        const ws = new WebSocket(`ws://localhost:8000/ws/${roomId}`);
        setSocket(ws);

        ws.onmessage = (event) => {
            setMessages((prev) => [...prev, event.data]);
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed");
        };

        return () => {
            ws.close();
        };
    }, [roomId]);

    const sendMessage = () => {
        if (socket && inputValue) {
            socket.send(inputValue);
            setMessages((prev) => [...prev, `You: ${inputValue}`]);
            setInputValue("");
        }
    };

    return (
        <div>
            <h2>Room: {roomId}</h2>
            <div style={{ border: "1px solid black", padding: "10px", height: "300px", overflowY: "scroll" }}>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;