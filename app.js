const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');
const path =  require('path');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new KoaRouter();

// Replace with DB
const things = [
    'My Family',
    'Programming',
    'Music'
];

// json Prettier Middleware
app.use(json());

//BodyParser Middleware
app.use(bodyParser());

// Add additional properties to context
app.context.user = 'Dominic'

// Simple  Middleware Example
// appuse(async ctx => (ctx.body = {msg: 'Hello World'}));

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: false
});

// Routes
router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add);

// List of Things
async function index (ctx) {
    await ctx.render('index', {
        title: 'Things I Love',
        things: things
    });
}

// Show Add Page
async function showAdd (ctx) {
    await ctx.render('Add');
}

// Add Thing
async function add (ctx) {
    const body = ctx.request.body;
    console.log(body);
    things.push(body.thing);
    ctx.redirect('/');
}

// // Index
// router.get('/', async ctx => {
//     await ctx.render('index', {
//         title: 'Things I Love',
//         things: things
//     });
// });

router.get('/test', ctx => (ctx.body = `Hello ${ctx.user}`));
router.get('/test2/:name', ctx => (ctx.body = `Hello ${ctx.params.name}`));

// Router Middleware
app.use(router.routes()).use(router.allowedMethods);

app.listen(3000, () => {
    console.log('Server Started');
});
