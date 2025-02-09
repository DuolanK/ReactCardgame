import React, { useState } from "react";

function CreateRoom() {
    const [roomName, setRoomName] = useState("");
    const [creatorId, setCreatorId] = useState("");
    const [isActive, setIsActive] = useState(true);

    const handleCreateRoom = async () => {
        // Приводим creatorId к числу и проверяем, что это корректное значение
        const creatorIdNumber = creatorId ? Number(creatorId) : null;

        if (creatorIdNumber === null || isNaN(creatorIdNumber)) {
            alert("Creator ID должен быть числом!");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/room/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: roomName,
                    creator_id: creatorIdNumber,
                    is_active: isActive,
                }),
            });

            if (response.ok) {
                alert("Room created successfully!");
                // Сброс полей после успешного создания
                setRoomName("");
                setCreatorId("");
                setIsActive(true);
            } else {
                const errorData = await response.json();
                console.error("Server Error:", errorData);
                alert(`Error: ${JSON.stringify(errorData)}`);
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            alert("Error creating room!");
        }
    };

    return (
        <div>
            <h2>Create Room</h2>
            <input
                type="text"
                placeholder="Room Name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Creator ID"
                value={creatorId}
                onChange={(e) => setCreatorId(e.target.value ? Number(e.target.value) : "")}
            />
            <label>
                <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                />
                Active
            </label>
            <button onClick={handleCreateRoom}>Create</button>
        </div>
    );
}

export default CreateRoom;