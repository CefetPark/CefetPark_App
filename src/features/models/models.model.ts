import { alias, createModelSchema, primitive } from 'serializr';

export class Models {
    id: number = 0;
    name: string = ''
}

createModelSchema(Models, {
    id: primitive(),
    name: alias('nome', primitive()),
})