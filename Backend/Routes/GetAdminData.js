const router = require("express").Router();

const getAdmindata = require("../Controllers/getAdmindata");



router.post('/', getAdmindata)

module.exports = router;