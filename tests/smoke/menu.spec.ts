import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentsPage } from '../../src/pages/comments.page';
import { HomePage } from '../../src/pages/home.page';
import { expect, test } from '@playwright/test';

test.describe('Verify menu main buttons', () => {
  test('Comments button navigates to comments page @GAD-R01-03', async ({
    page,
  }) => {
    //arrange

    const articlesPage = new ArticlesPage(page);
    const commentsPage = new CommentsPage(page);

    //act
    await articlesPage.goto();
    await articlesPage.mainMenu.commentsButton.click();

    //Assert
    const title = await commentsPage.title();
    expect(title).toContain('Comments');
  });
  test('Articles button navigates to articles page @GAD-R01-03', async ({
    page,
  }) => {
    //arrange

    const articlesPage = new ArticlesPage(page);
    const commentsPage = new CommentsPage(page);

    //act
    await commentsPage.goto();
    await commentsPage.mainMenu.articlesButton.click();

    //Assert
    const title = await articlesPage.title();
    expect(title).toContain('Articles');
  });

  test('HomePage button navigates to homePage @GAD-R01-03', async ({
    page,
  }) => {
    //arrange
    const articlesPage = new ArticlesPage(page);
    const homePage = new HomePage(page);

    //act
    await articlesPage.goto();
    await articlesPage.mainMenu.homePageButton.click();

    //Assert
    const title = await homePage.title();
    expect(title).toContain('GAD');
  });
});
