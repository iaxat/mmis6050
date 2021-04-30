const product = require("../models/product");
const Product= require("../models/product");
const User=require("../models/user");

const httpStatus=require("http-status-codes");

const axios=require("axios");

module.exports={
    
    showProductAPI:(req,res,next)=>{
        
        Product.find().then(prod=>{
            prod.forEach(prod =>{
                prod.imageUrl="http://localhost:3000/images/" + prod.imageUrl;
            });
            res.locals.products=prod;
            next();
        }).catch(error=>{
            next(error);
        });
    },

    resJson:(req,res,next)=>{
        res.json({status:httpStatus.OK,
            data:res.locals})
    },

    externalApi:(req,res) =>{
        let symbol_=req.params.symbol;
        var options = {
            method: 'GET',
            url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary',
            params: {symbol: symbol_, region: 'US'},
            headers: {
              'x-rapidapi-key': 'f72aedadffmsh434d8480d08b29ep181088jsnba4f80b1d9f8',
              'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
            }
          };          
          axios.request(options).then( (response)=> {
            //   console.log(response.data.price.regularMarketPrice.raw);
              res.render("external-api", { Data: response.data.price.regularMarketPrice.raw });
          }).catch(function (error) {
              console.error(error);
          });
    }

}