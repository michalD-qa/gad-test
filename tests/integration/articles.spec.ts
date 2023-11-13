import { generateRandomArticleData } from '@_src/factories/article.factory';
import { ArticlePage } from '@_src/pages/article.page';
import { ArticlesPage } from '@_src/pages/articles.page';
import { AddArticleView } from '@_src/views/add-article.view';
import { expect, test } from '@playwright/test';

test.describe('Verify articles', () => {
  //let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);

    await articlesPage.goto();
    await articlesPage.addArticleButton.click();
    await expect.soft(addArticleView.addNewHeader).toBeVisible();
  });

  test('Article can not be created with empty title @GAD-R02-01 @logged', async () => {
    //Arrange
    const articleData = generateRandomArticleData();
    const alertPopupText = 'Article was not created';
    articleData.title = '';

    //Act
    await addArticleView.createArticle(articleData);

    //Assert
    await expect(addArticleView.alertPopup).toHaveText(alertPopupText);
  });

  test('Article can not be created with empty body @GAD-R02-01 @logged', async () => {
    //Arrange
    const articleData = generateRandomArticleData();
    const alertPopupText = 'Article was not created';
    articleData.body = '';

    //Act
    await addArticleView.createArticle(articleData);

    //Assert
    await expect(addArticleView.alertPopup).toHaveText(alertPopupText);
  });
  test('reject creating article with title exceeding 128 signs @GAD-R04-01 @logged', async () => {
    //Arrange
    const alertPopupText = 'Article was not created';
    const articleData = generateRandomArticleData(129);

    //Act
    await addArticleView.createArticle(articleData);

    //Assert
    await expect(addArticleView.alertPopup).toHaveText(alertPopupText);
  });

  test('Create article with title with 128 signs @GAD-R04-01 @logged', async ({
    page,
  }) => {
    //Arrange
    const articleData = generateRandomArticleData(128);
    const articlePage = new ArticlePage(page);

    //Act
    await addArticleView.createArticle(articleData);

    //Assert
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect
      .soft(articlePage.articleBody)
      .toHaveText(articleData.body, { useInnerText: true });
  });
});