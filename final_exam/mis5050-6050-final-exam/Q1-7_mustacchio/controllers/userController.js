const User= require("../models/user");
const passport=require("passport");
const getUserParams = body => {
    return {
        firstName: body.first,
        lastName: body.last,
      email: body.email,
      password: body.password,
    };
  };

  module.exports = {

    login: (req, res) => {      
      res.render("users/login");
    },

    register: (req,res) =>{
        res.render("./users/register");
    },

    index: (req, res, next) => {
      User.find()
        .then(users => {
          res.locals.users = users;
          next();
        })
        .catch(error => {
          console.log(`Error fetching users: ${error.message}`);
          next(error);
        });
    },
    indexView: (req, res) => {
      res.render("users/viewUsers");
    },
    new: (req, res) => {
      res.render("users/new");
    },
    create: (req, res, next) => {
        let newUser = new User(getUserParams(req.body));
        User.register(newUser, req.body.password, (error, user) => {
          if (user) {
            req.flash("success", `${user.firstName}'s account created successfully!`);
            res.locals.redirect = "/login";
            next();
          } else {
            req.flash("error", `Failed to create user account because: ${error.message}.`);
            res.locals.redirect = "/register";
            next();
          }
        });
      },
    redirectView: (req, res, next) => {
      let redirectPath = res.locals.redirect;
      if (redirectPath) res.redirect(redirectPath);
      else next();
    },
    show: (req, res, next) => {
      let userId = req.params.id;
      User.findById(userId)
        .then(user => {
          res.locals.user = user;
          next();
        })
        .catch(error => {
          console.log(`Error fetching user by ID: ${error.message}`);
          next(error);
        });
    },
    showView: (req, res) => {
      res.render("users/show");
    },
    grant :(req,res,next)=>{
      let userParams={
        isAdmin:true,
      };
      User.findByIdAndUpdate(req.params.id,{
        $set: userParams 
      }).then(user=> {
        res.locals.redirect="/viewUsers";
        next();
      }).catch(error =>{
        next(error);
      });
    },
    revoke: (req,res,next) =>{
      let userParams={
        isAdmin:false,
      };
      User.findByIdAndUpdate(req.params.id,{
        $set: userParams 
      }).then(user=> {
        res.locals.redirect="/viewUsers";
        next();
      }).catch(error =>{
        next(error);
      });
    },
    edit: (req, res, next) => {
      let userId = req.params.id;
      User.findById(userId)
        .then(user => {
          res.render("users/edit", {
            user: user
          });
        })
        .catch(error => {
          console.log(`Error fetching user by ID: ${error.message}`);
          next(error);
        });
    },
    addFavStyle:(req,res,next)=>{
      console.log(req.user._id)
      User.findByIdAndUpdate(req.user._id,{
        $addToSet: {favoriteStyles:[req.params.id]}
      }).then(users=>{
        console.log("done")
        res.locals.redirect="/gallery";
        next();
      })
    },
    showFavStyles: async (req,res,next)=>{
      let styleId=await User.findById(req.user._id,"favoriteStyles").populate("favoriteStyles");
      console.log("style uds ",styleId)
      res.render("users/favorite-styles",{styles: styleId.favoriteStyles});
    },
    update: (req, res, next) => {
      let userId = req.params.id,
        userParams = {
          name: {
            first: req.body.first,
            last: req.body.last
          },
          email: req.body.email,
          password: req.body.password,
          zipCode: req.body.zipCode
        };
      User.findByIdAndUpdate(userId, {
        $set: userParams
      })
        .then(user => {
          res.locals.redirect = `/users/${userId}`;
          res.locals.user = user;
          next();
        })
        .catch(error => {
          console.log(`Error updating user by ID: ${error.message}`);
          next(error);
        });
    },
    delete: (req, res, next) => {
      let userId = req.params.id;
      User.findByIdAndRemove(userId)
        .then(() => {
          res.locals.redirect = "/users";
          next();
        })
        .catch(error => {
          console.log(`Error deleting user by ID: ${error.message}`);
          next();
        });
    },   
  
    authenticate: passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: "Failed to login.",
        successRedirect: "/",
        successFlash: " Logged in!"
      }),

      logout: (req, res, next) => {
        req.logout();
        req.flash("success", "You have been logged out!");
        res.locals.redirect = "/";
        next();
      },
  };
  