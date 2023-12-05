import { ArticlePage } from '@_src/pages/article.page';
import { expect, test } from '@playwright/test';

test.describe('Verify article', () => {
  // eslint-disable-next-line playwright/expect-expect
  test('Non Logge user can access create article @GAD-R06-01 @predefined_data', async ({
    page,
  }) => {
    const expectedArticleTitle = 'How to write effective test cases';
    const articlePage = new ArticlePage(page);
    await articlePage.goto('?id=1');

    await expect(articlePage.articleTitle).toHaveText(expectedArticleTitle);
  });
});
