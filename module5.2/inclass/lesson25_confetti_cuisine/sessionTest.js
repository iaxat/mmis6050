module.exports = {
    logSession: (req,res,next) => {
        // log session info to console
        console.log("Session ID: ", req.session.id);
        console.log("Session data: ", req.session);
        console.log("User data: ", req.user);
        next();
    },

    logVisitCount: (req, res, next) => {
        if (req.session.visitCount) {
            req.session.visitCount++;
            // ++ denotes the value will increment
            console.log('App visit ${req.session.visitCount} times during this session');
        } else {
            req.session.visitCount = 1;
            console.log('first request');
        }
        next();
    },

    destroySession: (req, res, next) => {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Session Destroyed");
            }
        })
    }
};
