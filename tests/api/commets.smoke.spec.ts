import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Verify articles API endpoint @api', () => {
  test('Verify all conditions in on test', async ({ request }) => {
    // Arrange
    const commentsUrl = '/api/comments';
    const expectedRequiredFields = ['article_id', 'body'];

    const response = await request.get(commentsUrl);
    const responseJson = await response.json();

    await test.step('GET comment return 200', async () => {
      const expectedResponseCode = 200;
      await expect(response.status()).toBe(expectedResponseCode);
    });

    await test.step('GET comments return at least on comment', async () => {
      const expectedMinCommentCount = 1;
      await expect(responseJson.length).toBeGreaterThanOrEqual(
        expectedMinCommentCount,
      );
    });
    await test.step('GET comments return at least on comment', async () => {
      const comment = responseJson[0];
      expectedRequiredFields.forEach((field) => {
        expect.soft(comment).toHaveProperty(field);
      });
    });
  });
});
