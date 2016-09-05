'use strict';

describe('Foros E2E Tests:', function () {
  describe('Test Foros page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/foros');
      expect(element.all(by.repeater('foro in foros')).count()).toEqual(0);
    });
  });
});
