import { alias, createModelSchema, list, object, primitive } from "serializr"

export class Cars {
    plate: string = ''
    colorId: number = 0
    modelId: number = 0
}

export class Guest {
    name: string = ''
    cpf: string = ''
    cars: Cars = { plate: '', colorId: 0, modelId: 0 }
}

createModelSchema(Guest, {
    name: alias('nome', primitive()),
    cpf: primitive(),
    cars: alias('carros', list(object(Cars)))
})