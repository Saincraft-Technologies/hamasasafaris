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
    Route.get('/admin/activity/:model/:id', 'ModelController.addStopPointActivity');
    Route.get('/admin/stopPoint/:model/:id', 'ModelController.stopPoint');
    Route.post('/admin/update/:model/:id', 'ModelController.update');
    Route.post('/admin/activity/:model/:id', 'ModelController.storeStopPointActivity');
    Route.post('/admin/store/:model', 'ModelController.store');
    Route.get('/admin/selector/:model', 'ModelController.selector');
    Route.get('/admin/selector/:model/:id', 'ModelController.selector');
    Route.delete('/admin/delete/:model/:id', 'ModelController.delete');
    /*** Upload File Proccessing */
    Route.get('/upload/:model/:id/:fileId', 'ModelController.viewupload');
    Route.delete('/upload/:model/:id/:fileId', 'ModelController.deleteupload');
    Route.post('/uploader/:model/:id', 'ModelController.saveupload');
    Route.post('/uploads/:model/:id/:fileId', 'ModelController.updateupload');
    /*** End of file proccessing */
    Route.get('/storage/uploads/:model/:id', 'ModelController.gallery');

    Route.get('/logout', 'HomeController.logout');
}).middleware(["isLoggedIn"]);

// const getNav = async () => {
//     const Navigations = use(`App/Models/Navigation`);

//     return JSON.parse(JSON.stringify(await Navigations.all()));
// }
// Route.on('/').render('site.index', { navigations: [] });
Route.get('/', 'MainController.genesis');
Route.get('/home', 'MainController.genesis');
Route.get('/pages', 'MainController.genesis');

Route.get('/destinations', 'MainController.destination');
Route.get('/destinations/:destination', 'MainController.destination');
Route.get('/destinations/:destination/:attraction', 'MainController.destination');
Route.get('/destinations/:destination/:attraction/:activity', 'MainController.destination');


Route.get('/attractions', 'MainController.attraction');
Route.get('/attractions/:attraction', 'MainController.attraction');
Route.get('/attractions/:attraction/:activity', 'MainController.attraction');

Route.get('/galleries/:model/:modelId', 'MainController.gallery');


Route.post('/bookings/book', 'MainController.book');

Route.get('/packages', 'MainController.packages');
Route.get('/packages/:ppackage', 'MainController.package');
Route.get('/packages/:ppackage/:stoppoint', 'MainController.package');
Route.get('/packages/:ppackage/:stoppoint/:activity', 'MainController.package');

Route.get('/activities', 'MainController.activity');
Route.get('/activities/:activity', 'MainController.activity');
// Route.get('/activities/:activity/:activity', 'MainController.activity');


Route.get('/accommodations', 'MainController.accommodation');
Route.get('/accommodations/:accommodation', 'MainController.accommodation');
Route.get('/accommodations/:accommodation/:activity', 'MainController.accommodation');

Route.get('/about', 'MainController.about');
Route.get('/questions', 'MainController.questions');
Route.get('/book', 'HomeController.book');

Route.get('/login', 'HomeController.login');
Route.get('/register', 'HomeController.register');
Route.post('/login', 'HomeController.auth');
Route.post('/signup', 'HomeController.signup');
