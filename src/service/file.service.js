/**
 * Create by zhangheng on 2021/5/23
 */
const connection = require('../app/database');
class FileService {
  //添加用户头像信息
  async createAvatarInfo(filename, mimetype, size, userId) {
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?,?,?,?);`;
    const [result] =  await connection.execute(statement, [filename, mimetype, size, userId]);
    return result;
  }
  //添加动态图片信息
  async createPictureInfo(filename, mimetype, size, userId, momentId) {
    const statement = `INSERT INTO picture (filename, mimetype, size, user_id, moment_id) VALUES (?,?,?,?,?);`;
    const [result] =  await connection.execute(statement, [filename, mimetype, size, userId, momentId]);
    return result;
  }
  //获取某张动态配图
  async getPictureByFilename(filename){
    const statement =`SELECT * FROM picture WHERE filename=?;`;
    const [result] = await connection.execute(statement, [filename]);
    return result[0];
  }
}

module.exports = new FileService();
