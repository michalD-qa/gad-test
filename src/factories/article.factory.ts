import { AddArticleModel } from '../models/article.model';
import { faker } from '@faker-js/faker/locale/en';

export function randomArticleData(): AddArticleModel {
  const title = faker.lorem.sentence();
  const body = faker.lorem.paragraphs(5);

  const newArticle: AddArticleModel = { title: title, body: body };

  return newArticle;
}

export function randomArticleDataWithSpecifiedValues(
  title?: string,
  body?: string,
): AddArticleModel {
  const newArticleData = randomArticleData();
  if (typeof title != 'undefined') {
    newArticleData.title = title;
  }
  if (typeof body != 'undefined') {
    newArticleData.body = body;
  }
  return newArticleData;
}
