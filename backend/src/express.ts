import express from "express";
import indexRoute from "./routes/index.route";
import cors from "cors";
import cookieParser from "cookie-parser";
import compress from "compression";
import helmet from "helmet";
const app = express();

// middlewares
app.use(express.json());
//express json with url encoded
app.use(express.urlencoded({ extended: true }));
app.use(cors()); //nunca te olvides de poner esto, si es que vas a usar las api de otro lado, osea de otro dominio o proxy

//routes
app.use("/", indexRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
