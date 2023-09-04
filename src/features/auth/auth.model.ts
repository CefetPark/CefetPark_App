import { alias, createModelSchema, list, object, primitive, serializable } from 'serializr';

export class UserModel {
  id = '';
  aspNetUsersId = '';
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
export class AuthModel {
  @serializable(primitive())
  token = '';
  @serializable(object(UserModel))
  user = {}
}

class CarsModel {
  id = 0;
  plate = '';
  color = '';
  model = '';
}

createModelSchema(CarsModel, {
  id: primitive(),
  plate: alias('placa', primitive()),
  color: alias('cor', primitive()),
  model: alias('modelo', primitive()),
})

createModelSchema(AuthModel, {
  token: primitive(),
  user: alias('usuario', object(UserModel))
});

createModelSchema(UserModel, {
  id: primitive(),
  aspNetUsersId: alias('aspNetUsers_Id', primitive()),
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
