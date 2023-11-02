import { RegisterUser } from '../models/user.model';
import { faker } from '@faker-js/faker';

export function randomUserData(): RegisterUser {
  const registerUserData: RegisterUser = {
    userFirstName: faker.person.firstName().replace(/[^A-Za-z]g/, ''),
    userLastName: faker.person.lastName(),
    userEmail: '',
    userPassword: faker.internet.password(),
  };

  registerUserData.userEmail = faker.internet.email({
    firstName: registerUserData.userFirstName,
    lastName: registerUserData.userLastName,
  });

  return registerUserData;
}
