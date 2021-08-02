const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const userRoute = require("../api/routes/users")
const authRoute = require("../api/routes/auth")
const postRoute = require("../api/routes/posts")

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true,  useUnifiedTopology: true }, () => {
    console.log("Connected to MongoDB")
});

// Middlewares

app.use(express.json());
app.use(helmet());
app.use(morgan("common"))

app.get("/", (req, res) => {
    res.send("welcome to homepage")
})

app.get("/users", (req, res) => {
    res.send("welcome to user's page")
})

// Routes

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)

// Listen

app.listen(8800, ()=> {
    console.log("Backend server is running")
});