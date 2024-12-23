import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Verify menu main buttons', () => {
  test('Comments button navigates to comments page @GAD-R01-03', async ({
    articlesPage,
  }) => {
    //arrange
    const expectedCommentsPageTitle = 'Comments';

    //act
    const commentsPage = await articlesPage.mainMenu.clickCommentsButton();
    const title = await commentsPage.getTitle();

    //Assert
    expect(title).toContain(expectedCommentsPageTitle);
  });
  test('Articles button navigates to articles page @GAD-R01-03', async ({
    commentsPage,
  }) => {
    //arrange
    const expectedArticlesPageTitle = 'Articles';

    //act
    const articlesPage = await commentsPage.mainMenu.clickArticlesButton();
    const title = await articlesPage.getTitle();

    //Assert
    expect(title).toContain(expectedArticlesPageTitle);
  });

  test('HomePage button navigates to homePage @GAD-R01-03', async ({
    articlesPage,
  }) => {
    //arrange
    const expectedHomePageTitle = 'GAD';

    //act
    await articlesPage.goto();
    const homePage = await articlesPage.mainMenu.clickHomePageLink();
    const title = await homePage.getTitle();

    //Assert
    expect(title).toContain(expectedHomePageTitle);
  });
});
