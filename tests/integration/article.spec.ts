import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Verify article', () => {
  // eslint-disable-next-line playwright/expect-expect
  test('Non Logge user can access create article @GAD-R06-01 @predefined_data', async ({
    articlePage,
  }) => {
    const expectedArticleTitle = 'How to write effective test cases';
    await articlePage.goto('?id=1');

    await expect(articlePage.articleTitle).toHaveText(expectedArticleTitle);
  });
});
