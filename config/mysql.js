const mysql = require('mysql2/promise');
// 连接池pool（用于普通查询）
const pool = mysql.createPool({
    host: '10.10.108.218',
    user: 'root',
    password: 'root123!',
    database: 'cmsnode',
    port: 3306
    // debug: true,
});

module.exports = pool;
