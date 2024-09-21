/// <reference types="cypress" />

Cypress.Commands.add("getCurrentDate", () => {
    const currentDate = new Date();

    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
    };

    const formattedDate = new Intl.DateTimeFormat("pt-BR", options).format(
        currentDate
    );

    return cy.wrap(
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
    );
});
