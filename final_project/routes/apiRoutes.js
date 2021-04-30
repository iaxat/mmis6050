const router=require("express").Router();

const apiController= require("../controllers/apiController");

router.get("/showProducts",apiController.showProductAPI,apiController.resJson);
router.get("/external/:symbol",apiController.externalApi);

module.exports = router;