import { generateRandomArticleData } from '@_src/factories/article.factory';
import { generateRandomComment } from '@_src/factories/comment.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';
import { AddArticleModel } from '@_src/models/article.model';
import { ArticlePage } from '@_src/pages/article.page';

test.describe('Create, verify and delete comment', () => {
  let articleData: AddArticleModel;
  let articlePage: ArticlePage;

  test.beforeEach(async ({ addArticleView }) => {
    articleData = generateRandomArticleData();
    articlePage = await addArticleView.createArticle(articleData);
  });

  test('Operate on comment @GAD-R06-01 @GAD-R06-02 @GAD-R06-03  @logged', async () => {
    //Create new comment
    //Arrange
    const newCommentData = generateRandomComment();
    const updatedCommentData = generateRandomComment();

    await test.step('create new comment', async () => {
      //Arrange
      const expectedCommentCreatedPopup = 'Comment was created';

      //Act
      const addCommentView = await articlePage.clickAddCommentButton();
      articlePage = await addCommentView.createComment(newCommentData);

      //Assert
      await expect
        .soft(addCommentView.alertPopup)
        .toHaveText(expectedCommentCreatedPopup);
    });

    let commentPage = await test.step('verify comment', async () => {
      //Act
      const articleComment = await articlePage.getArticleComment(
        newCommentData.body,
      );
      await expect(articleComment.body).toHaveText(newCommentData.body);
      // await articleComment.link.click();
      const commentPage = await articlePage.clickCommentLink(articleComment);

      //Assert
      await expect(commentPage.commentBody).toHaveText(newCommentData.body);
      return commentPage;
    });

    await test.step('update comment', async () => {
      //Arrange
      const expectedCommentEditedPopup = 'Comment was updated';
      const editCommentView = await commentPage.clickEditButton();

      //Act
      commentPage = await editCommentView.updateComment(updatedCommentData);

      //Assert
      await expect
        .soft(commentPage.alertPopup)
        .toHaveText(expectedCommentEditedPopup);
      await expect(commentPage.commentBody).toHaveText(updatedCommentData.body);
    });
    await test.step('verify updated comment', async () => {
      //Act
      const articlePage = await commentPage.clickReturnToArticleLink();

      //Assert
      const updatedArticleComment = await articlePage.getArticleComment(
        updatedCommentData.body,
      );
      await expect(updatedArticleComment.body).toHaveText(
        updatedCommentData.body,
      );
    });
  });

  test('User can add more than one comment @GAD-R06-03  @logged', async () => {
    await test.step('create first comment', async () => {
      //Arrange
      const newCommentData = generateRandomComment();
      const expectedCommentCreatedPopup = 'Comment was created';

      //Act
      const addCommentView = await articlePage.clickAddCommentButton();
      articlePage = await addCommentView.createComment(newCommentData);

      //Assert
      await expect
        .soft(addCommentView.alertPopup)
        .toHaveText(expectedCommentCreatedPopup);
    });

    await test.step('create and verify second comment', async () => {
      const secondCommentData = generateRandomComment();
      await test.step('create second comment', async () => {
        const addCommentView = await articlePage.clickAddCommentButton();
        articlePage = await addCommentView.createComment(secondCommentData);
      });

      await test.step('verify second comment', async () => {
        const articleComment = await articlePage.getArticleComment(
          secondCommentData.body,
        );
        await expect(articleComment.body).toHaveText(secondCommentData.body);
        const commentPage = await articlePage.clickCommentLink(articleComment);
        await expect(commentPage.commentBody).toHaveText(
          secondCommentData.body,
        );
      });
    });
  });
});
