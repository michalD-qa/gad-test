import { generateRandomArticleData } from '@_src/factories/article.factory';
import { testUser1 } from '@_src/test-data/user.data';
import { APIRequestContext } from '@playwright/test';

export const apiLinks = {
  articlesUrl: '/api/articles',
  commentsUrl: '/api/comments',
};
interface Headers {
  [key: string]: string;
}

export async function getAuthorizationHeader(
  request: APIRequestContext,
): Promise<Headers> {
  // Login
  const loginUrl = '/api/login';
  const userData = {
    email: testUser1.userEmail,
    password: testUser1.userPassword,
  };
  const responseLogin = await request.post(loginUrl, {
    data: userData,
  });
  const responseLoginJson = await responseLogin.json();

  return {
    Authorization: `Bearer ${responseLoginJson.access_token}`,
  };
}

interface ArticlePayload {
  title: string;
  body: string;
  date: string;
  image: string;
}

export async function prepareArticlePayload(): Promise<ArticlePayload> {
  const randomArticleData = generateRandomArticleData();
  const articleData = {
    title: randomArticleData.title,
    body: randomArticleData.body,
    date: '2024-01-30T15:44:31Z',
    image:
      '.\\data\\images\\256\\tester-app_9f26eff6-2390-4460-8829-81a9cbe21751.jpg',
  };
  return articleData;
}
