const Category = require("../models/category");
const Weapon = require("../models/weapon");
const async = require("async");

// Display list of all Categories.
exports.category_list = function (req, res, next) {
  Category.find({})
    .sort({ name: 1 })
    .exec(function (err, list_categories) {
      if (err) {
        return next(err);
      } 
      //Successful, so render
    res.render("category_list", { title: "Category List", category_list: list_categories });
    });
};

// Display detail page for a specific category.
exports.category_detail = (req, res, next) => {
  async.parallel(
    {
      category(callback) {
        Category.findById(req.params.id)
          .exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.category == null) {
        // No results.
        const err = new Error("Category not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("category_detail", {
        title: results.category.name,
        category: results.category,
      });
    }
  );
};
