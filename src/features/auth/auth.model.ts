import { alias, createModelSchema, list, object, primitive, serializable } from 'serializr';

export class UserModel {
  aspNetUsersId = ''
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
  colorId = 0;
  modelId = 0;
}

createModelSchema(AuthModel, {
  token: primitive(),
  user: alias('usuario', object(UserModel))
});

createModelSchema(UserModel, {
  aspNetUsersId: alias('aspNetUsers_id', primitive()),
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
