import { generateRandomArticleData } from '@_src/factories/article.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Verify articles', () => {
  test('Article can not be created with empty title @GAD-R02-01 @logged', async ({
    addArticleView,
  }) => {
    //Arrange
    const articleData = generateRandomArticleData();
    const alertPopupText = 'Article was not created';
    articleData.title = '';

    //Act
    await addArticleView.createArticle(articleData);

    //Assert
    await expect(addArticleView.alertPopup).toHaveText(alertPopupText);
  });

  test('Article can not be created with empty body @GAD-R02-01 @logged', async ({
    addArticleView,
  }) => {
    //Arrange
    const articleData = generateRandomArticleData();
    const alertPopupText = 'Article was not created';
    articleData.body = '';

    //Act
    await addArticleView.createArticle(articleData);

    //Assert
    await expect(addArticleView.alertPopup).toHaveText(alertPopupText);
  });
  test('reject creating article with title exceeding 128 signs @GAD-R04-01 @logged', async ({
    addArticleView,
  }) => {
    //Arrange
    const alertPopupText = 'Article was not created';
    const articleData = generateRandomArticleData(129);

    //Act
    await addArticleView.createArticle(articleData);

    //Assert
    await expect(addArticleView.alertPopup).toHaveText(alertPopupText);
  });

  test('Create article with title with 128 signs @GAD-R04-01 @logged', async ({
    addArticleView,
  }) => {
    //Arrange
    const articleData = generateRandomArticleData(128);

    //Act
    const articlePage = await addArticleView.createArticle(articleData);

    //Assert
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect
      .soft(articlePage.articleBody)
      .toHaveText(articleData.body, { useInnerText: true });
  });
});
