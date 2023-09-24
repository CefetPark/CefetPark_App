import { alias, createModelSchema, primitive } from 'serializr';

export class QueueModel {
    id = '';
    aspNetUsersId = '';
    name = '';
    parkingLotId = 0;
}

createModelSchema(QueueModel, {
    id: primitive(),
    aspNetUsersId: primitive(),
    name: alias('nome', primitive()),
    parkingLotId: alias('estacionamento_id', primitive())
})