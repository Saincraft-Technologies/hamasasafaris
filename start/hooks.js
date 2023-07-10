'use strict'
const { hooks } = require('@adonisjs/ignitor')
const ENV = require('@adonisjs/framework/src/Env');

/** @type {import('@adonisjs/framework/src/Env')} */

const Env = new ENV('./')
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
    });
    View.global('cdnLocal', (path) => {
        return Env.get('CDN_HAMASA') + path;
    })
    View.global('cdn', (path) => {
        return Env.get('CDN') + path;
    })
})