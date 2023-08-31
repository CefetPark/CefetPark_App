import { CarsModel } from "@features/cars/cars.model"
import { alias, createModelSchema, object, primitive, serializable } from "serializr"

export class RegisterModel {
    @serializable(primitive())
    id = 0
    @serializable(primitive())
    entryDate = new Date()
    @serializable(primitive())
    parkingLotId = 0
    @serializable(object(CarsModel))
    car = {
        id: 0,
        plate: '',
        color: '',
        model: ''
    }
}

createModelSchema(RegisterModel, {
    id: primitive(),
    entryDate: alias('dataEntrada', primitive()),
    parkingLotId: alias('estacionamento_Id', primitive()),
    car: alias('carro', object(CarsModel))
})