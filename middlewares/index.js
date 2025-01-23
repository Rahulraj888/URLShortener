const fs = require("fs")

const logReqRes = (fileName) => {
    return (req, res, next) => {
        const msg = `request received at ${Date.now()} for ${req.path} ${req.method}`;
        fs.appendFile(fileName, msg, (err, data) => {
            next();
        });
    }
}

module.exports = {
    logReqRes
}