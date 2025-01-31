import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

//When you open your React app in two different tabs, 
// the browser loads the app separately in each tab. That means:
// Each tab has its own memory and does not share state with other tabs.
// Each tab runs its own JavaScript code independently.

const server = http.createServer(app); //http.createServer(app) creates a new HTTP server that wraps the app (Express application).
//Instead of app.listen(), we use server.listen() to start the server.
const io = new Server(server, {
  //creates a new WebSocket server and attaches it to the existing HTTP server
  cors: {
    origin: ["http://localhost:5173"],
  },
});

const userSocketMap = {};

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

io.on("connection", (socket) => {
  //Listens for new client connections. socket is unique for each connected client
  //"connection" is a special event triggered when a client connects
  //The callback receives a socket object representing the individual client connection
  console.log("User connected: ", socket.id);

  const userId = socket.handshake.query.userId; //Before a WebSocket connection is established, the client sends an HTTP request (called a handshake) to the server. This handshake can include query parameters, which the server can then use to retrieve information like userId.
  //query refers to query parameters that are sent by the client when establishing a WebSocket connection. These parameters can be used by the server to pass extra information.
  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));    //emit=> send messages (events) from the server to the clients.

  socket.on("disconnect", () => {
    //Listens for when THIS SPECIFIC CLIENT disconnects
    //"disconnect" is a built-in event that automatically triggers when connection is lost
    console.log("user disconnected: ", socket.id);
    delete userSocketMap[userId]; //removes a property(or key) from an object
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    //Objects in JavaScript are key-value pairs
    //userSocketMap is an object that stores which user (by userId) is connected to which socket.
    //Object.keys(userSocketMap) returns only the list of online user IDs.

  });
});

export { io, app, server };
