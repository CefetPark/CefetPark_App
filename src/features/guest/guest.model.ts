import { alias, createModelSchema, list, object, primitive } from "serializr"

export class Cars {
    plate: string = ''
}

export class Guest {
    name: string = ''
    cpf: string = ''
    sicap: string = ''
    cars: Cars = { plate: '' }
}

createModelSchema(Guest, {
    name: alias('nome', primitive()),
    cpf: primitive(),
    cars: alias('carros', list(object(Cars)))
})