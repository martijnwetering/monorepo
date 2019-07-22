import { getGreeting } from '../support/app.po';

describe('monorepo', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to monorepo!');
  });
});
