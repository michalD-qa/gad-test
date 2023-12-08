import { expect, test } from '@_src/fixtures/merge.fixture';
import { LoginUserModel } from '@_src/models/user.model';
import { testUser1 } from '@_src/test-data/user.data';

test.describe('Verify login page', () => {
  test('User can login with proper email and password @login @GAD-R02-01', async ({
    loginPage,
  }) => {
    //Arrange
    const expectedWelcomeTitle = 'Welcome';

    //Act
    const welcomePage = await loginPage.loginUser(testUser1);
    const title = await welcomePage.getTitle();

    //Assert
    expect(title).toContain(expectedWelcomeTitle);
  });
  test("User can't login with invalid email and password @login @GAD-R02-01", async ({
    loginPage,
  }) => {
    //Arrange
    const expectedLoginErrorText = 'Invalid username or password';

    const loginUserData: LoginUserModel = {
      userEmail: testUser1.userEmail,
      userPassword: 'incorrectPassword',
    };

    //Act
    await loginPage.loginUser(loginUserData);

    //Assert
    await expect(loginPage.loginErrorText).toHaveText(expectedLoginErrorText);
  });
});
