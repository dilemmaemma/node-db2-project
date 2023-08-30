// STRETCH
const cars = [
    {
        vin: '19104759182471957',
        make: "hyundai",
        model: "elantra",
        milage: 69420,
        title: "clean",
        transmission: "automatic"
    },
    {
        vin: '67230501947280183',
        make: "toyota",
        model: "rav4",
        milage: 128422,
        transmission: "automatic"
    },
    {
        vin: '6920547296781958',
        make: "mazda",
        model: "3",
        milage: 53920,
    }
]

exports.seed = async function(knex) {
    await knex('cars').truncate()
    await knex('cars').insert(cars)
}