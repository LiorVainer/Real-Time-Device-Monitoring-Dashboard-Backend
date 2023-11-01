import express, { Request, Response } from "express";
import WebSocket from "ws";

const app: express.Application = express();

app.get("/", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/index.html");
});

const wss = new WebSocket.Server({ noServer: true });

wss.on("connection", (ws: WebSocket) => {
  console.log("A user connected");

  const sendRandomEvent = () => {
    const randomEvent: number = Math.floor(Math.random() * 100);
    ws.send(JSON.stringify({ type: "randomEvent", data: randomEvent }));
  };

  const interval: NodeJS.Timeout = setInterval(sendRandomEvent, 3000); // Every 3 seconds

  ws.on("close", () => {
    console.log("User disconnected");
    clearInterval(interval);
  });
});

const server = app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

server.on("upgrade", (request: Request, socket: any, head: Buffer) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});
