"use client";

// import { io } from "socket.io-client";

// export const socket = io("ws://127.0.0.1:8000/ws");
const ws = new WebSocket("ws://127.0.0.1:8000/ws");

ws.onopen = () => {
  console.log("Connected to WebSocket server");
};

ws.onclose = () => {
  console.log("Disconnected from WebSocket server");
};

export { ws };
