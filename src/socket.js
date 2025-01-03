import { io } from "socket.io-client";

const socket = io("http://localhost:8000"); // Подключение к серверу
export default socket;