const express = require("express");
const {handleGenerateNewShortURL, handleRedirectURL, handleGetAnalytics} = require("../controllers/url")

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/:shortID", handleRedirectURL)

router.get("/GetAnalytics/:shortID", handleGetAnalytics)

module.exports = router