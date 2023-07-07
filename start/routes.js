'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.group(() => {
    Route.get('/admin', 'HomeController.index');
    Route.get('/admin/dashboard', 'HomeController.index');
    Route.get('/admin/index/:model', 'ModelController.index');
    Route.get('/admin/list/:model', 'ModelController.list');
    Route.get('/admin/create/:model', 'ModelController.create');
    Route.get('/admin/upload/:model/:id', 'ModelController.upload');
    Route.get('/admin/edit/:model/:id', 'ModelController.edit');
    Route.post('/admin/update/:model/:id', 'ModelController.update');
    Route.post('/admin/store/:model', 'ModelController.store');
    Route.post('/upload/:model/:id', 'ModelController.saveupload');
    Route.get('/logout', 'HomeController.logout');
}).middleware(["isLoggedIn"]);

// const getNav = async () => {
//     const Navigations = use(`App/Models/Navigation`);

//     return JSON.parse(JSON.stringify(await Navigations.all()));
// }
// Route.on('/').render('site.index', { navigations: [] });
Route.get('/', 'MainController.construction');
Route.get('/home', 'MainController.genesis');
Route.get('/pages', 'MainController.genesis');
Route.get('/pages/:destination', 'MainController.page');
Route.get('/pages/:destination/:attraction', 'MainController.page');
Route.get('/pages/:destination/:attraction/:activity', 'MainController.page');
Route.post('/book', 'MainController.book');
Route.get('/login', 'HomeController.login');
Route.get('/register', 'HomeController.register');
Route.post('/login', 'HomeController.auth');
Route.post('/signup', 'HomeController.signup');
