import { Page } from '@playwright/test';

export class AddCommentView {
  // addNewHeader = this.page.getByRole('heading', { name: 'Add New Entry' });
  // titleInput = this.page.getByTestId('title-input');
  bodyInput = this.page.locator('#body');
  saveButton = this.page.locator('.save');
  alertPopup = this.page.getByTestId('alert-popup');

  constructor(private page: Page) {}
  async createComment(commentText: string): Promise<void> {
    await this.bodyInput.fill(commentText);
    await this.saveButton.click();
  }
}
