const User = require("../models/users")
const { v4: uuidv4 } = require('uuid');
const {setUser, getUser} = require("../service/auth")

const handleUserSignUp = async(req, res) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password) res.status(400).json({"msg": "All fields are required"});
    await User.create({
        name,
        email,
        password
    });
    return res.redirect("/");
}

const handleUserSignIn = async(req, res) => {
    const {email, password} = req.body;
    if (!email || !password) res.status(400).json({"msg": "All fields are required"});
    const user = await User.findOne({
        email,
        password
    });
    if (!user) return res.render("login", {
        error: "Invalid Username or Password"
    });
    
    //generate sessionId and store it in the map
    const sessionId = uuidv4();
    setUser(sessionId, user);

    //store session id in the cookie as uid
    res.cookie("uid", sessionId);
    return res.redirect("/");
}


module.exports = {
    handleUserSignUp,
    handleUserSignIn
}