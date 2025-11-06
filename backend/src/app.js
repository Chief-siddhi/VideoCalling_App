import express from "express";
import {createServer} from "node:http";

import {Server} from "socket.io";
import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";
import cors from "cors";

// Development ke liye
app.use(cors({
  origin: process.env.NODE_ENV === "production" 
    ? ["https://your-frontend-domain.com"] 
    : ["http://localhost:3000", "http://localhost:3001"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true  // ✅ Agar cookies/auth use kar rahe hain
}));

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000))
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}));

app.use("/api/v1/users", userRoutes);

const start = async()=>{
    const connectionDb = await mongoose.connect("mongodb+srv://siddhisharma060107_db_user:ijWESaEZ1J8retpE@cluster0.nrfkozv.mongodb.net/")

    console.log(`mongodb connected to db host: ${connectionDb.connection.host}`);

    server.listen(app.get("port"),()=>{
        console.log("listen on port 8000");
    });
}

start();