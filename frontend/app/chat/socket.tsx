// import { io } from "socket.io-client";

// export const socket = io("ws://127.0.0.1:8000/ws");
const ws = new WebSocket("ws://127.0.0.1:8000/ws");

ws.onopen = () => {
  console.log("Connected to WebSocket server");
  document.getElementById("myToast")?.classList.remove("hidden");

  setTimeout(function () {
    document.getElementById("myToast")?.classList.add("hidden");
  }, 5000);
};

ws.onclose = () => {
  console.log("Disconnected from WebSocket server");
};

export { ws };
