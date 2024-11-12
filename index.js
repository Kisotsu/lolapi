import { Socket } from "socket.io";
import express from "express";
import path, { format } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
const expressServer = app.listen(PORT, () =>
  console.log(`serwer dział - http://localhost:${PORT}`)
);
