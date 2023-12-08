import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Verify main pages', () => {
  test('Home page title @GAD-R01-01', async ({ homePage }) => {
    //Arrange
    const expectedHomePageTitle = 'GAD';

    //Assert
    const title = await homePage.getTitle();
    expect(title).toContain(expectedHomePageTitle);
  });

  test('Articles page title @GAD-R01-02', async ({ articlesPage }) => {
    //Arrange
    const expectedArticlesPageTitle = 'Articles';

    //Assert
    const title = await articlesPage.getTitle();
    expect(title).toContain(expectedArticlesPageTitle);
  });

  test('Comments page title @GAD-R01-02', async ({ commentsPage }) => {
    //Arrange
    const expectedCommentsPageTitle = 'Comments';

    //Assert
    const title = await commentsPage.getTitle();
    expect(title).toContain(expectedCommentsPageTitle);
  });
});
