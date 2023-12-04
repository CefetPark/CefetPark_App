import { alias, createModelSchema, list, object, primitive, serializable } from 'serializr';

export class GraphModel {
    @serializable(primitive())
    hours: string[] = []

    @serializable(primitive())
    data: number[] = []
}

createModelSchema(GraphModel, {
    hours: alias('horarios', list(primitive())),
    data: alias('mediasQtdLivresPorHorario', list(primitive()))
})