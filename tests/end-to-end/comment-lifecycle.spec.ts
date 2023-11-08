import { generateRandomArticleData } from '../../src/factories/article.factory';
import { AddArticleModel } from '../../src/models/article.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentPage } from '../../src/pages/comment.page';
import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/user.data';
import { AddArticleView } from '../../src/views/add-article.view';
import { AddCommentView } from '../../src/views/add-comment.view';
import { expect, test } from '@playwright/test';

test.describe('Create, verify and delete comment', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let addArticleView: AddArticleView;
  let articleData: AddArticleModel;
  let articlePage: ArticlePage;
  let addCommentView: AddCommentView;
  let commentPage: CommentPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);
    articlePage = new ArticlePage(page);
    addCommentView = new AddCommentView(page);
    commentPage = new CommentPage(page);

    articleData = generateRandomArticleData();
    await loginPage.goto();
    await loginPage.loginUser(testUser1);
    await articlesPage.goto();
    await articlesPage.addArticleButton.click();
    await addArticleView.createArticle(articleData);
  });

  // eslint-disable-next-line playwright/expect-expect
  test('Create new comment @GAD-R06-01', async () => {
    //Arrange
    const commentText = 'My Comment Text';

    //Act
    await articlePage.addCommentButton.click();
    await addCommentView.createComment(commentText);

    //Assert
    await expect(addCommentView.alertPopup).toHaveText('Comment was created');

    //verify comment
    //Act
    const articleComment = await articlePage.getArticleComment(commentText);
    await expect(articleComment.body).toHaveText(commentText);
    await articleComment.link.click();

    await expect(commentPage.commentBody).toHaveText(commentText);
  });
});
