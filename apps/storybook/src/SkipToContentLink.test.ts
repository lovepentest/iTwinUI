/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
describe('SkipToContentLink', () => {
  const storyPath = 'Core/SkipToContentLink';
  const tests = ['Basic', 'Custom Text'];

  tests.forEach((testName) => {
    it(testName, function () {
      const id = Cypress.storyId(storyPath, testName);
      cy.visit('iframe', { qs: { id } });
      cy.get('#storybook-root').within(() => {
        cy.get('a').first().focus();
      });
      cy.compareSnapshot(testName);
    });
  });
});
