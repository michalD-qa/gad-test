import {
  randomArticleData,
  randomArticleDataWithSpecifiedValues,
} from '../src/factories/article.factory';
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

    const articleData = randomArticleData();

    await addArticleView.createArticle(articleData);

    //Assert
    const articlePage = new ArticlePage(page);
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect
      .soft(articlePage.articleBody)
      .toHaveText(articleData.body, { useInnerText: true });
  });

  test('Article can not be created with empty title @GAD-R02-01', async ({
    page,
  }) => {
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

    // const articleDataWithEmptyTitle = randomArticleData();
    const articleDataWithEmptyTitle = randomArticleDataWithSpecifiedValues(
      '',
      undefined,
    );

    await addArticleView.createArticle(articleDataWithEmptyTitle);

    //Assert
    const alertPopupText = 'Article was not created';
    await expect(addArticleView.alertPopup).toHaveText(alertPopupText);
  });

  test('Article can not be created with empty body @GAD-R02-01', async ({
    page,
  }) => {
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

    // const articleDataWithEmptyTitle = randomArticleData();
    const articleDataWithEmptyBody = randomArticleDataWithSpecifiedValues(
      undefined,
      '',
    );

    await addArticleView.createArticle(articleDataWithEmptyBody);

    //Assert
    const alertPopupText = 'Article was not created';
    await expect(addArticleView.alertPopup).toHaveText(alertPopupText);
  });
});
