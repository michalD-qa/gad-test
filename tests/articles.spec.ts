import { randomArticleData } from '../src/factories/article.factory';
import { AddArticleModel } from '../src/models/article.model';
import { ArticlePage } from '../src/pages/article.page';
import { ArticlesPage } from '../src/pages/articles.page';
import { LoginPage } from '../src/pages/login.page';
import { testUser1 } from '../src/test-data/user.data';
import { AddArticleView } from '../src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe('Verify articles', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: AddArticleModel;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);
    articleData = randomArticleData();

    await loginPage.goto();
    await loginPage.loginUser(testUser1);
    await articlesPage.goto();
    await articlesPage.addArticleButton.click();
    await expect.soft(addArticleView.header).toBeVisible();
  });
  test('Create new article @GAD-R02-01', async ({ page }) => {
    //Arrange
    const articlePage = new ArticlePage(page);

    //Act
    await addArticleView.createArticle(articleData);

    //Assert
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect
      .soft(articlePage.articleBody)
      .toHaveText(articleData.body, { useInnerText: true });
  });

  test('Article can not be created with empty title @GAD-R02-01', async () => {
    //Arrange
    const alertPopupText = 'Article was not created';
    articleData.title = '';

    //Act
    await addArticleView.createArticle(articleData);

    //Assert
    await expect(addArticleView.alertPopup).toHaveText(alertPopupText);
  });

  test('Article can not be created with empty body @GAD-R02-01', async () => {
    //Arrange
    const alertPopupText = 'Article was not created';
    articleData.body = '';

    //Act
    await addArticleView.createArticle(articleData);

    //Assert
    await expect(addArticleView.alertPopup).toHaveText(alertPopupText);
  });
});
