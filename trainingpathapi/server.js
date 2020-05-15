const express = require("express");
const app = express();
const { PORT } = require("./config");

// Init middlaware
app.use(express.json({ extended: false }));

app.listen(PORT, () => {
    console.log(`server running ${PORT}`);
});