// const express = require('express');
// const aiController = require("../controllers/ai.controller");

// const router = express.Router();



// // router.get("/get-response", (req, res) => {
// //     const prompt = req.query.prompt;

// //     if(!prompt){
// //         return res.status(400).send("Prompt is Required");
// //     }
// // })

// router.get("/get-response", aiController.getResponse)

// module.exports = router;

const express = require('express');
const aiController = require("../controllers/ai.controller");

const router = express.Router();

router.post("/get-review", aiController.getReview);

module.exports = router;
