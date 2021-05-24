/**
 * Create by zhangheng on 2021/5/16
 */
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, '../../keys/private.key'));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, '../../keys/public.key'));

module.exports = {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD
} = process.env;
//写在后面
module.exports.PUBLIC_KEY = PUBLIC_KEY;
module.exports.PRIVATE_KEY = PRIVATE_KEY;

