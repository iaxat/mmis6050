"use strict";

const Style = require("../models/stache-style.js");
const httpStatus = require("http-status-codes"),
    jsonWebToken = require("jsonwebtoken"),
    axios = require("axios");

module.exports = {

    getStyles: (req, res, next) => {
        Style.find({}).then((styles) => {
            styles.forEach(style => {
                style.imageUrl = "http://localhost:3000/images/" + style.imageUrl;
            });
            res.locals.styles = styles;
            next();
        }).catch((err) => {
            next(err);
        })
    },
    respondJSON: (req, res) => {
        res.json({
            status: httpStatus.OK,
            data: res.locals
        });
    },
    getToken: (req, res, next) => {
        let signedToken = jsonWebToken.sign(
            {
                exp: new Date().setDate(new Date().getDate() + 1)
            },
            "secret_encoding_passphrase"
        );
        res.json({
            success: true,
            token: signedToken
        });
    },
    verifyToken: (req, res, next) => {
        jsonWebToken.verify(req.query.token, "secret_encoding_passphrase", (error, payload) => {
            if (error) {
                console.log("error")
                res.status(httpStatus.UNAUTHORIZED).json({
                    error: true,
                    message: "Provide Token"
                });
            } else {
                console.log("verified");
                next();
            }
        });
    },
    
    externalApi: (req, res) => {
           
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
