const Car = require('./cars-model')
const vin = require('vin-validator')

const checkCarId = async (req, res, next) => {
  try {
    const car = await Car.getById(req.params.id)
    if (!car) {
      next({ status: 404, message: `car with id ${req.params.id} is not found`})
    } else {
      req.car = car
      next()
    }
} catch (err) {
    next(err)
}
}

const checkCarPayload = (req, res, next) => {
  try {
    let missing = null

    if (!req.body.vin) missing = 'vin'
    else if (!req.body.make) missing = 'make'
    else if (!req.body.model) missing = 'model'
    else if (!req.body.mileage) missing = 'mileage'
    else {
      next()
    }
  
    if (missing) next({ status: 400, message: `${missing} is missing`})
  } catch (err) {
      next(err)
  }
  
}

const checkVinNumberValid = (req, res, next) => {
  if (vin.validate(req.body.vin)) {
    next()
  } else {
    next({ status: 400, message: `vin ${req.body.vin} is invalid`})
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const existingVin = await Car.getByVin(req.body.vin)
    if (!existingVin) {
      next()
    } else {
      next({ status: 400, message: `vin ${req.body.vin} already exists`})
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}