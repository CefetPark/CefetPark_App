import { createModelSchema, identifier, list, object, primitive, alias } from 'serializr';

export class AuthModel {
  id = 0;
  name = '';
  lastName = '';
  token = '';
}

createModelSchema(AuthModel, {
  id: identifier(),
  name: primitive(),
  lastName: primitive(),
  token: primitive(),
});
