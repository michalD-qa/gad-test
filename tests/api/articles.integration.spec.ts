import { expect, test } from '@_src/fixtures/merge.fixture';
import {
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

  //kontynuacja tutaj https://jaktestowac.pl/lesson/pw3s02l04/

  test('should  create an article with a logged-in user', async ({
    request,
  }) => {
    // Arrange
    const url = '/api/articles';

    const expectedResponseCode = 201;
    const articleData = await prepareArticlePayload();

    //login user
    const headers = await getAuthorizationHeader(request);

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

    const article = await responseArticle.json();
    expect.soft(article.title).toEqual(articleData.title);
  });
});
