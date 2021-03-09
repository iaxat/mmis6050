const Style = require("../models/stache-style.js");
module.exports = {

    showAllStyles: (req, res, next) => {
        Style.find({}).then((styles) => {
            res.render("styles/gallery", {styles: styles});
        }).catch((err) => {
            next(err);
        })

    },

    showStyle : (req, res, next) => {
        let id = req.params.id;
        Style.findById(id).then((style) => {
            res.render("styles/gallery-single-post", {style: style});
        }).catch((err) => {
            next(err);
        })

    },
}