const { body, validationResult } = require("express-validator"); //Data parsing
const { default: mongoose } = require("mongoose");
const post = require("../models/post.js");
const Post = require("../models/post.js");
const User = require("../models/user.js");

exports.create_new_post = [
  //Trim data
  //Add extra data validation
  body("message", "Please enter a message")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a post object with escaped and trimmed data.

    const current_time = Date.now();

    const post = new Post({
      user_details: req.user.id,
      message: req.body.message,
      post_time: current_time,
      isPublic: req.body.isPublic,
    });
    if (!errors.isEmpty()) {
      // There are errors. Return data and erros as JSON
      res.json({
        user,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if post with same date/time by user already exists.
      Post.findOne({
        message: req.body.message,
        post_time: current_time,
      }).exec((err, found_message_copy) => {
        if (err) {
          return next(err);
        }

        if (found_message_copy) {
          // Post exists.
          res.json({ message: "Post already exists." });
        } else {
          post.save((err) => {
            if (err) {
              return next(err);
            }

            res.json({ message: "Post successfully added to database" });
          });
        }
      });
    }
  },
];

exports.count_posts = (req, res, next) => {
  Post.countDocuments({}).exec(function (err, count) {
    if (err) {
      return next(err);
    }
    //Successful, so send JSON
    res.json(count);
  });
};

exports.count_posts_user = (req, res, next) => {
  let query = {};
  //Not logged in
  if (req.params.userId && req.query.auth === "false") {
    const userId = req.params.userId;
    query = { user_details: userId, isPublic: true };
  }
  //Logged in
  else {
    const userId = req.params.userId;
    query = { user_details: userId };
  }

  Post.countDocuments(query).exec(function (err, count) {
    if (err) {
      return next(err);
    }
    //Successful, so send JSON
    res.json(count);
  });
};

exports.get_single_post = (req, res, next) => {
  Post.find({ _id: req.params.postId }, { __v: 0 }).exec(function (err, post) {
    if (err) {
      return next(err);
    }
    //Successful, so send JSON
    res.json(post);
  });
};

// Display list of all books.
exports.get_post_list = (req, res, next) => {
  Post.find({ isPublic: true }, { __v: 0 })
    .sort({ post_time: -1 })
    .skip(req.query.pointer)
    .limit(10)
    .populate("user_details", { username: 1 })
    .exec(function (err, list_posts) {
      if (err) {
        return next(err);
      }
      //Successful, so send JSON
      res.json(list_posts);
    });
};

// Display list of all books.
exports.get_user_post_list = (req, res, next) => {
  let query = {};
  //Not logged in
  if (req.params.userId && req.query.auth === "false") {
    const userId = req.params.userId;
    query = { user_details: userId, isPublic: true };
  }
  //Logged in
  else {
    const userId = req.params.userId;
    query = { user_details: userId };
  }
  Post.find(query, { __v: 0 })
    .sort({ post_time: -1 })
    .skip(req.query.pointer)
    .limit(10)
    .populate("user_details", { username: 1 })
    .exec(function (err, list_posts) {
      if (err) {
        return next(err);
      }
      //Successful, so send JSON
      res.json(list_posts);
    });
};

exports.edit_post = [
  //Trim data
  //Add extra data validation
  body("message", "Please enter a message")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Return data and erros as JSON
      res.json({
        user,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      //Update message and isPublic, not that it is edited
      Post.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(req.params.postId),
        },
        { message: req.body.message, isPublic: req.body.isPublic },
        { new: true },
      );
      res.status(200).json({ message: "Updated" });
    }
  },
];

// Delete post
exports.delete_post = (req, res, next) => {
  Post.findByIdAndRemove({ _id: req.query.postId }).exec(function (err) {
    if (err) {
      return next(err);
    }
    //Successful, so send JSON
    res.json("Post deleted successfully");
  });
};

exports.check_current_user = (req, res, next) => {
  try {
    if (req.user.id === req.params.userId) {
      res.status(200).json({logged: true})
    } else {
      res.status(200).json({logged: false})
    }
  } catch (error) {
    next(err)
  }

}