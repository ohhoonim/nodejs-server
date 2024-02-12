import http from 'http'
import url from 'url'
import querystring from 'querystring'

import members from './section01/members.js'
import goods from './section01/goods.js'
import purchases from './section01/purchases.js'

const server = http.createServer((req, res) => {
    const method = req.method
    const uri = url.parse(req.url, true)
    const pathname = uri.pathname

    if (method === 'POST' || method === 'PUT') {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk
        })
        req.on('end', () => {
            let params
            if (req.headers['content-type'] === 'application/json') {
                params = JSON.parse(body)
            } else {
                params = querystring.parse(body)
            }
            onRequest(res, method, pathname, params)
        })
    } else {
        onRequest(res, method, pathname, uri.query)
    }
}).listen(8080)

function onRequest(res, method, pathname, params) {
    switch(pathname) {
        case '/members':
            members.onRequest(res, method, pathname, params, response) 
            break
        case '/goods':
            goods.onRequest(res, method, pathname, params, response) 
            break
        case '/purchases':
            purchases.onRequest(res, method, pathname, params, response) 
            break
        default:
            res.writeHead(404);
            return res.end('Not Found')
    }
}

function response(res, packet) {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    })
    res.end(JSON.stringify(packet))
}