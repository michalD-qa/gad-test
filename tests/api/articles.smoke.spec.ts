import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Verify articles API endpoint @api', () => {
  test('GET articles', async ({ request }) => {
    // Arrange
    const expectedResponseCode = 200;

    const articlesUrl = '/api/articles';

    // Act

    const response = await request.get(articlesUrl);
    // Assert
    await expect(response.status()).toBe(expectedResponseCode);
  });

  test('Get articles should reutrn at least one article', async ({
    request,
  }) => {
    // Arrange
    const expectedMinArticleCount = 1;

    const articlesUrl = '/api/articles';

    // Act

    const response = await request.get(articlesUrl);
    const responseJson = await response.json();
    // Assert
    await expect(responseJson.length).toBeGreaterThan(expectedMinArticleCount);
  });
});
