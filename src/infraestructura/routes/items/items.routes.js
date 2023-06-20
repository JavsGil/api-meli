const router = require("express").Router();

const {
    getItemById,
    getItemsbyQuery,
} = require("../../../aplicacion/controllers/items/itemsController");
router.get("/:id", getItemById);
router.get("/", getItemsbyQuery);

module.exports = router;