import axios from "axios";

const API_URL = "http://185.121.232.211:3000";

export const joinRoom = async (roomName, username, password) => {
    const response = await fetch("/room/join-room/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            room_name: roomName,
            username: username,
            password: password, // Пароль передается, даже если он пустой
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error joining room!");
    }

    return await response.json(); // Вернет сообщение об успехе
};