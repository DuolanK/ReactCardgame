import React, { useState, useEffect } from "react";

const Chat = ({ roomId }) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Подключение к WebSocket серверу
        const ws = new WebSocket(`ws://127.0.0.1:8000/ws/${roomId}`);
        setSocket(ws);

        // Слушаем события от сервера
        ws.onmessage = (event) => {
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed");
        };

        return () => {
            ws.close();  // Закрываем соединение при размонтировании компонента
        };
    }, [roomId]);

    const sendMessage = () => {
        if (socket && inputValue) {
            socket.send(inputValue);  // Отправляем сообщение на сервер
            setMessages((prevMessages) => [...prevMessages, `You: ${inputValue}`]);
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
