import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();
const port = 5050;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Congratulations! API is working!");
});

app.use("/api", routes);

app.listen(port, () => console.log(`App listening on port: ${port}`));

export default app;
