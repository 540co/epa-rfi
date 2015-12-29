'use strict';

describe('The main view', function () {
  var page;

  beforeEach(function () {
    browser.get('/index.html');
    page = require('./main.po');
  });

  it('should include dashboard with correct data', function() {
    expect(page.h1El.getText()).toBe('000,000');
  });

});
