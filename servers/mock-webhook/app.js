const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
app.use(bodyParser())
const router = new Router();
const port = process.env.PORT || 3000
router.get('/', (ctx, next) => {
  ctx.body = `Server is running at ${port}`
});

router.post('/', (ctx, next) => {
  console.log(JSON.stringify(ctx.request.body))
  ctx.status = 200
});

app
  .use(router.routes())
  .use(router.allowedMethods());

console.log(`Running server on port ${port}...`)
app.listen(port);
