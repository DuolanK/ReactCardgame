import React, { useState, useEffect } from "react";

function ChatRoom({ roomName, username }) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const ws = new WebSocket(`${apiUrl.replace("http", "ws")}/room/ws/${roomName}/${username}`);
    
        ws.onopen = () => console.log("🔌 WebSocket подключен");
        
        ws.onmessage = (event) => {
            // Отладочный лог и обработка сообщения
            console.log("Received message:", event.data); 
            setMessages((prevMessages) => [...prevMessages, event.data]); // Добавление нового сообщения
        };
        
        ws.onclose = () => console.log("❌ WebSocket отключен");
        ws.onerror = (error) => console.error("WebSocket ошибка:", error);

        setSocket(ws);
    
        return () => {
            if (ws) ws.close(); // Закрытие WebSocket при размонтировании компонента
        };
    }, [roomName, username, apiUrl]);

    const handleSendMessage = () => {
        if (message.trim() && socket && socket.readyState === WebSocket.OPEN) {
            socket.send(message); // Отправляем сообщение через WebSocket
            setMessage(""); // Очистка поля ввода
        }
    };

    return (
        <div>
            <h2>Чат комнаты: {roomName}</h2>
            <div>
                <h3>Добро пожаловать, {username}!</h3>
            </div>

            <div style={{ height: "300px", overflowY: "scroll", border: "1px solid #ccc" }}>
                {messages.length === 0 ? (
                    <p>Нет сообщений.</p>
                ) : (
                    messages.map((msg, index) => (
                        <div key={index}>{msg}</div> // Отображение всех сообщений
                    ))
                )}
            </div>

            <div>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Введите сообщение..."
                    style={{ width: "80%", padding: "10px" }}
                />
                <button onClick={handleSendMessage} style={{ padding: "10px", marginLeft: "10px" }}>
                    Отправить
                </button>
            </div>
        </div>
    );
}

export default ChatRoom;