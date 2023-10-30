import { BasePage } from './base.page';
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

  async registerUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<void> {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.password.fill(password);
    await this.registerButton.click();
  }
}
