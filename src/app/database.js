/**
 * Create by zhangheng on 2021/5/16
 */
const mysql = require('mysql2');
const config = require('./config')
//连接数据库
const connections = mysql.createPool({
  host:config.MYSQL_HOST,
  port:config.MYSQL_PORT,
  database:config.MYSQL_DATABASE,
  user:config.MYSQL_USER,
  password:config.MYSQL_PASSWORD,
  connectionLimit: 5
})

//测试连接
connections.getConnection((err, conn) => {
  conn.connect((err) => {
    if(err) {
      console.log('数据库连接失败', err)
    } else {
      console.log('数据库连接成功');
    }
  });
});

module.exports = connections.promise();
