/**
 * Create by zhangheng on 2021/5/19
 */
const connection = require('../app/database');

class CommentService {
  //评论或者回复
  async create(momentId, content, userId, commentId=null) {
    const statement = `INSERT INTO \`comment\` (moment_id, content, user_id, comment_id) VALUES (?,?,?,?);`;
    const [result] = await connection.execute(statement, [momentId, content, userId, commentId]);
    return result;
  }
  //更新评论
  async update(commentId, content) {
    const statement = `UPDATE \`comment\` SET content=? WHERE id=?;`;
    const [result] = await connection.execute(statement, [content, commentId]);
    return result;
  }
  //删除评论
  async remove(commentId) {
    const statement = `DELETE FROM \`comment\` WHERE id=?;`;
    const [result] = await connection.execute(statement, [commentId]);
    return result;
  }
  //通过动态id获取评论
  async getCommentById(commentId) {
    const statement = `SELECT m.id, m.content, m.comment_id commentId, m.createAt createTime,
                       JSON_OBJECT('id', u.id, 'username', u.username) user
                       FROM \`comment\` m
                       LEFT JOIN users u ON u.id = m.user_id
                       WHERE moment_id=?;`;
    const [result] = await connection.execute(statement, [commentId]);
    return result;
  }
}

module.exports = new CommentService()
