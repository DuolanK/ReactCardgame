// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Lobby from "./components/Lobby";
import GameRoom from "./components/GameRoom"; // Импортируем GameRoom


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Lobby />} />
                <Route path="/room/:id" element={<GameRoom />} /> {/* Добавляем маршрут для GameRoom */}
            </Routes>
        </Router>
    );
}

export default App;
