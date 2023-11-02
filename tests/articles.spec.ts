import { ArticlePage } from '../src/pages/article.page';
import { ArticlesPage } from '../src/pages/articles.page';
import { LoginPage } from '../src/pages/login.page';
import { testUser1 } from '../src/test-data/user.data';
import { AddArticleView } from '../src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe('Verify articles', () => {
  test('Create new article @GAD-R02-01', async ({ page }) => {
    //Arrange
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginUser(testUser1);

    const articlesPage = new ArticlesPage(page);
    await articlesPage.goto();
    await articlesPage.addArticleButton.click();

    //Act
    const addArticleView = new AddArticleView(page);
    await expect.soft(addArticleView.header).toBeVisible();

    const newArticleTitle = 'test title';
    await addArticleView.titleInput.fill(newArticleTitle);
    const newArticleBody = 'body input';
    await addArticleView.bodyInput.fill(newArticleBody);
    await addArticleView.saveButton.click();

    //Assert
    const articlePage = new ArticlePage(page);
    await expect.soft(articlePage.articleTitle).toHaveText(newArticleTitle);
    await expect.soft(articlePage.articleBody).toHaveText(newArticleBody);
  });
});
