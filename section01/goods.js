import {db_connect, db_disconnect} from './database-mysql.js'

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
    let response = {
        errorcode: 0,
        errormessage: 'success'
    }

    if (params.name == null || params.category == null || params.price == null || params.description == null) {
        response.errorcode = 1
        response.errormessage = 'Invalid parameter'
        callback(response)
    } else {
        const conn = db_connect()
        conn.connect()
        conn.query(`
            insert into goods(name, category, price, description)
            values(?,?,?,?)
        `, 
        [params.name, params.category, params.price, params.description], 
        (err, result) => {
            if (err) {
                response.errorcode = 
                response.errormessage = err
            } 
            callback(response)
            
        })
        db_disconnect(conn)       
    }
}

function inquiry(method, pathname, params, callback) {

}

function unregister(method, pathname, params, callback) {

}