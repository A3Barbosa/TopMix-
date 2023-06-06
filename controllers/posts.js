const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/comment");
const Recipe = require("../models/Recipe");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  getUpload: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("upload.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },


  getFeed: async (req, res) => {
    try {
      let sortObject={ createdAt: "desc" }
      if (req.query.sort == 'sortByLikes'){
        sortObject= {
          likes: "desc"
        }
      }
      console.log(req.query, sortObject)
      const posts = await Post.find().sort(sortObject).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },

  getRecipe: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("recipe.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },

  getFavorite: async (req, res) => {
    try {
      console.log(req.user._id)
      const recipes = await Recipe.find({user:req.user._id}).sort({ createdAt: "desc" }).lean();
      res.render("favorite.ejs", { recipes: recipes });
    } catch (err) {
      console.log(err);
    }
  },


  getPost: async (req, res) => {
    try {
      const Comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean()
      const post = await Post.findById(req.params.id);
      console.log("post", post)
      res.render("post.ejs", { post: post, user: req.user, comments:Comments });
    } catch (err) {
      }
  },


  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        drinkName: req.body.drinkName,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        location: req.body.location,
        rating: req.body.rating,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },


  createRecipe: async (req, res) => {
    try {
      console.log('recipe', req.body)
      await Recipe.create({
        recipeName: req.body.recipeName,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },

  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        user: req.user.id,
        post: req.params.id
      });
      console.log("Comment has been added!");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },


  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },



  lovePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },

  



  deleteComment: async (req, res) => {
    try {
      await Comment.remove({ _id: req.params.id});
      console.log("Deleted Post");
      res.redirect(req.header('Referer')||`/post`)
      
    } catch (err) {
      res.redirect(`/post`);
    }
  },

  deleteFavorite: async (req, res) => {
    try {
      await Recipe.remove({ _id: req.params.id});
      console.log("Deleted Post");
      res.redirect('/favorite')
      
    } catch (err) {
      res.redirect(`/favorite`);
    }
  },



  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },

};





