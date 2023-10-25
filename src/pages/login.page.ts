import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = '/login';
  userEmailInput = this.page.getByPlaceholder('Enter User Email');
  passwordInput = this.page.getByPlaceholder('Enter Password');
  loginButton = this.page.getByRole('button', { name: 'LogIn' });
  loginErrorText = this.page.getByTestId('login-error');

  constructor(page: Page) {
    super(page);
  }

  async loginUser(email: string, password: string): Promise<void> {
    await this.userEmailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
