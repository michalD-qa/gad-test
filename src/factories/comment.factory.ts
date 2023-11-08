import { AddCommentModel } from '../models/comment.model';
import { faker } from '@faker-js/faker/locale/en';

export function generateRandomComment(bodySentences = 5): AddCommentModel {
  const body = faker.lorem.sentence(bodySentences);
  const newComment: AddCommentModel = { body: body };
  return newComment;
}
