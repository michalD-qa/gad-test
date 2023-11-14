import { AddCommentModel } from '@_src/models/comment.model';
import { ArticlePage } from '@_src/pages/article.page';
import { Page } from '@playwright/test';

export class AddCommentView {
  bodyInput = this.page.locator('#body');
  saveButton = this.page.locator('.save');
  alertPopup = this.page.getByTestId('alert-popup');

  constructor(private page: Page) {}
  async createComment(commentModel: AddCommentModel): Promise<ArticlePage> {
    await this.bodyInput.fill(commentModel.body);
    await this.saveButton.click();
    return new ArticlePage(this.page);
  }
}
