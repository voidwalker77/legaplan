/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

declare global {
    namespace Cypress {
        interface Chainable {
            getCurrentDate(): Chainable<string>;
        }
    }
}

export {};
