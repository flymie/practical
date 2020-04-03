const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const multiparty = require('multiparty');
const UPLOAD_DIR = path.resolve(__dirname, '..', "upload-files"); // 大文件存储目录

/**
 * 上传文件
 * @param  {object} ctx     koa上下文
 * @param  {object} options 文件上传参数 fileType文件类型， path文件存放路径
 * @return {promise}
 */
async function uploadFile2(ctx, options) {
  let req = ctx.req;
  const multipart = new multiparty.Form();
  return new Promise(((resolve, reject) => {
    multipart.parse(req, async (err, fields, files) => {
      let result ={
        message: "解析失败",
        success: false,
      };
      if (err) {
        result.message = err;
        reject(result);
      }
      const [chunk] = files.chunk;
      const [hash] = fields.hash;
      const [filename] = fields.filename;
      // 去掉后缀
      const chunkDir = path.resolve(UPLOAD_DIR, filename.match(/(.*)\..*/)[1]);
      // 切片目录不存在，创建切片目录
      if (!fse.existsSync(chunkDir)) {
        await fse.mkdirs(chunkDir);
      }

      // fs-extra 专用方法，类似 fs.rename 并且跨平台
      // fs-extra 的 rename 方法 windows 平台会有权限问题
      // https://github.com/meteor/meteor/issues/7852#issuecomment-255767835
      await fse.move(chunk.path, `${chunkDir}/${hash}`);
      result.message = '上传成功';
      result.success = true;
      resolve(result);
    });
  }))
}

const resolvePost = req =>
  new Promise(resolve => {
    let chunk = "";
    req.addListener("data", data => {
      chunk += data;
    });
    req.addListener("end", () => {
      resolve(JSON.parse(chunk));
    });
  });

const pipeStream = (path, writeStream) => {
  console.log(path)
  return new Promise(resolve => {
    const readStream = fse.createReadStream(path);
    readStream.on("end", () => {
      fse.unlinkSync(path);
      resolve();
    });
    readStream.pipe(writeStream);
  });
};

// 合并切片
const mergeFileChunk = async (filePath, filename, size = 10 * 2048) => {
  filename = filename.match(/(.*)\..*/)[1];
  const chunkDir = path.resolve(UPLOAD_DIR, filename);
  console.log(1, chunkDir)
  const chunkPaths = await fse.readdir(chunkDir, 'utf8');
  console.log(2, chunkPaths)
  // 根据切片下标进行排序
  // 否则直接读取目录的获得的顺序可能会错乱
  chunkPaths.sort((a, b) => a.split("-")[1] - b.split("-")[1]);
  await Promise.all(
    chunkPaths.map((chunkPath, index) =>
      pipeStream(
        path.resolve(chunkDir, chunkPath),
        // 指定位置创建可写流
        fse.createWriteStream(filePath, {
          start: index * size,
          end: (index + 1) * size
        })
      )
    )
  );
  fse.rmdirSync(chunkDir); // 合并后删除保存切片的目录
};

module.exports =  {
  uploadFile2,
  resolvePost,
  mergeFileChunk,
};
