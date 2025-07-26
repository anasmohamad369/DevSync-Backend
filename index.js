// index.js
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: "*", // replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
  }
});

require('dotenv').config();
const connectDB = require('./config/db');
connectDB();

app.use(require('cors')());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/users', require('./routes/devRoute'));
app.use('/api/chat', require('./routes/chatRoute'));
app.use("/api/team", require('./routes/teamRoute'));

// Sockets
require('./sockets/socket')(io);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
