import mysql from  'mysql'

export function db_connect() {
    const connConfig = {
        host: '192.168.1.253',
        user: 'commerce',
        password: 'secret',
        database: 'ecommerce'
    }
    return mysql.createConnection(connConfig)
}

export function db_disconnect(conn) {
    conn.end()
}


