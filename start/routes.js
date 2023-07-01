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
    Route.on('/admin').render('admin.empty');

    Route.get('/admin/dashboard', 'HomeController.index');
    Route.get('/admin/destinations/create', 'DestinationController.create');
    Route.get('/admin/destinations/list', 'DestinationController.list');
    Route.get('/admin/itineraries/create', 'ItineraryController.create');
    Route.get('/admin/itineraries/list', 'ItineraryController.list');
}).middleware(["auth"]);

Route.on('/').render('site.index');
Route.get('/parks/ngorongoro', 'NgorongoroController.index');
Route.get('/parks/manyara', 'ManyaraController.index');
Route.get('/parks/serengeti', 'SerengetiController.index');
Route.get('/parks/arusha', 'ArushaController.index');
Route.get('/mountains/kilimanjaro', 'KilimanjaroController.index');
Route.get('/mountains/meru', 'MeruController.index');
Route.get('/cultural/maasai', 'MaasaiController.index');
Route.get('/cultural/hadzabe', 'HadzabeController.index');
Route.get('/login', 'HomeController.login');
Route.get('/register', 'HomeController.register');
Route.post('/login', 'HomeController.auth');
Route.post('/signup', 'HomeController.signup');
