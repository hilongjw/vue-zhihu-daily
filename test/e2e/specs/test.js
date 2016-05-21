// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'awe-site-chat-test': function (browser) {
    browser
    .url('http://localhost:8080')
      .waitForElementPresent('#__covAlert', 10000)
      .click('#__covAdd')
      .assert.cssClassPresent(".ink", "animate")
      .waitForElementNotVisible('#__covInput', 100)
      .click('#__covAdd')
      .waitForElementVisible('#__covInput', 100)
      .click('#__covInputText')
      .assert.cssClassPresent("#__covInput", "active")
      .setValue('#__covInputText', 'nightwatch')
      .sendKeys('#__covInputText', browser.Keys.ENTER)
      .waitForElementPresent('.__cov-item', 5000)
      .end()
  }
}
