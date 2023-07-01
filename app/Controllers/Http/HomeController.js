'use strict'
const User = use('App/Models/User');
class HomeController {
    async index({ view }) {
        return view.render('admin.dashboard');
    }
    async login({ view }) {
        let user = await User.all();
        console.log(user);
        return view.render('admin.login');
    }
    async register({ view }) {
        return view.render('admin.register');
    }
    async signup({ auth, request, response, session }) {
        const user = await new User();
        try {

            user.email = request.input('email');
            user.username = request.input('username');
            user.password = request.input('password');
            await user.save();

            session.flash({ notification: 'user added successfully' });
            response.redirect('/login');
        } catch (error) {

            session.flash({ notification: error.message });
            response.redirect('/register');
        }
    }
    async auth({ auth, request, response, session }) {
        // let user = await User.query().where('email', request.input('email')).fetch();
        const { email, password } = request.all();
        try {
            const authCheck = auth.attempt(email, password)
            if (authCheck) {
                console.log(await authCheck);
                return response.redirect('/admin')
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = HomeController
