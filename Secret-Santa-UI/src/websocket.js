export const connectWebSocket = (userId, onMessage) => {
    const ws = new WebSocket(`ws://localhost:5001?userId=${userId}`);

    ws.onopen = () => {
        ws.send(JSON.stringify({ type: 'register', userId }));
    };

    ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        onMessage(message);
    };

    ws.onerror = (error) => console.error('WebSocket error:', error);

    return ws;
};
