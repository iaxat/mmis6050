// File created

"use strict";

const fs=require('fs');

module.exports = {
  // renders home page
  index: (req, res) => {
    res.render("index");
  },

  // renders about page
  about: (req, res) => {
    res.render("about");
  },

  // logs all log request to a file named requestLog.txt
  logRequestPaths: (req, res, next) => {
    // console.log(req.method)
    let today =  new Date();
    let str=today+' '+req.method+' '+ 'request made to: '+req.url;
    console.log(str);
    fs.appendFile('log/requestLog.txt', str+'\r\n', function(err) {
      if (err) {
         return console.error(err);
      }else{
        next();
      }
  })
}
};
