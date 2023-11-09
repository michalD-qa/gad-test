import { generateRandomArticleData } from '../../src/factories/article.factory';
import { generateRandomComment } from '../../src/factories/comment.factory';
import { AddArticleModel } from '../../src/models/article.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentPage } from '../../src/pages/comment.page';
import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/user.data';
import { AddArticleView } from '../../src/views/add-article.view';
import { AddCommentView } from '../../src/views/add-comment.view';
import { EditCommentView } from '../../src/views/edit-comment.view';
import { expect, test } from '@playwright/test';

test.describe('Create, verify and delete comment', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: AddArticleModel;
  let articlePage: ArticlePage;
  let addCommentView: AddCommentView;
  let commentPage: CommentPage;
  let editCommentView: EditCommentView;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);
    articlePage = new ArticlePage(page);
    addCommentView = new AddCommentView(page);
    commentPage = new CommentPage(page);
    editCommentView = new EditCommentView(page);

    articleData = generateRandomArticleData();
    await loginPage.goto();
    await loginPage.loginUser(testUser1);
    await articlesPage.goto();
    await articlesPage.addArticleButton.click();
    await addArticleView.createArticle(articleData);
  });

  // eslint-disable-next-line playwright/expect-expect
  test('Operate on comment @GAD-R06-01 @GAD-R06-02 @GAD-R06-03', async () => {
    //Create new comment
    //Arrange
    const newCommentData = generateRandomComment();
    const updatedCommentData = generateRandomComment();

    await test.step('create new comment', async () => {
      //Arrange
      const expectedCommentCreatedPopup = 'Comment was created';

      //Act
      await articlePage.addCommentButton.click();
      await addCommentView.createComment(newCommentData);

      //Assert
      await expect
        .soft(addCommentView.alertPopup)
        .toHaveText(expectedCommentCreatedPopup);
    });

    await test.step('verify comment', async () => {
      //Act
      const articleComment = await articlePage.getArticleComment(
        newCommentData.body,
      );
      await expect(articleComment.body).toHaveText(newCommentData.body);
      await articleComment.link.click();

      //Assert
      await expect(commentPage.commentBody).toHaveText(newCommentData.body);
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

  test('User can add more than one comment @GAD-R06-03', async () => {
    await test.step('create first comment', async () => {
      //Arrange
      const newCommentData = generateRandomComment();
      const expectedCommentCreatedPopup = 'Comment was created';

      //Act
      await articlePage.addCommentButton.click();
      await addCommentView.createComment(newCommentData);

      //Assert
      await expect
        .soft(addCommentView.alertPopup)
        .toHaveText(expectedCommentCreatedPopup);
    });

    await test.step('create and verify second comment', async () => {
      const secondCommentData = generateRandomComment();
      await test.step('create second comment', async () => {
        await articlePage.addCommentButton.click();
        await addCommentView.createComment(secondCommentData);
      });

      await test.step('verify second comment', async () => {
        const articleComment = await articlePage.getArticleComment(
          secondCommentData.body,
        );
        await expect(articleComment.body).toHaveText(secondCommentData.body);
        await articleComment.link.click();
        await expect(commentPage.commentBody).toHaveText(
          secondCommentData.body,
        );
      });
    });
  });
});
