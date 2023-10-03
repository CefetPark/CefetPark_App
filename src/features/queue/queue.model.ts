import { alias, createModelSchema, list, object, primitive, date } from 'serializr';

export class UsersModel {
    carId = 0;
    userId = 0;
    entryDate = new Date;
    position = 0
}

export class QueueModel {
    parkingLotId = 0;
    members: UsersModel[] = [];
    parkingRequest = null
}

createModelSchema(UsersModel, {
    carId: alias('carro_Id', primitive()),
    userId: alias('usuario_Id', primitive()),
    entryDate: alias('dataEntrada', date()),
    position: alias('posicao', primitive())
})

createModelSchema(QueueModel, {
    parkingLotId: alias('estacionamento_Id', primitive()),
    members: alias('integrantes', list(object(QueueModel))),
    parkingRequest: alias('estacionamento_id', primitive()),
})