// File created

"use strict";

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
    console.log(today,` `,req.method,` request made to: ${req.url}`);
    fs.writeFile('log.txt', str, function(err) {
      if (err) {
         return console.error(err);
      }else{
        next();
      }
  })
}
};
