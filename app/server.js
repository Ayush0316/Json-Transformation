// const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = require("./app");

dotenv.config({path: "./config.env"});

// const DB = "mongodb://127.0.0.1:27017/jsonDB"
// mongoose.set('strictQuery', false);
// mongoose.connect(DB).then(() => {
//     console.log("Database connection successfull");
//     const PORT = 8000;
//     app.listen(PORT, () => {
//         console.log("Backend server started at port 8000");
//     })
// })

const PORT = 8000;
app.listen(PORT, () => {
    console.log("Backend server started at port 8000");
})