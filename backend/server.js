require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { clerkMiddleware } = require("@clerk/express");

require("./config/mongodb");

const webhookRouter = require("./routes/webhookRoutes");
const userRouter = require("./routes/userRoutes");
const imageRouter = require('./routes/imageRoutes')

const app = express();

app.use(cors());
app.use(clerkMiddleware());
// Clerk Webhooks ONLY
app.use(
    "/api/webhooks",
    express.raw({ type: "application/json" }),
    webhookRouter
);

// Normal APIs
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT} 🚀`);
});