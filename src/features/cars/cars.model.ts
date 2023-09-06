import { alias, createModelSchema, list, object, primitive, serializable } from 'serializr';

class UserModel {
    id = 0
    cpf = '';
    enrollment = '';
    name = '';
    mainPhoneNumber = '';
    secondaryPhoneNumber = '';
    mainEmail = '';
    secondaryEmail = '';
    department = '';
    userType = '';
    cars: CarsModel[] = [];
}

export class CarsModel {
    @serializable(primitive())
    id = 0
    @serializable(primitive())
    plate = ''
    @serializable(primitive())
    color = ''
    @serializable(primitive())
    model = ''
    @serializable(list(object(UserModel)))
    users: UserModel[] = []
}

createModelSchema(CarsModel, {
    id: primitive(),
    plate: alias('placa', primitive()),
    color: alias('cor', primitive()),
    model: alias('modelo', primitive()),
    users: alias('usuarios', list(object(UserModel)))
})

createModelSchema(UserModel, {
    id: primitive(),
    cpf: primitive(),
    enrollment: alias('matricula', primitive()),
    name: alias('nome', primitive()),
    mainPhoneNumber: alias('telefonePrincipal', primitive()),
    secondaryPhoneNumber: alias('telefoneSecundario', primitive()),
    mainEmail: alias('emailPrincipal', primitive()),
    secondaryEmail: alias('emailSecundario', primitive()),
    department: alias('departamento', primitive()),
    userType: alias('tipoUsuario', primitive()),
    cars: alias('carros', list(object(CarsModel)))
});