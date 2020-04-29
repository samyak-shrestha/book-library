module.exports = function(req, res, next) {
    //401 unauthorized
    //403
    // 500 
    if(!req.uesr.isAdmin) return res.status(403).send('Access Denied. ');

    next();
}