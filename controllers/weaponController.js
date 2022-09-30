const Weapon = require("../models/weapon");
const Category = require("../models/category");
const { body, validationResult } = require("express-validator");

const async = require("async");

exports.index = (req, res) => {
    res.render("index", {
      title: "Inventory Application Home",
    });
};

// Display list of all Weapons.
exports.weapon_list = function (req, res, next) {
  Weapon.find({}, "name")
    .populate("name")
    .exec(function (err, list_weapons) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("weapon_list", { title: "Weapon List", weapon_list: list_weapons });
    });
};

// Display detail page for a specific weapon.
exports.weapon_detail = (req, res, next) => {
  async.parallel(
    {
      weapon(callback) {
        Weapon.findById(req.params.id)
          .exec(callback);
      }
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.weapon == null) {
        // No results.
        const err = new Error("Weapon not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("weapon_detail", {
        title: results.weapon.name,
        weapon: results.weapon,
      });
    }
  );
};

// Display weapon create form on GET.
exports.weapon_create_get = (req, res, next) => {
  // Get all authors and genres, which we can use for adding to our book.
  async.parallel(
    {
      categories(callback) {
        Category.find(callback);
      }
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      res.render("weapon_form", {
        title: "Create Weapon",
        categories: results.categories,
      });
    }
  );
};

// Handle weapon create on POST.
exports.weapon_create_post = [
  // Convert the category to an array.
  (req, res, next) => {
    if (!Array.isArray(req.body.category)) {
      req.body.category =
        typeof req.body.category === "undefined" ? [] : [req.body.category];
    }
    next();
  },

  // Validate and sanitize fields.
  body("name", "Name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category", "Category must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category.*").escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped and trimmed data.
    const weapon = new Weapon({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all authors and genres for form.
      async.parallel(
        {
          categories(callback) {
            Category.find(callback);
          },
        },
        (err, results) => {
          if (err) {
            return next(err);
          }

          // Mark our selected genres as checked.
          for (const category of results.categories) {
            if (weapon.category.includes(category._id)) {
              category.checked = "true";
            }
          }
          res.render("weapon_form", {
            title: "Create Weapon",
            categories: results.categories,
            weapon,
            errors: errors.array(),
          });
        }
      );
      return;
    }

    // Data from form is valid. Save book.
    weapon.save((err) => {
      if (err) {
        return next(err);
      }
      // Successful: redirect to new book record.
      res.redirect(weapon.url);
    });
  },
];

// Display weapon update form on GET.
exports.weapon_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: weapon update GET");
  };
  
  // Handle weapon update on POST.
  exports.weapon_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: weapon update POST");
  };