require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/auth"));

app.get("/", (req, res) => {
    res.status(200).json({ msg: "At index" });
});

app.listen(PORT, () => {
    console.log(`Live @ http://localhost:${PORT}`);
});