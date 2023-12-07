import { ArticlesPage } from '@_src/pages/articles.page';
import { CommentsPage } from '@_src/pages/comments.page';
import { test as baseTest, expect } from '@playwright/test';

interface Pages {
  articlesPage: ArticlesPage;
  commentsPage: CommentsPage;
}

const test = baseTest.extend<Pages>({
  articlesPage: async ({ page }, use) => {
    const articlesPage = new ArticlesPage(page);
    await articlesPage.goto();
    await use(articlesPage);
  },
  commentsPage: async ({ page }, use) => {
    const commentsPage = new CommentsPage(page);
    await commentsPage.goto();
    await use(commentsPage);
  },
});

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
