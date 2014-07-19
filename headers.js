var mimes = ['text/html', 'application/json'];
exports.isJSONDataRequested = function (req, res, next) {
    if(req.headers && req.headers['accept']) {
         var accept = getAcceptHeaders(req);
         req.isJSON = accept.some(function (mimeObj){
            if (mimeObj.mime === 'application/json' && mimeObj.priority === 1) {
                return true;
            }
         });
    }
    next();
};

function getAcceptHeaders(req) {
    var accept = req.headers.accept;
    console.log();

    // todo: read all data using a single regular expression
    // todo: return entire data as a single hashmap object

    return accept.split(',').map(function (mime) {
        var data = mime.split(';');
        if (data.length === 2) {
            return {
                mime: data[0],
                priority: Number(data[1].match(/q=([\d.]+)/)[1])
            };
        } else {
            return {
                mime: data[0],
                priority: 1
            };

        }
    });


}