import { generateRandomArticleData } from '@_src/factories/article.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';
import { testUser1 } from '@_src/test-data/user.data';

test.describe('Verify articles CRUD operations @api', () => {
  test('should not create an article without a logged-in user', async ({
    request,
  }) => {
    // Arrange
    const url = '/api/articles';
    const expectedResponseCode = 401;
    const randomArticleData = generateRandomArticleData();
    const articleData = {
      ...randomArticleData,
      date: '2024-06-30T15:44:31Z',
      image: '',
    };

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
    const randomArticleData = generateRandomArticleData();
    const articleData = {
      ...randomArticleData,
      date: '2024-06-30T15:44:31Z',
      image:
        '.\\data\\images\\256\\tester-app_1946975e-0840-4905-a647-7582a8638e8f.jpg',
    };

    //login user
    const loginUrl = '/api/login';
    const userData = {
      email: testUser1.userEmail,
      password: testUser1.userPassword,
    };
    const responseLogin = await request.post(loginUrl, { data: userData });
    const responseLoginJson = await responseLogin.json();

    //Act
    const responseArticle = await request.post(url, {
      data: articleData,
      headers: {
        Authorization: `Bearer ${await responseLoginJson.access_token}`,
      },
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
