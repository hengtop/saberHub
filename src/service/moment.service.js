/**
 * Create by zhangheng on 2021/5/18
 */

const connection = require('../app/database')
const {APP_HOST, APP_PORT} = require('../app/config')
class MomentService {
  //插入动态
  async create(userId, content) {
    const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`;
    const [result] = await connection.execute(statement, [content, userId]);
    return result;
  }
  //查询指定id动态,还有评论信息,还有标签
  async getMomentById(momentId) {
    const statement = `SELECT m.id id,
                        m.content content,
                        m.createAt createTime,
                        m.updateAt updateTime,
                        JSON_OBJECT('id', u.id, 'name', u.username, 'avatarUrl',u.avatar_url) user,
                        IF(COUNT(c.id),JSON_ARRAYAGG(# 有评论就返回数据,没有就返回null
                        JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.createAt,
                        'user', JSON_OBJECT('id', cu.id, 'username', cu.username))
                        ),NULL) comments,
                        (SELECT JSON_ARRAYAGG(JSON_OBJECT('id',l.id, 'name', l.name)) FROM \`moment_label\` ml LEFT JOIN \`label\` l ON l.id=ml.label_id WHERE ml.moment_id=m.id) labels,
                        (SELECT JSON_ARRAYAGG(CONCAT('${APP_HOST}:${APP_PORT}/moment/images/', picture.filename)) FROM picture WHERE m.id=picture.moment_id) images
                        FROM \`moment\` m LEFT JOIN \`users\` u ON m.user_id=u.id
                        LEFT JOIN \`comment\` c ON c.moment_id=m.id
                        LEFT JOIN \`users\` cu ON cu.id=c.user_id
                        WHERE m.id=?
                        GROUP BY m.id;`
    try {
      const [result] = await connection.execute(statement, [momentId]);
      return result[0];
    }catch (e) {
      console.log(e);
    }

  }
  //查询多条动态, 每条动态显示评论数量,加上标签
  async getMomentList(offset, size) {
    const statement = `SELECT 
                       m.id id,
                       m.content content,
                       m.createAt createTime,
                       m.updateAt updateTime,
                       JSON_OBJECT('id', u.id, 'name', u.username, 'avatarUrl',u.avatar_url) user,
                       (SELECT COUNT(*) FROM \`comment\` WHERE comment.moment_id=m.id) commentCount,
                       (SELECT JSON_ARRAYAGG(JSON_OBJECT('id',l.id, 'name', l.name)) FROM \`moment_label\` ml LEFT JOIN \`label\` l ON l.id=ml.label_id WHERE ml.moment_id=m.id) labels,
                       (SELECT JSON_ARRAYAGG(CONCAT('${APP_HOST}:${APP_PORT}/moment/images/', picture.filename)) FROM picture WHERE m.id=picture.moment_id) images
                       FROM \`moment\` m LEFT JOIN \`users\` u ON m.user_id=u.id
                       limit ?,?`;
    const [result] = await connection.execute(statement, [offset, size]);
    return result;
  }
  //修改某条资源
  async updateMomentById(content, momentId) {
    const statement = `UPDATE \`moment\` SET content=? WHERE id=?;`
    const [result] = await connection.execute(statement, [content, momentId]);
    return result;
  }
  //删除某条动态
  async removeMomentById(momentId) {
    const statement = `DELETE FROM \`moment\` WHERE id=?;`;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }
  //查询动态是否有对应的标签
  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id=? AND label_id=?`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result[0];
  }
  //为动态添加标签
  async addLabelForMoment(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) values (?,?);`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result[0];
  }
}

module.exports = new MomentService();
