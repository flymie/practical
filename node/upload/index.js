const Koa = require('koa')
const path = require('path');
const views = require('koa-views');
const router = require('koa-router')();
const app = new Koa();

const UPLOAD_DIR = path.resolve(__dirname, "upload-files"); // 大文件存储目录

app.use(views(path.join(__dirname, './view'), {
  extension: 'ejs'
}));

const { uploadFile } = require('./util/upload');
const { uploadFile2, resolvePost, mergeFileChunk } = require('./util/upload2');

router.get('/', async (ctx) => {
  await ctx.render('index', {});
});
router.post('/upload', async (ctx) => {
  let result;
  let serverFilePath = path.join( __dirname, 'upload-files' );

  // 上传文件事件
  result = await uploadFile( ctx, {
    path: serverFilePath,
    fileType: 'excel', // common or excel
  });
  ctx.body = result;
});
router.post('/upload2', async (ctx) => {
  let result;
  result = await uploadFile2(ctx);
  console.log(result)
  ctx.body = result;
  ctx.type = 'text/css; charset=utf-8';
});
router.post('/merge', async (ctx, next) => {
  let result = { success: false };

  // 上传文件事件2
  const data = await resolvePost(ctx.req);
  const { filename, size } = data;
  const filePath = path.resolve(UPLOAD_DIR, `${filename}`);
  await mergeFileChunk(filePath, filename, );
  await next();
  ctx.body = result;
  // ctx.res.end({
  //   code: 0,
  //   message: "file merged success"
  // })
});


// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());


app.listen(3000, () => {
  console.log('[demo] upload-simple is starting at port 3000')
});
