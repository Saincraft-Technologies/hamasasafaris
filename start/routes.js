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
    Route.get('/admin/edit/:model/:id', 'ModelController.edit');
    Route.post('/admin/update/:model/:id', 'ModelController.update');
    Route.post('/admin/store/:model', 'ModelController.store');
    Route.get('/logout', 'HomeController.logout');
}).middleware(["isLoggedIn"]);

Route.on('/').render('site.index');
Route.get('/pages/:modal', 'PagesController.index');
Route.post('/book', 'MainController.book');
Route.get('/login', 'HomeController.login');
Route.get('/register', 'HomeController.register');
Route.post('/login', 'HomeController.auth');
Route.post('/signup', 'HomeController.signup');
