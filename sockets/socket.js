// sockets/chatSocket.js
const Chat = require("../models/Chat");

let userCount = 0;

module.exports = (io) => {
  io.on("connection", (socket) => {
    userCount++;
    io.emit("userCount", userCount); // broadcast count

    socket.on("chatMessage", async (data) => {
      try {
        const saved = await Chat.create(data);
        console.log("Message saved:", saved);
        io.emit("chatMessage", saved); // send back saved message with timestamp
      } catch (err) {
        console.error("❌ Failed to save chat message:", err.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
      userCount--;
      io.emit("userCount", userCount);
    });
  });
};
