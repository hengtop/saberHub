/**
 * Create by zhangheng on 2021/5/21
 */
const connection = require('../app/database');

class LabelService {
  //创建标签
  async create(name) {
    const statement = `INSERT INTO label (name) VALUES (?);`;
    const [result] = await connection.execute(statement, [name]);
    return result;
  }
  //判断label是否存在
  async hasLabel(name) {
    const statement = `SELECT * FROM label WHERE name=?`;
    const [result] = await connection.execute(statement, [name]);
    return result[0];
  }
  //获取标签列表
  async getLabels(limit, offset) {
    const statement = `SELECT * FROM label LIMIT ?, ?`;
    const [result] = await connection.execute(statement, [offset, limit]);
    return result;
  }
}

module.exports = new LabelService();
