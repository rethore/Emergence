module.exports = function() {

  // Scenario: Search about wind turbine wake
  this.Given(/^that I'm on the search page$/, function () {
    browser.url('http://localhost:3000/emergence')
  });

  this.When(/^I search for the keywords "([^"]*)"$/, function (searchTerm) {
    browser.waitForExist('input[name="search_text"]');
    browser.setValue('input[name="search_text"]', searchTerm);
    browser.keys(['Enter']);
  });

  this.Then(/^I see a list of articles$/, function () {
    browser.waitForExist('a[class="list-group-item"]');
  });

  this.Then(/^one article title contains "([^"]*)"$/, function (text) {
    expect(browser.getText('h4').join().toLowerCase())
      .toContain(text.toLowerCase());
  });

  this.When(/^I click on this article that contains "([^"]*)"$/, function (text) {
    browser.click('h4*='+text)
  });

  this.Then(/^I see a new page with a title that contains  "([^"]*)"$/, function (text) {
    expect(browser.getText('h3[id="title_article"]').toLowerCase())
      .toContain(text.toLowerCase())
  });

  this.When(/^I click on some stuff$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    browser.click('h4*='+text)
  });

  // Feature: Scientific Questions

  // * Scenario: Force user to sign in to register a question
  this.Given(/^that I'm this address "([^"]*)"$/, function (url) {
    browser.url('http://localhost:3000/'+url)
  });

  this.Given(/^that I have not signed in$/, function () {
    browser.waitForExist('button[class*="btn-GitHub"]');
    expect(browser.getText('ul[class*="navbar-right"]')).toContain("Sign in / Join");
  });

  this.When(/^I try to add a question$/, function () {
    // Write the automation code here
    browser.click('a=Add Relationship');
    browser.click("#question");
  });

  this.Then(/^the website asks me to sign up$/, function () {
    console.log(browser.getText('#myModalLabel'));
    browser.waitUntil(() => {
      console.log(browser.getText('#myModalLabel'));
      return ! (browser.getText('#myModalLabel') === '')

    }
    )
    pending();
  });
}
