import { expect, test } from '@_src/fixtures/merge.fixture';
import {
  Headers,
  getAuthorizationHeader,
  prepareArticlePayload,
} from '@_src/utils/api.util';

test.describe('Verify articles CRUD operations @crud', () => {
  test('should not create an article without a logged-in user', async ({
    request,
  }) => {
    // Arrange
    const url = '/api/articles';
    const expectedResponseCode = 401;

    const articleData = await prepareArticlePayload();

    //Act
    const response = await request.post(url, {
      data: articleData,
    });

    //Assert
    expect(response.status()).toBe(expectedResponseCode);
  });

  test.describe.configure({ mode: 'serial' });
  test.describe('crud operations', () => {
    let articleId: number;
    let headers: Headers;

    test.beforeAll(async ({ request }) => {
      headers = await getAuthorizationHeader(request);
    });

    test('should  create an article with a logged-in user', async ({
      request,
    }) => {
      // Arrange
      const url = '/api/articles';
      const expectedResponseCode = 201;
      const articleData = await prepareArticlePayload();

      //login user

      //Act
      const responseArticle = await request.post(url, {
        data: articleData,
        headers,
      });

      //Assert
      const actualResponseStatus = responseArticle.status();
      expect(
        actualResponseStatus,
        `status code expected ${expectedResponseCode}, but received ${actualResponseStatus}`,
      ).toBe(expectedResponseCode);

      const articleJson = await responseArticle.json();
      expect.soft(articleJson.title).toEqual(articleData.title);

      articleId = articleJson.id;
    });
    test('should  delete an article with a logged-in user', async ({
      request,
    }) => {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      // Arrange
      const url = '/api/articles';

      const expectedResponseCode = 200;

      //Act
      const responseArticle = await request.delete(`${url}/${articleId}`, {
        headers,
      });

      //Assert
      const actualResponseStatus = responseArticle.status();
      expect(
        actualResponseStatus,
        `status code expected ${expectedResponseCode}, but received ${actualResponseStatus}`,
      ).toBe(expectedResponseCode);
    });
  });
});
