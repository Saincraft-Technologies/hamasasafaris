'use strict'
const User = use('App/Models/User');
class HomeController {
    async index({ auth, view }) {
        console.log(await auth.getUser());
        return view.render('admin.dashboard', { loggedInUser: await auth.getUser() });
    }
    async login({ view }) {
        let user = await User.all();

        console.log(user);
        return view.render('admin.login');
    }
    async register({ view }) {
        return view.render('admin.register');
    }
    async signup({ request, response, session }) {
        const user = await new User();
        try {

            user.email = request.input('email');
            user.username = request.input('username');
            user.password = request.input('password');
            await user.save();

            session.flash({ status: true, notification: 'user added successfully' });
            return response.redirect('/login');
        } catch (error) {

            session.flash({ notification: error.message });
            return response.redirect('/register');
        }
    }
    async auth({ auth, request, response, session }) {
        // let user = await User.query().where('email', request.input('email')).fetch();
        const { email, password } = request.all();
        try {

            const authCheck = auth.remember(true).attempt(email, password)
            if (authCheck) {
                console.log(await authCheck);
                return response.redirect('/admin')
            }
            return response.redirect('/login')
        } catch (error) {
            console.log(error.message);
            session.flash({ status: false, notification: error.message });
            return response.redirect('/login');

        }
    }
    async logout({ auth, response }) {
        await auth.logout();
        response.redirect('/login')
    }
}

module.exports = HomeController
