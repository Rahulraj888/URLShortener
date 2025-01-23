const express = require("express");
const dbConnection = require("./connect")
const router = require("./routes/url");
const {logReqRes} = require("./middlewares/index")


const app = express();
const PORT = 8001;


//make db connection
dbConnection("mongodb://127.0.0.1:27017/url-shortener")
.then(() => console.log("DB Connected"))
.catch ((err) => console.log(`Error in connection to DB: ${err}`));


//parsing body from request
app.use(express.urlencoded ({ extended: false }));
app.use(express.json( {extended: false}));


//middleware for logging request
app.use(logReqRes("./logs/logs.txt"));


//defining router for the route
app.use("/api/URL", router);


//listening to the server 
app.listen(PORT, () => {
    console.log(`server started at PORT ${PORT}`);
});