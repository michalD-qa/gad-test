import { AddArticleModel } from '@_src/models/article.model';
import { faker } from '@faker-js/faker/locale/en';

export function generateRandomArticleData(
  titleLength?: number,
): AddArticleModel {
  let title: string;
  if (titleLength) title = faker.string.alpha(titleLength);
  else title = faker.lorem.sentence();
  const body = faker.lorem.paragraphs(5);

  const newArticle: AddArticleModel = { title: title, body: body };
  return newArticle;
}

export function randomArticleDataWithSpecifiedValues(
  title?: string,
  body?: string,
): AddArticleModel {
  const newArticleData = generateRandomArticleData();
  if (typeof title != 'undefined') {
    newArticleData.title = title;
  }
  if (typeof body != 'undefined') {
    newArticleData.body = body;
  }
  return newArticleData;
}
