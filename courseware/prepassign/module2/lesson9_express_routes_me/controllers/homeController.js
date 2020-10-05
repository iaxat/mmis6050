// home-controller

exports.sendReqParam = (req, res) => {

     let veg = req.params.vegetable;

    res.send(`This is the page for ${veg}`);
  };

  exports.sendReqParam_test = (req, res) => {
       res.send(`testing`);
  };