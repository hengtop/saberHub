/**
 * Create by zhangheng on 2021/5/23
 */
const Multer = require('koa-multer');
const {AVATAR_PATH, PICTURE_PATH} = require('../constaints/filePath');
const uuid = require('uuid');
const path = require('path');
const Jimp = require('jimp');

//配置头像上传图片的位置和名字
const avatarStorage = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, AVATAR_PATH)
  },
  filename: (req, file, cb) => {
    cb(null, uuid.v1()+path.extname(file.originalname));
  }
});
//头像上传中间件
const avatarUpload = Multer({storage:avatarStorage}).single('avatar');


//配置动态上传图片的位置和名字
const pictureStorage = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PICTURE_PATH)
  },
  filename: (req, file, cb) => {
    cb(null, uuid.v1()+path.extname(file.originalname));
  }
});
//动态图片上传中间件
const pictureUpload = Multer({storage:pictureStorage}).array('picture');

//对图片进行处理  sharp或者jimp 第三方库

const pictureResize = async (ctx,next)=> {
  const {files} = ctx.req;

  for (const file of files) {
    const destPath = path.resolve(file.destination, file.filename)
    Jimp.read(file.path).then(image => {
      //处理成三种尺寸的图片
      image.resize(1280, Jimp.AUTO).write(`${destPath}-@large`);
      image.resize(640, Jimp.AUTO).write(`${destPath}-@middle`);
      image.resize(320, Jimp.AUTO).write(`${destPath}-@small`);
    })
  }
  await next();
}

module.exports = {
  avatarUpload,
  pictureUpload,
  pictureResize
}
