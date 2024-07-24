const testData = require("../Fixtures/Login.fixtures.json");
const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.numberInput = '//*[@id="hb__root"]/div[2]/div[2]/div[2]/div[2]/form/div[1]/div/input';
    this.passwordInput = '//*[@id="hb__root"]/div[2]/div[2]/div[2]/div[2]/form/div[2]/input';
    this.loginButton = '//*[@id="hb__root"]/div[2]/div[2]/div[2]/div[2]/form/div[3]/button';
    this.errorMessage = '.form--error ul li:has-text("Please enter correct username and password.")';
    this.errorPhone = '//*[@id="hb__root"]/div[2]/div[2]/div/div[2]/form/div[1]/small';
    this.errorPassword = '//*[@id="hb__root"]/div[2]/div[2]/div/div[2]/form/div[2]/small'
    this.dashboardLoginButton =
      '//*[@id="hb__root"]/div[2]/div/div/div[2]/div[3]/button[1]';
      this.userdashboard = '//*[@id="hb__root"]/div[2]/div/div/div[2]/div[3]/span';

  }

  async login(phone, password) {
    await this.page.locator(this.dashboardLoginButton).click();
    await this.page.locator(this.numberInput).fill(phone);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.locator(this.loginButton).click();
  }

  async verifyValidLogin() {
    await expect(this.page.locator(this.userdashboard)).toHaveText(testData.verifyLogin.name);
  }

  async invalidLogin() {
    await expect(this.page.locator(this.errorMessage)).toHaveText(
      "Please enter correct username and password."
    );
  }

  async EmptyPhone(){
    await expect(this.page.locator(this.errorPhone)).toHaveText("Phone number is required");
  }
  
  async EmptyPassword(){
    await expect(this.page.locator(this.errorPassword)).toHaveText("Password is required");

  }
};
