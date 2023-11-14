import { AddCommentModel } from '@_src/models/comment.model';
import { CommentPage } from '@_src/pages/comment.page';
import { Page } from '@playwright/test';

export class EditCommentView {
  bodyInput = this.page.locator('#body');
  updateButton = this.page.getByTestId('update-button');
  alertPopup = this.page.getByTestId('alert-popup');

  constructor(private page: Page) {}

  async updateComment(commentModel: AddCommentModel): Promise<CommentPage> {
    await this.bodyInput.fill(commentModel.body);
    await this.updateButton.click();
    return new CommentPage(this.page);
  }
}
