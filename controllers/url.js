const shortid = require('shortid');
const URL = require("../models/url")

const handleGenerateNewShortURL = async(req, res) => {
    const body = req.body;
    if (!body.url) return res.status(404).json({"msg": "URL is required"});
    const shortID = shortid.generate();
    await URL.create ({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: []
    });
    res.render("home", {
        "id": shortID
    });
    // res.status(200).json({"id": shortID});
};


const handleRedirectURL = async(req, res) => {
    const shortId = req.params.shortID;
    const entry = await URL.findOneAndUpdate(
        {
            shortId
        }, 
        {
            $push: {
                visitHistory: {
                    timeStamp : Date.now()
                }
            }
        });
    return res.redirect(entry.redirectURL);
};

const handleGetAnalytics = async(req, res) => {
    const shortId = req.params.shortID;
    const entry = await URL.findOne({shortId});
    return res.status(200).json({ 
        "Total Clicks": entry.visitHistory.length, 
        "Analytics": entry.visitHistory
    })
};

module.exports = {
    handleGenerateNewShortURL,
    handleRedirectURL,
    handleGetAnalytics
}