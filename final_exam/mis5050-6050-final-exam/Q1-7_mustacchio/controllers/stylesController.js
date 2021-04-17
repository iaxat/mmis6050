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

    addStyle : (req,res)=>{
        console.log("yyyyyyyyyyyyyyyyyyyyyy")
        res.render("styles/add-gallery");
    },

    uploadImage: (req,res,next) =>{
        console.log("mmm")
        let sampleFile;
        let uploadPath;

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        sampleFile = req.files.sampleFile;
        uploadPath = 'public/images/' + sampleFile.name;

        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv(uploadPath, function (err) {
            if (err)
                return res.status(500).send(err);

            // res.send('File uploaded!');
            // next();
        });
        let styleParameters={
            title : req.body.title,
            description: req.body.description,
            imageUrl: sampleFile.name
        }
        Style.create(styleParameters).then(style =>{
            res.locals.reditrect="/gallery";
            next();
        }).catch(error=>{
            next(error);
        });
    },
}