import { generateRandomArticleData } from '@_src/factories/article.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';
import { waitForResponse } from '@_src/utils/wait.util';

test.describe('Verify articles', () => {
  test('Article can not be created with empty title @GAD-R02-01 @GAD-R07-03 @logged', async ({
    addArticleView,
    page,
  }) => {
    //Arrange

    const articleData = generateRandomArticleData();
    const expectedErrorMessage = 'Article was not created';
    const expectedResponseCode = 422;
    articleData.title = '';
    const responsePromise = waitForResponse(page, '/api/articles');

    //Act
    await addArticleView.createArticle(articleData);
    const response = await responsePromise;

    //Assert
    await expect(addArticleView.alertPopup).toHaveText(expectedErrorMessage);
    expect(response.status()).toBe(expectedResponseCode);
  });

  test('Article can not be created with empty body @GAD-R02-01 @GAD-R07-03 @logged', async ({
    addArticleView,
    page,
  }) => {
    //Arrange
    const articleData = generateRandomArticleData();
    const alertPopupText = 'Article was not created';
    const expectedResponseCode = 422;
    articleData.body = '';

    const responsePromise = waitForResponse(page, '/api/articles');
    //Act
    await addArticleView.createArticle(articleData);
    const response = await responsePromise;

    //Assert
    await expect(addArticleView.alertPopup).toHaveText(alertPopupText);
    expect(response.status()).toBe(expectedResponseCode);
  });

  test('reject creating article with title exceeding 128 signs @GAD-R04-01 @GAD-R07-03 @logged', async ({
    addArticleView,
    page,
  }) => {
    //Arrange
    const alertPopupText = 'Article was not created';
    const articleData = generateRandomArticleData(129);
    const expectedResponseCode = 422;

    const responsePromise = waitForResponse(page, '/api/articles');
    //Act
    await addArticleView.createArticle(articleData);
    const response = await responsePromise;

    //Assert
    await expect(addArticleView.alertPopup).toHaveText(alertPopupText);
    expect(response.status()).toBe(expectedResponseCode);
  });

  test('Create article with title with 128 signs @GAD-R04-01 @GAD-R07-03 @logged', async ({
    addArticleView,
    page,
  }) => {
    //Arrange
    const articleData = generateRandomArticleData(128);
    const expectedResponseCode = 201;

    const responsePromise = waitForResponse(page, '/api/articles');
    //Act
    const articlePage = await addArticleView.createArticle(articleData);
    const response = await responsePromise;

    //Assert
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect
      .soft(articlePage.articleBody)
      .toHaveText(articleData.body, { useInnerText: true });
    expect(response.status()).toBe(expectedResponseCode);
  });
});
