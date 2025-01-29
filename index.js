const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser")

const dbConnection = require("./connect")
const {logReqRes} = require("./middlewares/index")
const { restrictToLoggedInUserOnly, checkAuth } = require("./middlewares/auth")

const router = require("./routes/url");
const staticRouter = require("./routes/staticroute")
const userRouter = require("./routes/user")

const app = express();
const PORT = 8001;


// Set EJS as the view engine
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.join(__dirname, "views"));


//make db connection
dbConnection("mongodb://127.0.0.1:27017/url-shortener")
.then(() => console.log("DB Connected"))
.catch ((err) => console.log(`Error in connection to DB: ${err}`));


//parsing body from request
app.use(express.urlencoded ({ extended: false }));
app.use(express.json( {extended: false}));
app.use(cookieParser()) //for parsing cookies


//middleware for logging request
app.use(logReqRes("./logs/logs.txt"));


//defining router for the route
app.use("/api/URL", restrictToLoggedInUserOnly, router);
app.use("/", checkAuth, staticRouter);
app.use("/users", userRouter);


//listening to the server 
app.listen(PORT, () => {
    console.log(`server started at PORT ${PORT}`);
});