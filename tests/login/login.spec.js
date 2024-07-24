const { test, expect } = require("@playwright/test");
const testData = require("../../Fixtures/Login.fixtures.json");
const { LoginPage } = require("../../page-objects/login.po");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("valid login tests", () => {
  test("valid login", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(testData.validUser.phone, testData.validUser.password);
    await login.verifyValidLogin();
  });
});

test.describe("invalid login tests", () => {
  test.describe.configure({ mode: "serial" });
  test("login invalid", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUser.invalidCredentials.phone,
      testData.invalidUser.invalidCredentials.password
    );
    await page.waitForTimeout(5000);
    await login.invalidLogin();
  });

  test("empty field", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUser.emptyField.phone,
      testData.invalidUser.emptyField.password
    );
    await login.EmptyPhone();
    await login.EmptyPassword();
  });

  test("phone empty", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUser.emptyPhone.phone,
      testData.invalidUser.emptyPhone.password
    );
    await login.EmptyPhone();
  });

  test("Password empty", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUser.emptyPassword.phone,
      testData.invalidUser.emptyPassword.password
    );
    await login.EmptyPassword();
    
  });

 
});


import * as path from 'path';

  const fileWithPath = path.join(__dirname, 'amodh.jpg');
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.getByRole('button', { name: 'Add a Photo' }).click(),
  ]);
  await fileChooser.setFiles([fileWithPath]);