import { io } from 'socket.io-client';

const socketBaseUrrl = window.origin;

const socket = io(socketBaseUrrl, {
  auth: {
    token: localStorage.getItem("token")
  },
  path: '/socket',
  transports: ["websocket"],
});

export default socket;