'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker) => {
    return {
        id: faker.id(),
        username: faker.username(),
        firstname: faker.firstname(),
        secondname: faker.secondname(),
        email: faker.email(),
        password: faker.password(),
        address: faker.address(),
        gender: faker.gender(),
        role: faker.role(),
    }
})
Factory.blueprint('App/Models/Destination', (faker) => {
    return {
        id: faker.id(),
        destination: faker.destination(),
        caption: faker.caption(),
        description: faker.description(),
        gallery_id: faker.gallery_id(),
        article_id: faker.article_id(),
        created_at: faker.created_at(),
        updated_at: faker.updated_at(),
    }
})
