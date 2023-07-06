const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
    const View = use('View');
    View.global('currentTime', function () {
        return new Date().getTime()
    })
    View.global('isEven', function (n) {
        return n % 2 == 0;
    })
    View.global('isOdd', function (n) {
        return Math.abs(n % 2) == 1;
    })
})