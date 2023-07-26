const router = require("express").Router();
const { Reg } = require("../controller/user");
router.post("/reg", Reg);

module.exports = router;
