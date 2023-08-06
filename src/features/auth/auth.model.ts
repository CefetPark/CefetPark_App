import { createModelSchema, alias, primitive, object, serializable, list, serialize } from 'serializr';

export class UserModel {
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

export class CarsModel {
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
