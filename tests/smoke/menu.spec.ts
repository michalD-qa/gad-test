import { ArticlesPage } from '@_src/pages/articles.page';
import { CommentsPage } from '@_src/pages/comments.page';
import { expect, test } from '@playwright/test';

test.describe('Verify menu main buttons', () => {
  test('Comments button navigates to comments page @GAD-R01-03', async ({
    page,
  }) => {
    //arrange
    const expectedCommentsPageTitle = 'Comments';
    const articlesPage = new ArticlesPage(page);

    //act
    await articlesPage.goto();
    const commentsPage = await articlesPage.mainMenu.clickCommentsButton();
    const title = await commentsPage.getTitle();

    //Assert
    expect(title).toContain(expectedCommentsPageTitle);
  });
  test('Articles button navigates to articles page @GAD-R01-03', async ({
    page,
  }) => {
    //arrange
    const expectedArticlesPageTitle = 'Articles';
    const commentsPage = new CommentsPage(page);

    //act
    await commentsPage.goto();
    const articlesPage = await commentsPage.mainMenu.clickArticlesButton();
    const title = await articlesPage.getTitle();

    //Assert
    expect(title).toContain(expectedArticlesPageTitle);
  });

  test('HomePage button navigates to homePage @GAD-R01-03', async ({
    page,
  }) => {
    //arrange
    const expectedHomePageTitle = 'GAD';
    const articlesPage = new ArticlesPage(page);

    //act
    await articlesPage.goto();
    const homePage = await articlesPage.mainMenu.clickHomePageLink();
    const title = await homePage.getTitle();

    //Assert
    expect(title).toContain(expectedHomePageTitle);
  });
});
