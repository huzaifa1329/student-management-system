const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB } = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", studentRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Student Management Backend API"
    });
});

connectDB()
    .then(() => {
        console.log("Database connected successfully");

        if (require.main === module) {
            app.listen(process.env.PORT || 5000, () => {
                console.log(
                    `Server running on port ${process.env.PORT || 5000}`
                );
            });
        }
    })
    .catch((err) => {
        console.log("Database connection failed:", err);
    });

module.exports = app;