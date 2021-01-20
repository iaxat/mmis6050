// File created

"use strict";

const fs=require('fs');

module.exports = {
  index: (req, res) => {
    res.render("index");
  },
  about: (req, res) => {
    res.render("about");
  },
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
