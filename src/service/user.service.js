/**
 * Create by zhangheng on 2021/5/16
 */
const connection = require('../app/database')

class UserService {
  async create(user) {
    const {username, password} = user;
    //执行sql语句
    const statement = `INSERT INTO \`users\` (username, password) VALUES (?, ?);`
    const result = await connection.execute(statement, [username, password]);
    return result;
  }

  async getUserByName(username) {
    const statement = `SELECT * FROM \`users\` WHERE username=?;`
    const result = await connection.execute(statement, [username]);
    return result[0];
  }
  //获取用户头像信息
  async getUserAvatarInfoById(userId) {
    const statement =`SELECT * FROM avatar WHERE user_id=?;`;
    const [result] = await connection.execute(statement, [userId]);
    return result[result.length-1];
  }
  //将头像url添加到用户表中
  async updateAvatarUrlById(avatarUrl, userId){
    const statement = `UPDATE users SET avatar_url=? WHERE id=?;`;
    const [result] = await connection.execute(statement, [avatarUrl, userId]);
    return result;
  }


}

module.exports = new UserService();
