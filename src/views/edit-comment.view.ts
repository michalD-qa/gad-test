import { AddCommentModel } from '@_src/models/comment.model';
import { Page } from '@playwright/test';

export class EditCommentView {
  bodyInput = this.page.locator('#body');
  updateButton = this.page.getByTestId('update-button');
  alertPopup = this.page.getByTestId('alert-popup');

  constructor(private page: Page) {}

  async updateComment(commentModel: AddCommentModel): Promise<void> {
    await this.bodyInput.fill(commentModel.body);
    await this.updateButton.click();
  }
}
