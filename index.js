const express = require("express");

const app = expess();
const PORT = 8001;



app.listen(PORT, () => {
    console.log(`server started at PORT ${PORT}`);
});