import { ArticlesPage } from '@_src/pages/articles.page';
import { CommentsPage } from '@_src/pages/comments.page';
import { HomePage } from '@_src/pages/home.page';
import { Page } from '@playwright/test';

export class MainMenuComponent {
  commentsButton = this.page.getByTestId('open-comments');
  articlesButton = this.page.getByTestId('open-articles');
  homePageLink = this.page.getByRole('link', { name: '🦎 GAD' });
  constructor(private page: Page) {}

  async clickCommentsButton(): Promise<CommentsPage> {
    await this.commentsButton.click();
    return new CommentsPage(this.page);
  }

  async clickArticlesButton(): Promise<CommentsPage> {
    await this.articlesButton.click();
    return new ArticlesPage(this.page);
  }

  async clickHomePageLink(): Promise<HomePage> {
    await this.homePageLink.click();
    return new HomePage(this.page);
  }
}
