const mongoose =require("mongoose"),
{Schema}= mongoose,
productSchema = new Schema(
    {
        productName:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            match: /^.*\.(jpeg|jpg|JPG|png)$/,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
    }
)

module.exports = mongoose.model("Product", productSchema);