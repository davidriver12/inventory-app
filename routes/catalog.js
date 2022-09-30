const express = require("express");
const router = express.Router();

// Require controller modules.
const category_controller = require("../controllers/categoryController");
const weapon_controller = require("../controllers/weaponController");

/// WEAPON ROUTES ///

// GET catalog home page.
router.get("/", weapon_controller.index);

// GET request for creating a weapon. NOTE This must come before routes that display weapon (uses id).
router.get("/weapon/create", weapon_controller.weapon_create_get);

// POST request for creating weapon.
router.post("/weapon/create", weapon_controller.weapon_create_post);

// GET request to update weapon.
router.get("/weapon/:id/update", weapon_controller.weapon_update_get);

// POST request to update weapon.
router.post("/weapon/:id/update", weapon_controller.weapon_update_post);

// GET request for one weapon.
router.get("/weapon/:id", weapon_controller.weapon_detail);

// GET request for list of all weapon items.
router.get("/weapons", weapon_controller.weapon_list);

/// CATEGORY ROUTES ///

// GET request for one category.
router.get("/category/:id", category_controller.category_detail);

// GET request for list of all category.
router.get("/categories", category_controller.category_list);

module.exports = router;
