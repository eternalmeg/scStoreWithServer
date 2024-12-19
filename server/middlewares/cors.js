function setCors() {
    const allowed = ["http://localhost:4200"]
    return function (req, res, next) {
        const origin = req.headers.origin;
        if(allowed.includes(origin)) {
            res.setHeader("Access-Control-Allow-Origin", origin);
        }
        res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, DELETE, POST, PATCH");
        res.setHeader("Access-Control-Allow-Headers", "Content-type, X-Authorization");
        res.setHeader("Access-Control-Allow-Credentials",true);
        next();
    }
}

module.exports = {
    setCors
}