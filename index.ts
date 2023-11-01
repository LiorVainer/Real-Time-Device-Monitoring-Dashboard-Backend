import express, { Request, Response } from "express";
import WebSocket from "ws";
import { ALERT_WS_TYPE } from "./models/alert.model";
import { generateRamdomAlert } from "./utils/alert.utils";

const app: express.Application = express();

app.get("/", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/index.html");
});

const wss = new WebSocket.Server({ noServer: true });

wss.on("connection", (ws: WebSocket) => {
  console.log("A user connected");

  const sendRandomAlert = () => {
    const newAlert = generateRamdomAlert();
    ws.send(JSON.stringify({ type: ALERT_WS_TYPE, data: newAlert }));
  };

  const interval: NodeJS.Timeout = setInterval(sendRandomAlert, 3000); // Every 3 seconds

  ws.on("close", () => {
    console.log("User disconnected");
    clearInterval(interval);
  });
});

const server = app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});

server.on("upgrade", (request: Request, socket: any, head: Buffer) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});
