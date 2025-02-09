import React, { useState } from "react";

function ChatRoom({ roomName, username }) {
    const [message, setMessage] = useState(""); // Состояние для текущего сообщения
    const [messages, setMessages] = useState([]); // Состояние для списка сообщений

    // Обработчик отправки сообщения
    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage = {
                user: username,
                text: message,
                time: new Date().toLocaleTimeString(),
            };
            setMessages([...messages, newMessage]); // Добавляем новое сообщение в список
            setMessage(""); // Очищаем поле ввода
        }
    };

    return (
        <div>
            <h2>Чат комнаты: {roomName}</h2>
            <div>
                <h3>Добро пожаловать, {username}!</h3>
            </div>

            {/* Список сообщений */}
            <div style={{ height: "300px", overflowY: "scroll", border: "1px solid #ccc" }}>
                {messages.length === 0 ? (
                    <p>Нет сообщений.</p>
                ) : (
                    messages.map((msg, index) => (
                        <div key={index}>
                            <strong>{msg.user}</strong>: {msg.text} <span>({msg.time})</span>
                        </div>
                    ))
                )}
            </div>

            {/* Поле ввода и кнопка отправки */}
            <div>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)} // Обновляем состояние при вводе
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