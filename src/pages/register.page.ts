import { BasePage } from './base.page';
import { RegisterUserModel } from '@_src/models/user.model';
import { Page } from '@playwright/test';

export class RegisterPage extends BasePage {
  url = '/register.html';

  constructor(page: Page) {
    super(page);
  }

  private firstName = this.page.getByTestId('firstname-input');
  private lastName = this.page.getByTestId('lastname-input');
  private email = this.page.getByTestId('email-input');
  private password = this.page.getByTestId('password-input');
  private registerButton = this.page.getByTestId('register-button');
  alertPopUp = this.page.getByTestId('alert-popup');
  emailErrorText = this.page.locator('#octavalidate_email');

  async registerUser(registerUserData: RegisterUserModel): Promise<void> {
    await this.firstName.fill(registerUserData.userFirstName);
    await this.lastName.fill(registerUserData.userLastName);
    await this.email.fill(registerUserData.userEmail);
    await this.password.fill(registerUserData.userPassword);
    await this.registerButton.click();
  }
}
