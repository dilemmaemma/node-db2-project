const express = require('express')
const router = express.Router()

const Car = require('./cars-model')
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberUnique,
    checkVinNumberValid
} = require('./cars-middleware')

router.get('/', async (req, res, next) => {
    try {
        const cars = await Car.getAll()
        res.json(cars)
    } catch (err) {
        next(err)
    }
})
router.get('/:id', checkCarId, async (req, res) => {
    res.json(req.car)
})
router.post(
    '/', 
    checkCarPayload, 
    checkVinNumberUnique, 
    checkVinNumberValid, 
    async (req, res, next) => {
        try {
            const car = await Car.create(req.body)
            res.json(car)
        } catch (err) {
            next(err)
        }
})

module.exports = router