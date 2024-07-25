const { test } = require("playwright/test");
const LoginTestData = require("../../Fixtures/Login.fixtures.json");
const { LoginPage } = require("../../page-objects/login.po");
const { DashboardPage } = require("../../page-objects/dashboard.po");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  const login = new LoginPage(page);
  await login.login(
    LoginTestData.validUser.phone,
    LoginTestData.validUser.password
  );
  await login.verifyValidLogin();
});

test.describe("add edit delete post", () => {
  test.describe.configure({ mode: "serial" });
  test("create post", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.postItem();
    await dashboard.verifypost();
  });

  test("edit post", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.editPost();
    await dashboard.verifyEdit();
  });

  test("search product", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.search();
  });

  test("delete post", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.deletePost();
    await dashboard.deletePost();
    await dashboard.verifyDelete();
  });
});
