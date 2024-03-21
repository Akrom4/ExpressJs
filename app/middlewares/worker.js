module.exports = function({ logging = true }) {
    return function(req,res,next){
        if (logging) {
            console.log('Worker:',process.pid);
        };
        next();
    }
};