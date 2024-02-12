export default {
    onRequest : function (res, method, pathname, params, callback){
        switch(method) {
            case "POST":
                return register(method, pathname, params, (packet) => {
                    process.nextTick(callback, res, packet)
                }) 
            case "GET":
                return inquiry(method, pathname, params, (packet) => {
                    process.nextTick(callback, res, packet)
                })
            case "DELETE":
                return unregister(method, pathname, params, (packet) => {
                    process.nextTick(callback, res, packet)
                }) 
            default:
                process.nextTick(callback, res, null)
        }
    }    
}


function register(method, pathname, params, callback) {

}

function inquiry(method, pathname, params, callback) {

}

function unregister(method, pathname, params, callback) {

}