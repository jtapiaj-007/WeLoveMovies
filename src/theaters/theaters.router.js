const router = require("express").Router({ mergeParams: true });
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/")
  .get(controller.list)
  .all(methodNotAllowed);

// Exports
module.exports = router;
