const { expect } = require("@playwright/test");
const dashboardTestData = require("../Fixtures/Dashboard.fixtures.json");

exports.DashboardPage = class DashboardPage {
  constructor(page) {
    this.page = page;
    this.postButton =
      '//*[@id="hb__root"]/div[2]/div/div/div[2]/div[1]/div/div[3]';
    this.titleInput =
      '//*[@id="hb__root"]/div[2]/div[2]/div/div[2]/form/div[1]/div[1]/input';
    this.photoInput =
      '//*[@id="hb__root"]/div[2]/div[2]/div/div[2]/form/div[1]/div[2]/div/div/label';
    this.nextButtonAfterTitle =
      '//*[@id="hb__root"]/div[2]/div[2]/div/div[2]/form/div[2]/button';
    this.categoryInput =
      '//*[@id="hb__root"]/div[2]/div[2]/div/div[2]/form/div[1]/div[1]/div/div/div[1]/div[2]';
    this.subCategoryInput =
      '//*[@id="hb__root"]/div[2]/div[2]/div/div[2]/form/div[1]/div[2]/div/div/div[1]/div[2]';
    this.condition =
      '//*[@id="hb__root"]/div[2]/div[2]/div/div[2]/form/div[2]/div/div/div[1]/div[2]';
    this.location =
      '//*[@id="hb__root"]/div[2]/div[2]/div/div[2]/form/div[3]/div/input';
    this.description =
      '//*[@id="hb__root"]/div[2]/div[2]/div/div[2]/form/div[5]/div/textarea';

    this.nextButtonAfterCategory =
      '//*[@id="hb__root"]/div[2]/div[2]/div/div[2]/form/div[9]/button';

    this.price =
      '//*[@id="hb__root"]/div[2]/div[2]/div/div[2]/form/div[1]/div/div[1]/input';
    this.date =
      '//*[@id="hb__root"]/div[2]/div[2]/div/div[2]/form/div[2]/div/div/div/div[1]/div[2]';
    this.nextButtonAfterPrice =
      '//*[@id="hb__root"]/div[2]/div[2]/div/div[2]/form/div[3]/button';
    this.addProduct =
      '//*[@id="hb__root"]/div[2]/div[2]/div/div[2]/form/div[2]/button';
    this.closeButton =
      '//*[@id="hb__root"]/div[2]/div[2]/div/div[2]/form/div[2]/button';
    // profile menu
    this.profileMenu = '//*[@id="hb__root"]/div[2]/div/div/div[2]/div[3]';
    this.visitProfile =
      '//*[@id="hb__root"]/div[2]/div/div/div[2]/div[3]/div[2]/div[1]/div[2]/span[2]';
    this.productTitleSelector = ".card-product-tile-info-productTitle";

    // edit
    this.menu =
      '//*[@id="hb__root"]/div[2]/main/section/div[2]/div[2]/div[1]/div/div/div/div[1]/div/div/div[1]/div[2]/div/span';
    this.editMenu =
      '//*[@id="hb__root"]/div[2]/main/section/div[2]/div[2]/div[1]/div/div/div/div[1]/div/div/div[1]/div[2]/div/div/div/div[4]/span';
    this.editTitle =
      '//*[@id="hb__root"]/div[2]/main/section/div[2]/div[2]/div[1]/div/div/div/div[1]/div[1]/div/div[1]/div[2]/div[2]/div/div/div[2]/div/form/div/div[2]/input';
    this.updateButton =
      '//*[@id="hb__root"]/div[2]/main/section/div[2]/div[2]/div[1]/div/div/div/div[1]/div[1]/div/div[1]/div[2]/div[2]/div/div/div[2]/div/form/div/div[9]/button';

    // search
    this.searchInput =
      '//*[@id="hb__root"]/div[2]/div/div/div[1]/form/div[1]/input';
    this.searchedProductTitle =
      '//*[@id="hb__root"]/div[2]/div[2]/div[1]/section/div[2]/div/div/div[1]/div/div[1]/div[2]/div[1]/a/h2';

    // delete
    this.deletead =
      '//*[@id="hb__root"]/div[2]/main/section/div[2]/div[2]/div[1]/div/div/div/div[1]/div/div/div[1]/div[2]/div/div/div/div[3]/span';
    this.yesButton =
      '//*[@id="hb__root"]/div[2]/main/section/div[2]/div[2]/div[1]/div/div/div/div[1]/div/div/div[1]/div[2]/div[2]/div/div/div[2]/div/button[1]';
  }

  async postItem() {
    await this.page.locator(this.postButton).click();
    await this.page.locator(this.titleInput).fill(dashboardTestData.title);
    await this.page
      .locator(this.photoInput)
      .setInputFiles("./tests/dashboard/grid2.jpg");
    await this.page.waitForTimeout(3000);
    await this.page.locator(this.nextButtonAfterTitle).click();
    await this.page.locator(this.categoryInput).click();
    await this.page.keyboard.press("Enter");
    await this.page.locator(this.subCategoryInput).click();
    await this.page.keyboard.press("Enter");

    await this.page.locator(this.condition).click();
    await this.page.keyboard.press("Enter");

    await this.page.locator(this.location).fill(dashboardTestData.location);
    await this.page.keyboard.press("Tab");
    await this.page
      .locator(this.description)
      .fill(dashboardTestData.description);
    await this.page.locator(this.nextButtonAfterCategory).click();
    await this.page.waitForTimeout(5000);
    await this.page.locator(this.price).fill(dashboardTestData.price);
    await this.page.locator(this.date).click();
    await this.page.keyboard.press("Enter");
    await this.page.locator(this.nextButtonAfterPrice).click();
    await this.page.locator(this.addProduct).click();

    await this.page.locator(this.closeButton).click();
  }

  async verifypost() {
    await this.page.locator(this.profileMenu).click();
    await this.page.locator(this.visitProfile).click();

    await this.page.waitForTimeout(5000);
    const productExists =
      (await this.page
        .locator(this.productTitleSelector, { hasText: "test title" })
        .count()) > 0;
    await this.page.waitForTimeout(1000);

    expect(productExists).toBeTruthy();
  }

  async editPost() {
    await this.page.locator(this.profileMenu).click();
    await this.page.locator(this.visitProfile).click();
    await this.page.locator(this.menu).click();
    await this.page.locator(this.editMenu).click();

    await this.page.locator(this.editTitle).fill(dashboardTestData.newTitle);
    await this.page.locator(this.updateButton).click();
  }

  async verifyEdit() {
    await this.page.locator(this.profileMenu).click();
    await this.page.locator(this.visitProfile).click();
    await this.page.waitForTimeout(5000);
    const productExists =
      (await this.page
        .locator(this.productTitleSelector, {
          hasText: dashboardTestData.newTitle,
        })
        .count()) > 0;
    await this.page.waitForTimeout(1000);

    expect(productExists).toBeTruthy();
  }

  async search() {
    await this.page.locator(this.searchInput).fill(dashboardTestData.newTitle);
    await this.page.keyboard.press("Enter");
    await this.page.waitForTimeout(5000);

    const productExists =
      (await this.page
        .locator(this.searchedProductTitle, {
          hasText: dashboardTestData.newTitle,
        })
        .count()) > 0;

    expect(productExists).toBeTruthy();

    if (productExists) {
      await this.page.locator(this.searchedProductTitle).click();
    }
  }

  async deletePost() {
    await this.page.locator(this.profileMenu).click();
    await this.page.locator(this.visitProfile).click();
    await this.page.locator(this.menu).click();
    await this.page.locator(this.deletead).click();
    await this.page.locator(this.yesButton).click();
    await this.page.waitForTimeout(5000);
  }

  async verifyDelete() {
    const productExists =
      (await this.page
        .locator(this.productTitleSelector, {
          hasText: dashboardTestData.newTitle,
        })
        .count()) > 0;
    await this.page.waitForTimeout(1000);

    expect(productExists).toBeFalsy();
  }
};
