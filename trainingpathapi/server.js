/* const express = require("express");
const app = express();
const { PORT } = require("./src/config");

// Init middlaware
app.use(express.json({ extended: false }));

app.listen(PORT, () => {
    console.log(`server running ${PORT}`);
}); */

const container = require("./src/startup/container");
const server = container.resolve("app");
const { MONGO_URI } = container.resolve("config");

const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

console.log("uri " + MONGO_URI);
mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("db connected");
        server.start();
    })
    .catch(console.log);