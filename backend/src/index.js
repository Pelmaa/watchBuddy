const express = require("express");
const cors = require("cors");
const connectMongoDB = require("./db/mongo.db");
const authRoutes = require("./routes/auth.route");
const moviesRoutes = require("./routes/movie.route");

const app = express();
connectMongoDB();

const PORT = 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/movies", moviesRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send(`server is running`);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
