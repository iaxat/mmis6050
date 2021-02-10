module.exports = {
    logSession: (req,res,next) => {
        // log session info to console
        console.log("Session ID: ", req.session.id);
        console.log("Session data: ", req.session);
    }
};
