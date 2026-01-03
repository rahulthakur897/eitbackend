import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import routes from "./routes/index.js";
dotenv.config();
import db from "./config/database.js";

const app = express();
const port = 5050;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
  origin: [process.env.CLIENT_URL, process.env.ADMIN_URL], // React app origin
  credentials: true, // Allow credentials (cookies) to be sent
}));

app.get("/", (req, res) => {
  res.send("Congratulations! API is working!");
});

//application route
db.query("SELECT 1").then(() => {
  console.log("db connected");
  app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
    app.use("/api", routes);
  });
}).catch((err) => {
  console.log("db connection failed \n", err);
});

app.listen(port, () => console.log(`App listening on port: ${port}`));

export default app;
