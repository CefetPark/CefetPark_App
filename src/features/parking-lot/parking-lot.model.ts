import { alias, createModelSchema, identifier, object, primitive, serializable } from 'serializr';

export class AddressModel {
    id = 0
    name = ""
    number = ""
    complement = null
    neighborhood = ""
    zipCode = ""
    longitude = ""
    latitude = ""
    addressType = ""
}

export class ParkingLotModel {
    @serializable(primitive())
    id = 0

    @serializable(primitive())
    name = ''

    @serializable(primitive())
    totalParkingSpots = 0

    @serializable(primitive())
    freeSpots = 0

    @serializable(object(AddressModel))
    address = {
        id: 0,
        name: "",
        number: "",
        complement: "",
        neighborhood: "",
        zipCode: "",
        longitude: "",
        latitude: "",
        addressType: "",
    }
}

createModelSchema(AddressModel, {
    id: identifier(),
    name: alias('nome', primitive()),
    number: alias('numero', primitive()),
    complement: alias('complemento', primitive()),
    neighborhood: alias('bairro', primitive()),
    zipCode: alias('cep', primitive()),
    longitude: primitive(),
    latitude: primitive(),
    addressType: alias('tipoLogradouro', primitive()),
})

createModelSchema(ParkingLotModel, {
    id: identifier(),
    name: alias('nome', primitive()),
    totalParkingSpots: alias('qtdVagasTotal', primitive()),
    freeSpots: alias('qtdVagasLivres', primitive()),
    address: alias('endereco', object(AddressModel))
})