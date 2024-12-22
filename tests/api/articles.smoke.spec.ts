import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Verify articles API endpoint @api', () => {
  test.describe('Verify each condition in separate test', () => {
    test('GET articles', async ({ request }) => {
      // Arrange
      const expectedResponseCode = 200;
      const articlesUrl = '/api/articles';

      // Act
      const response = await request.get(articlesUrl);

      // Assert
      await expect(response.status()).toBe(expectedResponseCode);
    });

    test('GET articles should reutrn at least one article', async ({
      request,
    }) => {
      // Arrange
      const expectedMinArticleCount = 1;
      const articlesUrl = '/api/articles';

      // Act
      const response = await request.get(articlesUrl);
      const responseJson = await response.json();
      // Assert
      await expect(responseJson.length).toBeGreaterThan(
        expectedMinArticleCount,
      );
    });

    test('GET articles return article object', async ({ request }) => {
      // Arrange
      const articlesUrl = '/api/articles';
      const expectedRequiredFields = ['id', 'user_id', 'body', 'date', 'image'];

      // Act
      const response = await request.get(articlesUrl);
      const responseJson = await response.json();
      const article = responseJson[0];

      // Assert
      expectedRequiredFields.forEach((field) => {
        expect.soft(article).toHaveProperty(field);
      });
    });
  });

  test('Verify all conditions in on test', async ({ request }) => {
    // Arrange
    const articlesUrl = '/api/articles';
    const expectedRequiredFields = ['id', 'user_id', 'body', 'date', 'image'];

    const response = await request.get(articlesUrl);
    const responseJson = await response.json();

    await test.step('GET articles return 200', async () => {
      const expectedResponseCode = 200;
      await expect(response.status()).toBe(expectedResponseCode);
    });

    await test.step('GET articles return at least on article', async () => {
      const expectedMinArticleCount = 1;
      await expect(responseJson.length).toBeGreaterThanOrEqual(
        expectedMinArticleCount,
      );
    });
    await test.step('GET articles return at least on article', async () => {
      const article = responseJson[0];
      expectedRequiredFields.forEach((field) => {
        expect.soft(article).toHaveProperty(field);
      });
    });
  });
});
