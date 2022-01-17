import express, { Request, Response, NextFunction } from "express";
import indexRoute from "./routes/index.route";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import config from "./config/config";
import template from "./template";
import cors from "cors";
import cookieParser from "cookie-parser";
import compress from "compression";
import helmet from "helmet";
import mongoose from "mongoose";
const app = express();
const { mongoUri } = config;
// database connection
mongoose.Promise = global.Promise;
mongoose.connect(mongoUri);
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});
// middlewares
app.use(express.json());
//express json with url encoded
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // read cookies (needed for auth)
app.use(compress()); // compresses response bodies for all requests
app.use(helmet()); // helps you secure your Express apps by setting various HTTP headers
app.use(cors()); //nunca te olvides de poner esto, si es que vas a usar las api de otro lado, osea de otro dominio o proxy
// sending the template
app.get("/", (req, res) => {
  res.status(200).send(template());
});
//routes
app.use("/", indexRoute);
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.name === "UnauthorizedError")
    // this is the error name when express-jwt fails to authenticate a token
    return res.status(401).json({ error: err.name + ": " + err.message });
  else if (err) {
    // if the error is not an unauthorized error, we send the error
    console.log(err);
    return res.status(400).json({ error: err.name + ": " + err.message });
  }
});
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

export default app;
