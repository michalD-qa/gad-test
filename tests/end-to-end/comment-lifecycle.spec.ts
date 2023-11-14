import { generateRandomArticleData } from '@_src/factories/article.factory';
import { generateRandomComment } from '@_src/factories/comment.factory';
import { AddArticleModel } from '@_src/models/article.model';
import { ArticlePage } from '@_src/pages/article.page';
import { ArticlesPage } from '@_src/pages/articles.page';
import { AddArticleView } from '@_src/views/add-article.view';
import { EditCommentView } from '@_src/views/edit-comment.view';
import { expect, test } from '@playwright/test';

test.describe('Create, verify and delete comment', () => {
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: AddArticleModel;
  let articlePage: ArticlePage;
  // let addCommentView: AddCommentView;
  let editCommentView: EditCommentView;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);
    articlePage = new ArticlePage(page);
    // addCommentView = new AddCommentView(page);
    editCommentView = new EditCommentView(page);

    articleData = generateRandomArticleData();
    await articlesPage.goto();
    await articlesPage.addArticleButton.click();
    await addArticleView.createArticle(articleData);
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
      await addCommentView.createComment(newCommentData);

      //Assert
      await expect
        .soft(addCommentView.alertPopup)
        .toHaveText(expectedCommentCreatedPopup);
    });

    const commentPage = await test.step('verify comment', async () => {
      //Act
      const articleComment = await articlePage.getArticleComment(
        newCommentData.body,
      );
      await expect(articleComment.body).toHaveText(newCommentData.body);
      // await articleComment.link.click();
      const commentPage = await articlePage.clickCommentLink(
        articleComment.link,
      );

      //Assert
      await expect(commentPage.commentBody).toHaveText(newCommentData.body);
      return commentPage;
    });

    await test.step('update comment', async () => {
      //Arrange
      const expectedCommentEditedPopup = 'Comment was updated';
      await commentPage.editButton.click();

      //Act
      await editCommentView.updateComment(updatedCommentData);

      //Assert
      await expect
        .soft(commentPage.alertPopup)
        .toHaveText(expectedCommentEditedPopup);
      await expect(commentPage.commentBody).toHaveText(updatedCommentData.body);
    });
    await test.step('verify updated comment', async () => {
      //Act
      await commentPage.returnToArticleLink.click();

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
      await addCommentView.createComment(newCommentData);

      //Assert
      await expect
        .soft(addCommentView.alertPopup)
        .toHaveText(expectedCommentCreatedPopup);
    });

    await test.step('create and verify second comment', async () => {
      const secondCommentData = generateRandomComment();
      await test.step('create second comment', async () => {
        const addCommentView = await articlePage.clickAddCommentButton();
        await addCommentView.createComment(secondCommentData);
      });

      await test.step('verify second comment', async () => {
        const articleComment = await articlePage.getArticleComment(
          secondCommentData.body,
        );
        await expect(articleComment.body).toHaveText(secondCommentData.body);
        const commentPage = await articlePage.clickCommentLink(
          articleComment.link,
        );
        await expect(commentPage.commentBody).toHaveText(
          secondCommentData.body,
        );
      });
    });
  });
});
