import { alias, createModelSchema, primitive } from "serializr"

export class Colors {
    id: number = 0
    name: string = ''
}

createModelSchema(Colors, {
    id: primitive(),
    name: alias('nome', primitive())
})