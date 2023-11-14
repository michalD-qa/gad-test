import { generateRandomArticleData } from '@_src/factories/article.factory';
import { AddArticleModel } from '@_src/models/article.model';
import { ArticlesPage } from '@_src/pages/articles.page';
import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });
test.describe('Create, verify and delete article', () => {
  let articlesPage: ArticlesPage;
  let articleData: AddArticleModel;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);
    await articlesPage.goto();
  });

  test('Create new article @GAD-R04-01 @logged', async () => {
    //Arrange
    articleData = generateRandomArticleData();
    const addArticleView = await articlesPage.clickAddArticleButton();
    await expect.soft(addArticleView.addNewHeader).toBeVisible();

    //Act
    const articlePage = await addArticleView.createArticle(articleData);

    //Assert
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect
      .soft(articlePage.articleBody)
      .toHaveText(articleData.body, { useInnerText: true });
  });

  test('user can access single article @GAD-R04-03 @logged', async () => {
    //Arrange

    //Act
    const articlePage = await articlesPage.gotoArticle(articleData.title);

    //Assert
    await expect.soft(articlePage.articleTitle).toHaveText(articleData.title);
    await expect
      .soft(articlePage.articleBody)
      .toHaveText(articleData.body, { useInnerText: true });
  });

  test('user can delete they own article @GAD-R04-04 @logged', async () => {
    //Arrange
    const expectedArticlesPageTitle = 'Articles';
    const expectedNoResultText = 'No data';
    const articlePage = await articlesPage.gotoArticle(articleData.title);

    //Act
    articlesPage = await articlePage.deleteArticle();

    //Assert
    await articlesPage.waitForPageToLoadUrl();
    const title = await articlesPage.getTitle();
    expect(title).toContain(expectedArticlesPageTitle);

    //no-results
    articlesPage = await articlesPage.searchArticle(articleData.title);
    await expect(articlesPage.noResultText).toHaveText(expectedNoResultText);
  });
});
