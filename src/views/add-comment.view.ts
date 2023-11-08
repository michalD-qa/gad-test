import { AddCommentModel } from '../models/comment.model';
import { Page } from '@playwright/test';

export class AddCommentView {
  // addNewHeader = this.page.getByRole('heading', { name: 'Add New Entry' });
  // titleInput = this.page.getByTestId('title-input');
  bodyInput = this.page.locator('#body');
  saveButton = this.page.locator('.save');
  alertPopup = this.page.getByTestId('alert-popup');

  constructor(private page: Page) {}
  async createComment(commentModel: AddCommentModel): Promise<void> {
    await this.bodyInput.fill(commentModel.body);
    await this.saveButton.click();
  }
}
