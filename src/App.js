import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import CreateRoom from "./components/CreateRoom";
import JoinRoom from "./components/JoinRoom";
import ChatRoom from "./components/Chat";
import Registration from "./components/Registration";
import Login from "./components/Login";
import LogoutButton from "./components/LogoutButton";

function App() {
    const [roomName, setRoomName] = useState("");
    const [username, setUsername] = useState("");
    const [inChat, setInChat] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("access_token"); // Проверяем access_token
        setIsAuthenticated(!!token); // Если токен есть, значит пользователь авторизован
    }, []);

    return (
        <Router>
            <div>
                {!isAuthenticated ? (
                    <div>
                        <h2>Регистрация</h2>
                        <Registration setIsAuthenticated={setIsAuthenticated} />
                        <h2>Вход</h2>
                        <Login setIsAuthenticated={setIsAuthenticated} />
                    </div>
                ) : (
                    <div>
                        <LogoutButton setIsAuthenticated={setIsAuthenticated} />
                        <Routes>
                            <Route path="/join" element={<JoinRoom setRoomName={setRoomName} setUsername={setUsername} setInChat={setInChat} />} />
                            <Route path="/chat" element={<ChatRoom roomName={roomName} username={username} />} />
                        </Routes>
                    </div>
                )}
            </div>
        </Router>
    );
}

export default App;